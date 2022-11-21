import { Box, Card, CardContent, Stack } from "@mui/material";
import React from "react";

function ReviewCard({ review, loading }) {
  console.log("REVIEW", review);
  return (
    <Card variant="outlined" sx={{ width: "80%", p: 2 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 4 }}
        justifyContent={{ xs: "center", md: "stretch" }}
        alignItems={{ xs: "center", md: "stretch" }}
      >
        <Box
          component="img"
          src=""
          height={{ xs: "60%", md: "20%" }}
          width={{ xs: "60%", md: "20%" }}
          alt="avatar"
          sx={{
            minWidth: { xs: "60%", md: 220 },
            minHeight: { xs: "60%", md: 220 },
            borderRadius: "50%",
          }}
        />
        <CardContent></CardContent>
      </Stack>
    </Card>
  );
}

export default ReviewCard;
