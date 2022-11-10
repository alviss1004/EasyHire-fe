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
        sx={{ position: "absolute" }}
      >
        <Box sx={{ height: "90vh" }}>
          <img src="./covers/cover1.png" alt="cover1" />
        </Box>
        <Box sx={{ height: "90vh" }}>
          <img src="./covers/cover2.jpg" alt="cover2" />
        </Box>
        <Box sx={{ height: "90vh" }}>
          <img src="./covers/cover3.png" alt="cover3" />
        </Box>
      </Carousel>
    </Box>
  );
}

export default CoverCarousel;
