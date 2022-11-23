import {
  Breadcrumbs,
  Container,
  Link,
  Pagination,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import JobList from "../features/job/JobList";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../features/job/jobSlice";
import { JOBS_PER_PAGE } from "../app/config";
import LoadingScreen from "../components/misc/LoadingScreen";

const FILTER_INDUSTRY_OPTIONS = [
  "All",
  "Arts & Entertainment",
  "Accommodation & Food Services",
  "Architecture & Design",
  "Business & Finance",
  "Educational Services",
  "Engineering",
  "Healthcare & Social Assistance",
  "Manufacturing",
  "Music & Audio",
  "Programming & Technology",
];
const SORTBY_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "highestBidAsc", label: "Highest Bid: Low to High" },
  { value: "highestBidDesc", label: "Highest Bid: High to Low" },
  { value: "averageBidAsc", label: "Average Bid: Low to High" },
  { value: "averageBidDesc", label: "Average Bid: High to Low" },
];

function JobListPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("Newest");
  const [industry, setIndustry] = useState("All");
  const [search, setSearch] = useState("");
  const { jobsById, currentPageJobs, totalPages, totalJobs, isLoading } =
    useSelector((state) => state.job);

  const jobs = currentPageJobs.map((jobId) => jobsById[jobId]);

  useEffect(() => {
    dispatch(getJobs({ page, limit: JOBS_PER_PAGE, sortBy, industry, search }));
  }, [dispatch, page, sortBy, industry, search]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
          <Stack
            justifyContent="center"
            alignItems={{ xs: "center", md: "stretch" }}
            spacing={{ xs: 3, sm: 7, md: 3 }}
            sx={{
              backgroundColor: "#FFF",
              borderRadius: "1px solid black",
              boxShadow: 1,
              mb: { xs: 5 },
              p: 3,
              width: { sm: "80%", md: 250 },
            }}
          >
            <Stack direction="column" spacing={1}>
              <FormControl>
                <Typography sx={{ fontWeight: 600, fontSize: 20, mb: 2 }}>
                  Filter By Industry
                </Typography>
                <RadioGroup
                  onChange={(e) => setIndustry(e.target.value)}
                  name="industry-radio-group"
                  row
                  defaultValue="All"
                >
                  {FILTER_INDUSTRY_OPTIONS.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option.charAt(0).toUpperCase() + option.slice(1)}
                      sx={{ mb: 1 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <TextField
              name="searchQuery"
              label="Search"
              sx={{ width: 300 }}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="sortBy"
              label="Sort By"
              select
              fullWidth
              SelectProps={{ native: true }}
              onChange={(e) => setSortBy(e.target.value)}
              defaultValue="Newest"
              size="small"
              sx={{ width: 300 }}
            >
              {SORTBY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              showFirstButton
              showLastButton
            />
          </Stack>
          <Typography fontSize={17} sx={{ alignSelf: "center", mb: 1 }}>
            {totalJobs} jobs found
          </Typography>
          {isLoading ? <LoadingScreen /> : <JobList jobs={jobs} />}
        </Stack>
      </Container>
    </>
  );
}

export default JobListPage;
