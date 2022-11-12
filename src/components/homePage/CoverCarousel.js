import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.7rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.9rem",
  },
};

theme.typography.body1 = {
  fontSize: "1rem",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem",
  },
};

function CoverCarousel() {
  return (
    <Box sx={{ position: "relative", display: "flex" }}>
      <Box
        sx={{
          position: "absolute",
          zIndex: 2,
          top: "30%",
          left: "17%",
          height: "80%",
          width: { xs: "70%", md: "32%" },
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography
            variant="h3"
            fontFamily={"Montserrat"}
            fontWeight={1900}
            color={"#71F6ED"}
            letterSpacing={0.5}
            sx={{ textShadow: "2px 2px rgba(104, 104, 104, 0.5 )" }}
          >
            Welcome to EasyHire,
            <br />
            the best platform for individual and businesses to get their jobs
            done.
          </Typography>
          <Typography
            variant="body1"
            fontWeight={500}
            color={"#FFF"}
            sx={{
              ml: 5,
              my: 2,
              textShadow: "2px 2px rgba(104, 104, 104, 0.4 )",
            }}
          >
            <li>Easy Signup</li>
            <li>Variety of Industries</li>
            <li>Experienced Freelancers</li>
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              ml: "20%",
              backgroundColor: "#FA8383",
              ":hover": {
                filter: "brightness(120%)",
                backgroundColor: "#FA8383",
              },
            }}
          >
            Post a Job
          </Button>
        </ThemeProvider>
      </Box>
      <Carousel
        showThumbs={false}
        stopOnHover={false}
        showIndicators={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
        interval={7000}
        sx={{ zIndex: 1 }}
      >
        <Box
          component="img"
          src="./covers/cover1.png"
          alt="cover1"
          sx={{ height: { xs: "50vh", md: "95vh" }, filter: "brightness(75%)" }}
        />

        <Box
          component="img"
          src="./covers/cover2.jpg"
          alt="cover2"
          sx={{ height: { xs: "50vh", md: "95vh" }, filter: "brightness(75%)" }}
        />

        <Box
          component="img"
          src="./covers/cover3.png"
          alt="cover3"
          sx={{ height: { xs: "50vh", md: "95vh" }, filter: "brightness(75%)" }}
        />
      </Carousel>
    </Box>
  );
}

export default CoverCarousel;
