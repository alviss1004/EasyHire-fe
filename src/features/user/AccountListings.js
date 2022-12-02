import { Container, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListings } from "./userSlice";
import LoadingScreen from "../../components/misc/LoadingScreen";
import JobCard from "../job/JobListCard";

const JOBSTATUS_OPTIONS = [
  { value: "bidding", label: "Bidding" },
  { value: "ongoing", label: "Ongoing" },
  { value: "finished", label: "Finished" },
];

function AccountListings() {
  const dispatch = useDispatch();
  const [jobStatus, setJobStatus] = useState("bidding");
  const { userListings, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserListings(jobStatus));
  }, [dispatch, jobStatus]);

  let renderListings;
  if (userListings) {
    renderListings = (
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: { xs: "100%", md: "80%" } }}
      >
        {userListings.map((job) => (
          <JobCard key={job._id} job={job} loading={isLoading} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderListings = <LoadingScreen />;
  }

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "100vh",
        minWidth: "75vw",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        id="jobStatus"
        label="Status"
        select
        fullWidth
        SelectProps={{ native: true }}
        onChange={(e) => setJobStatus(e.target.value)}
        defaultValue="bidding"
        size="small"
        sx={{ maxWidth: 300 }}
      >
        {JOBSTATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
      {renderListings}
    </Container>
  );
}

export default AccountListings;
