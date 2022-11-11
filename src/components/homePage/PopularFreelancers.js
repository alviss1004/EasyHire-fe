import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import FreelancerCard from "./FreelancerCard";
import { Box } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";

function PopularFreelancers() {
  const navigate = useNavigate();

  const createRandomFreelancer = () => {
    const newFreelancer = {
      userId: faker.datatype.uuid(),
      name: faker.internet.userName(),
      avatar: faker.image.avatar(),
      rating: Math.floor(Math.random() * 10),
    };
    return newFreelancer;
  };

  let freelancers = [];

  Array.from({ length: 10 }).forEach(() => {
    freelancers.push(createRandomFreelancer());
  });

  return (
    <>
      <Box sx={{ mt: { xs: 3, md: 7 } }}>
        <Divider
          variant="middle"
          sx={{
            backgroundColor: "#897777",
            width: "50%",
            margin: "auto",
          }}
        />
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
          Featured Freelancers
        </Typography>
        <Marquee gradient={false} speed={30}>
          {freelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.userId} freelancer={freelancer} />
          ))}
        </Marquee>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2, mt: 2 }}>
          <Button
            variant="contained"
            endIcon={<EastIcon />}
            onClick={() => navigate("/freelancers")}
            sx={{
              fontWeight: { xs: 800, md: 400 },
              fontSize: { xs: 12, md: 15 },
              px: { xs: 1, md: 2 },
              py: { xs: 1, md: 1 },
            }}
          >
            View all{" "}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default PopularFreelancers;
