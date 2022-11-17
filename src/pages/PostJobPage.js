import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import JobForm from "../features/job/JobForm";

function PostJobPage() {
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
        <Typography>New Listing</Typography>
      </Breadcrumbs>
      <Container
        sx={{
          backgroundColor: "#FFF",
          minWidth: "75vw",
          maxWidth: "75vw",
          boxShadow: 1,
          p: 3,
        }}
      >
        <Helmet>
          <style>{"body { background-color: #F0F3F5; }"}</style>
        </Helmet>
        <JobForm />
      </Container>
    </>
  );
}

export default PostJobPage;
