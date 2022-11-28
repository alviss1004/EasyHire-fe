import { Pagination } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMENTS_PER_PAGE } from "../../app/config";
import LoadingScreen from "../../components/misc/LoadingScreen";
import CommentCard from "./CommentCard";
import { getJobComments } from "./commentSlice";

function CommentList({ jobId }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { commentsByJob, totalComments, totalPages, isLoading } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    dispatch(getJobComments({ page, limit: COMMENTS_PER_PAGE, jobId }));
  }, [dispatch, page, jobId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Stack spacing={1.5} sx={{ maxWidth: "80%" }}>
      {totalComments > COMMENTS_PER_PAGE && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          variant="outlined"
          sx={{ alignSelf: "start" }}
        />
      )}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        commentsByJob && (
          <Stack spacing={1.5}>
            {commentsByJob.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))}
          </Stack>
        )
      )}
    </Stack>
  );
}

export default CommentList;
