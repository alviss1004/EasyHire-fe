import React, { useEffect, useState } from "react";
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import { capitalCase } from "change-case";
import WorkIcon from "@mui/icons-material/Work";
import AccountBids from "../features/user/AccountBids";
import AccountAssignedJobs from "../features/user/AccountAssignedJobs";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssignedJobs } from "../features/user/userSlice";

function MyProfilePage() {
  const [currentTab, setCurrentTab] = useState("my bids");
  const dispatch = useDispatch();
  const { userAssignedJobs, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserAssignedJobs());
  }, [dispatch]);

  const ongoingJobs = userAssignedJobs?.filter(
    (job) => job.status === "ongoing"
  );

  const finishedJobs = userAssignedJobs?.filter(
    (job) => job.status === "finished"
  );

  const MYPROFILE_TABS = [
    {
      value: "my bids",
      icon: <PaidIcon sx={{ fontSize: 30 }} />,
      component: <AccountBids />,
    },
    {
      value: "assigned jobs",
      icon: <WorkIcon sx={{ fontSize: 30 }} />,
      component: <AccountAssignedJobs jobs={ongoingJobs} loading={isLoading} />,
    },
    {
      value: "finished jobs",
      icon: <AssignmentTurnedInIcon sx={{ fontSize: 30 }} />,
      component: (
        <AccountAssignedJobs jobs={finishedJobs} loading={isLoading} />
      ),
    },
  ];

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Freelancer Section
      </Typography>
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {MYPROFILE_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>

      <Box sx={{ mb: 5 }} />

      {MYPROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default MyProfilePage;
