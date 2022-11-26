import { Stack } from "@mui/material";
import JobCard from "./JobListCard";

function JobList({ jobs, loading }) {
  return (
    <Stack spacing={2} justifyContent="center">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} loading={loading} />
      ))}
    </Stack>
  );
}

export default JobList;
