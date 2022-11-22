import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Link,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from "@mui/icons-material/Paid";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, number } from "yup";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getJobById } from "../features/job/jobSlice";
import useAuth from "../hooks/useAuth";
import { capitalCase } from "change-case";
import { createBid } from "../features/bid/bidSlice";
import JobDetailInfo from "../features/job/JobDetailInfo";
import JobDetailBids from "../features/job/JobDetailBids";

let bidSchema = object({
  price: number().required("Bid is required"),
});

const defaultValues = {
  price: "",
};

function JobDetailPage() {
  const [currentTab, setCurrentTab] = useState("info");
  const dispatch = useDispatch();
  const params = useParams();
  const jobId = params.id;
  const { selectedJob, isLoading } = useSelector(
    (state) => state.job,
    shallowEqual
  );

  useEffect(() => {
    if (jobId) dispatch(getJobById(jobId));
  }, [dispatch, jobId]);

  const JOBDETAIL_TABS = [
    {
      value: "info",
      icon: <InfoIcon sx={{ fontSize: 30 }} />,
      component: <JobDetailInfo job={selectedJob} loading={isLoading} />,
    },
    {
      value: "bids",
      icon: <PaidIcon sx={{ fontSize: 30 }} />,
      component: <JobDetailBids bids={selectedJob.bids} loading={isLoading} />,
    },
  ];

  return (
    <>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ mb: 3, mt: 12, ml: "13%" }}
      >
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/jobs"
        >
          Jobs
        </Link>
        <Typography>{selectedJob?.title}</Typography>
      </Breadcrumbs>
      <Container
        sx={{
          backgroundColor: "#FFF",
          minWidth: "75vw",
          maxWidth: "75vw",
          boxShadow: 1,
          p: 1.5,
        }}
      >
        <Helmet>
          <style>{"body { background-color: #F0F3F5; }"}</style>
        </Helmet>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
          sx={{ mb: 2 }}
        >
          {JOBDETAIL_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider />
        {JOBDETAIL_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return (
            isMatched && (
              <Box key={tab.value} sx={{ mt: 2 }}>
                {tab.component}
              </Box>
            )
          );
        })}
      </Container>
    </>
  );
}

export default JobDetailPage;
