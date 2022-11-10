import { Box, Typography } from "@mui/material";
import React from "react";
import { faker } from "@faker-js/faker";
import { Stack } from "@mui/system";

const createRandomJob = () => {
  let skillList = [];
  Array.from({ length: 4 }).forEach(() => {
    skillList.push(faker.company.bsBuzz());
  });
  const newJob = {
    jobId: faker.datatype.uuid(),
    name: faker.name.jobTitle(),
    description: faker.commerce.productDescription(),
    industry: faker.name.jobArea(),
    skills: skillList,
  };
  return newJob;
};

let jobs = [];

Array.from({ length: 10 }).forEach(() => {
  jobs.push(createRandomJob());
});

function LatestJobs() {
  return (
    <Box sx={{ mt: 7 }}>
      <Typography
        align={"center"}
        sx={{
          fontFamily: "Montserrat",
          fontSize: 35,
          fontWeight: 800,
          letterSpacing: 1.5,
        }}
      >
        Latest Jobs
      </Typography>
      <Stack></Stack>
    </Box>
  );
}

export default LatestJobs;
