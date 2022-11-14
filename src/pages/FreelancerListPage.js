import {
  Breadcrumbs,
  Container,
  Link,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import apiService from "../app/apiService";
import LoadingScreen from "../components/misc/LoadingScreen";
import { Helmet } from "react-helmet";
import { faker } from "@faker-js/faker";
import FreelancerList from "../features/user/FreelancerList";
import { Link as RouterLink } from "react-router-dom";

const createRandomFreelancer = () => {
  let skillList = [];
  Array.from({ length: 3 }).forEach(() => {
    skillList.push(faker.company.bsBuzz());
  });
  const newFreelancer = {
    userId: faker.datatype.uuid(),
    aboutMe: faker.lorem.paragraph(),
    name: faker.internet.userName(),
    avatar: faker.image.avatar(),
    company: faker.company.companyName(),
    industry: faker.name.jobArea(),
    skills: skillList,
    reviewCount: faker.datatype.number({ max: 1000 }),
    rating: Math.floor(Math.random() * 10),
  };
  return newFreelancer;
};

let freelancers = [];

Array.from({ length: 10 }).forEach(() => {
  freelancers.push(createRandomFreelancer());
});

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
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="flex-end"
            mb={2}
            sx={{ width: { md: "90%" } }}
          >
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
          <FreelancerList freelancers={freelancers} />
        </Stack>
      </Container>
    </>
  );
}

export default FreelancerListPage;
