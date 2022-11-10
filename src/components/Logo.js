import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledLink = styled(RouterLink)({
  textDecoration: "none",
  "&:hover": {
    textDecoration: "none",
  },
  "&:active": {
    textDecoration: "none",
  },
  "&:link": {
    textDecoration: "none",
  },
  "&:visited": {
    textDecoration: "none",
  },
});

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <>
      <Typography
        component="span"
        sx={{
          fontFamily: "Montserrat, serif",
          fontSize: "1.7rem",
          fontWeight: "bold",
          color: "#FFF",
        }}
      >
        Easy
      </Typography>
      <Typography
        component="span"
        sx={{
          fontFamily: "Lobster, serif",
          fontSize: "2rem",
          fontWeight: "bold",
          letterSpacing: 2,
          color: "#33E2B6",
        }}
      >
        Hire
      </Typography>
    </>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <StyledLink to="/" sx={{ textDecoration: "none" }}>
      {logo}
    </StyledLink>
  );
}

export default Logo;
