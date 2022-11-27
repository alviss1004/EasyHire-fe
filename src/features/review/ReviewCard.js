import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";

function ReviewCard({ review, loading }) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 1, md: 3 }}
      justifyContent={{ xs: "center", md: "stretch" }}
      alignItems={{ xs: "center", md: "center" }}
      sx={{
        borderRadius: 1,
        boxShadow: 2,
        p: 2,
        backgroundColor: "rgba(235, 235, 235,0.5)",
      }}
    >
      <Box
        component="img"
        src={review.author.avatarUrl}
        height={{ xs: "40%", md: "14%" }}
        width={{ xs: "40%", md: "14%" }}
        alt="avatar"
        sx={{
          minWidth: { xs: "40%", md: 70 },
          minHeight: { xs: "40%", md: 70 },
          borderRadius: "50%",
        }}
      />
      <Stack spacing={1}>
        <Typography fontWeight={600}>Author: {review.author.name}</Typography>
        <Stack direction="row" spacing={1}>
          <Typography>Rating: {review.rating.toFixed(1)}</Typography>
          <Rating
            name="freelancer-rating"
            value={review.rating}
            precision={0.5}
            size="small"
            readOnly
          />
        </Stack>
        <Typography>Comment: {review.comment}</Typography>
      </Stack>
    </Stack>
  );
}

export default ReviewCard;
