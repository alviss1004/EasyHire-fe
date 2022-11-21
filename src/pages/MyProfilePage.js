import React, { useState } from "react";
import { Container, Tab, Box, Tabs, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PaidIcon from "@mui/icons-material/Paid";
import { capitalCase } from "change-case";
import AccountListings from "../features/user/AccountListings";
import AccountBids from "../features/user/AccountBids";
import UserDetailInfo from "../features/user/UserDetailInfo";
import useAuth from "../hooks/useAuth";

function MyProfilePage() {
  const [currentTab, setCurrentTab] = useState("general");
  const { user } = useAuth();

  const MYPROFILE_TABS = [
    {
      value: "general",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      component: <UserDetailInfo user={user} />,
    },
    {
      value: "my listings",
      icon: <FormatListBulletedIcon sx={{ fontSize: 30 }} />,
      component: <AccountListings profile={{}} />,
    },
    {
      value: "my bids",
      icon: <PaidIcon sx={{ fontSize: 30 }} />,
      component: <AccountBids profile={{}} />,
    },
  ];

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        My Profile
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
