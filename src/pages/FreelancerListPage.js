import { Breadcrumbs, Container, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import FreelancerList from "../features/user/FreelancerList";
import { Link as RouterLink } from "react-router-dom";

function FreelancerListPage() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          minHeight: "100vh",
          minWidth: "75vw",
          mt: 12,
        }}
      >
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            Home
          </Link>
          <Typography>Freelancers</Typography>
        </Breadcrumbs>
        <Helmet>
          <style>{"body { background-color: #F0F3F5; }"}</style>
        </Helmet>
        <Stack sx={{ flexGrow: 1 }}>
          <FreelancerList />
        </Stack>
      </Container>
    </>
  );
}

export default FreelancerListPage;
