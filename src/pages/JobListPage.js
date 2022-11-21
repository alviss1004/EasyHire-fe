import {
  Breadcrumbs,
  Container,
  Link,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import orderBy from "lodash/orderBy";
import JobFilter from "../features/job/JobFilter";
import JobSearch from "../features/job/JobSearch";
import JobSort from "../features/job/JobSort";
import JobList from "../features/job/JobList";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../features/job/jobSlice";
import { JOBS_PER_PAGE } from "../app/config";

function JobListPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { jobsById, currentPageJobs, totalPages, isLoading } = useSelector(
    (state) => state.job
  );

  const jobs = currentPageJobs.map((jobId) => jobsById[jobId]);

  useEffect(() => {
    dispatch(getJobs({ page, limit: JOBS_PER_PAGE }));
  }, [dispatch, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const defaultValues = {
    industry: "All",
    sortBy: "newest",
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch, reset } = methods;
  const filters = watch();

  const filterJobs = applyFilter(jobs, filters);

  return (
    <>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ mb: 3, mt: 12, ml: "14%" }}
      >
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography>Jobs</Typography>
      </Breadcrumbs>
      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100vh",
          minWidth: "75vw",
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
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                showFirstButton
                showLastButton
              />
            </Stack>
          </FormProvider>
          <JobList jobs={filterJobs} loading={isLoading} />
        </Stack>
      </Container>
    </>
  );
}

function applyFilter(jobs, filters) {
  const { sortBy } = filters;
  let filteredJobs = jobs;

  // SORT BY
  if (sortBy === "newest") {
    filteredJobs = orderBy(jobs, ["createdAt"], ["desc"]);
  }

  if (sortBy === "highestBidAsc") {
    filteredJobs = orderBy(jobs, ["highestBid"], ["asc"]);
  }

  if (sortBy === "highestBidDesc") {
    filteredJobs = orderBy(jobs, ["highestBid"], ["desc"]);
  }

  if (sortBy === "averageBidAsc") {
    filteredJobs = orderBy(jobs, ["averageBid"], ["asc"]);
  }

  if (sortBy === "averageBidDesc") {
    filteredJobs = orderBy(jobs, ["averageBid"], ["desc"]);
  }

  // FILTER JOBS
  if (filters.industry !== "All") {
    filteredJobs = jobs.filter((job) => filters.industry === job.industry);
  }

  if (filters.searchQuery) {
    filteredJobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.description
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredJobs;
}

export default JobListPage;
