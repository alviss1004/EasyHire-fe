import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/system";

function CoverCarousel() {
  return (
    <Box sx={{ position: "relative" }}>
      <Carousel
        showThumbs={false}
        stopOnHover={false}
        showIndicators={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showArrows={false}
        interval={7000}
      >
        <Box
          component="img"
          src="./covers/cover1.png"
          alt="cover1"
          sx={{ height: { xs: "50vh", md: "90vh" } }}
        />

        <Box
          component="img"
          src="./covers/cover2.jpg"
          alt="cover2"
          sx={{ height: { xs: "50vh", md: "90vh" } }}
        />

        <Box
          component="img"
          src="./covers/cover3.png"
          alt="cover3"
          sx={{ height: { xs: "50vh", md: "90vh" } }}
        />
      </Carousel>
    </Box>
  );
}

export default CoverCarousel;