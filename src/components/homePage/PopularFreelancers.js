import React, { useState } from "react";
import InfiniteCarousel from "react-leaf-carousel";
import { faker } from "@faker-js/faker";
import FreelancerCard from "./FreelancerCard";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";

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
        Featured Freelancers
      </Typography>
      <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]}
        dots={false}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.5}
        slidesToScroll={4}
        slidesToShow={4}
        scrollOnDevice={true}
        autoCycle={true}
        cycleInterval={5000}
      >
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer.userId} freelancer={freelancer} />
        ))}
      </InfiniteCarousel>
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
  );
}

export default PopularFreelancers;
