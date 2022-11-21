import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Stack } from "@mui/system";
import EastIcon from "@mui/icons-material/East";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLatestJobs } from "../../features/job/jobSlice";
import LoadingScreen from "../misc/LoadingScreen";

function LatestJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { latestJobs, isLoading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getLatestJobs());
  }, [dispatch]);

  return (
    <Box sx={{ mt: 7 }}>
      <Typography
        align={"center"}
        sx={{
          fontFamily: "Montserrat",
          fontSize: 35,
          fontWeight: 800,
          letterSpacing: 1.5,
          my: 4,
        }}
      >
        Latest Jobs
      </Typography>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Button
            endIcon={<EastIcon />}
            onClick={() => navigate("/jobs")}
            sx={{
              fontWeight: { xs: 800, md: 600 },
              fontSize: 15,
            }}
          >
            See more{" "}
          </Button>
          {latestJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default LatestJobs;
