import { Alert, Box, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import orderBy from "lodash/orderBy";
import LoadingScreen from "../components/misc/LoadingScreen";
import JobFilter from "../features/job/JobFilter";
import JobSearch from "../features/job/JobSearch";
import JobSort from "../features/job/JobSort";
import JobList from "../features/job/JobList";
import { Helmet } from "react-helmet";
import { faker } from "@faker-js/faker";

const createRandomJob = () => {
  let skillList = [];
  Array.from({ length: 3 }).forEach(() => {
    skillList.push(faker.company.bsBuzz());
  });
  const newJob = {
    jobId: faker.datatype.uuid(),
    name: faker.name.jobTitle(),
    description: faker.commerce.productDescription(),
    industry: faker.name.jobArea(),
    skills: skillList,
    highestBid: Math.floor(Math.random() * (100 - 10) + 10),
    bidCount: Math.floor(Math.random() * 30),
  };
  return newJob;
};

let jobs = [];

Array.from({ length: 7 }).forEach(() => {
  jobs.push(createRandomJob());
});

function JobListPage() {
  const defaultValues = {
    gender: [],
    category: "All",
    priceRange: "",
    sortBy: "featured",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();
  const filterJobs = applyFilter(jobs, filters);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        minWidth: "75vw",
        mt: 14,
      }}
    >
      <Helmet>
        <style>{"body { background-color: #F0F3F5; }"}</style>
      </Helmet>
      <Stack sx={{ mr: 2 }}>
        <FormProvider methods={methods}>
          <JobFilter resetFilter={reset} />
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <JobSearch />
            <JobSort />
          </Stack>
        </FormProvider>
        <JobList jobs={filterJobs} />
      </Stack>
    </Container>
  );
}

function applyFilter(jobs, filters) {
  const { sortBy } = filters;
  let filteredJobs = jobs;

  // SORT BY
  if (sortBy === "featured") {
    filteredJobs = orderBy(jobs, ["sold"], ["desc"]);
  }
  if (sortBy === "newest") {
    filteredJobs = orderBy(jobs, ["createdAt"], ["desc"]);
  }

  // FILTER JOBS
  if (filters.industry !== "All") {
    filteredJobs = jobs.filter((job) => filters.gender === job.gender);
  }
  if (filters.skill !== "All") {
    filteredJobs = jobs.filter((job) => job.skill === filters.skill);
  }
  if (filters.priceRange) {
    filteredJobs = jobs.filter((job) => {
      if (filters.priceRange === "below") {
        return job.price < 25;
      }
      if (filters.priceRange === "between") {
        return job.price >= 25 && job.price <= 75;
      }
      return job.price > 75;
    });
  }
  if (filters.searchQuery) {
    filteredJobs = jobs.filter((job) =>
      job.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredJobs;
}

export default JobListPage;
