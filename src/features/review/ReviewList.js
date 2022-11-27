import { Pagination, Stack } from "@mui/material";
import React, { useState } from "react";
import ReviewCard from "./ReviewCard";

function ReviewList({ reviews, loading }) {
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Stack spacing={4} sx={{ mt: 3 }}>
      <Pagination
        color="primary"
        count={Math.ceil(reviews.length / 10)}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
        sx={{ alignSelf: "center" }}
      />
      {reviews.slice((page - 1) * 10, page * 10).map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </Stack>
  );
}

export default ReviewList;
