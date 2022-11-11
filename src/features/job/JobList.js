import { Stack } from "@mui/material";
import JobCard from "./JobListCard";

function JobList({ jobs, loading }) {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      {jobs.map((job) => (
        <JobCard key={job.jobId} job={job} />
      ))}
    </Stack>
  );
}

export default JobList;
