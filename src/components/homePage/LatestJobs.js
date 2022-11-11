import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";
import { Stack } from "@mui/system";
import EastIcon from "@mui/icons-material/East";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";

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

Array.from({ length: 5 }).forEach(() => {
  jobs.push(createRandomJob());
});

function LatestJobs() {
  const navigate = useNavigate();

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
        {jobs.map((job) => (
          <JobCard key={job.jobId} job={job} />
        ))}
      </Stack>
    </Box>
  );
}

export default LatestJobs;
