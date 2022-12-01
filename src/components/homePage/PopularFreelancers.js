import React, { useEffect } from "react";
import FreelancerCard from "./FreelancerCard";
import { Box } from "@mui/system";
import { Button, Divider, Typography } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedFreelancers } from "../../features/user/userSlice";

function PopularFreelancers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { featuredFreelancers } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFeaturedFreelancers());
  }, [dispatch]);

  return (
    <>
      <Box>
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
        <Marquee gradient={false} speed={20}>
          {featuredFreelancers.map((freelancer) => (
            <FreelancerCard key={freelancer._id} freelancer={freelancer} />
          ))}
        </Marquee>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4, mt: 2 }}>
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
