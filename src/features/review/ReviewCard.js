import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { fDate } from "../../utils/formatTime";

function ReviewCard({ review, loading }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, md: 3 }}
      justifyContent="stretch"
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
        height={{ xs: "25%", md: "14%" }}
        width={{ xs: "25%", md: "14%" }}
        alt="avatar"
        sx={{
          minWidth: 70,
          minHeight: 70,
          borderRadius: "50%",
        }}
      />
      <Stack spacing={1}>
        <Stack>
          <Typography fontWeight={600}>Author: {review.author.name}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {fDate(review.createdAt)}
          </Typography>
        </Stack>
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
