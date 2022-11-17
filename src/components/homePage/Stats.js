import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function Stats() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 2, md: 30 }}
      sx={{
        width: "100%",
        minHeight: "180px",
        backgroundColor: "#4EDAC0",
        my: 10,
        p: 3,
      }}
    >
      <Stack alignItems="center">
        <Typography
          fontFamily={"Montserrat"}
          variant="h3"
          color={"#FFF"}
          fontWeight={600}
        >
          100+
        </Typography>
        <Typography
          variant="h6"
          fontFamily={"Montserrat"}
          color={"#FFF"}
          fontWeight={600}
        >
          Experienced Freelancers
        </Typography>
      </Stack>
      <Stack alignItems="center">
        <Typography
          fontFamily={"Montserrat"}
          variant="h3"
          color={"#FFF"}
          fontWeight={600}
        >
          500+
        </Typography>
        <Typography
          variant="h6"
          fontFamily={"Montserrat"}
          color={"#FFF"}
          fontWeight={600}
        >
          Jobs Done
        </Typography>
      </Stack>
      <Stack alignItems="center">
        <Typography
          fontFamily={"Montserrat"}
          variant="h3"
          color={"#FFF"}
          fontWeight={600}
        >
          95%
        </Typography>
        <Typography
          variant="h6"
          fontFamily={"Montserrat"}
          color={"#FFF"}
          fontWeight={600}
        >
          Satisfaction Rate
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Stats;
