import { Stack } from "@mui/material";
import React from "react";
import ReviewCard from "./ReviewCard";

function reviewList({ reviews, loading }) {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} loading={loading} />
      ))}
    </Stack>
  );
}

export default reviewList;
