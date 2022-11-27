import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { stringify } from "query-string";
import { COMMENTS_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  commentsByJob: [],
  totalComments: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getJobCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.commentsByJob = [];
      const { comments, count, totalPages } = action.payload;
      state.commentsByJob = comments;
      state.totalComments = count;
      state.totalPages = totalPages;
    },
  },
});

export const createComment =
  ({ content, jobId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/comments/${jobId}`, {
        content,
      });
      dispatch(slice.actions.createCommentSuccess(response.data.data));
      dispatch(getJobComments({ page: 1, limit: COMMENTS_PER_PAGE, jobId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getJobComments =
  ({ page, limit, jobId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const query = { page, limit };
      const response = await apiService.get(
        `/comments/${jobId}?${stringify(query)}`
      );
      dispatch(slice.actions.getJobCommentsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error(error.message);
    }
  };

// export const acceptBid = (bidId, jobId) => async (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   try {
//     const response = await apiService.put(`/bids/accept/${bidId}`);
//     dispatch(slice.actions.acceptBidSuccess(response.data.data));
//     dispatch(getJobById(jobId));
//     toast.success("Accept bid successfully");
//   } catch (error) {
//     dispatch(slice.actions.hasError(error.message));
//     toast.error(error.message);
//   }
// };

// export const deleteBid =
//   (bidId, jobId = null) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await apiService.delete(`/bids/${bidId}`);
//       dispatch(slice.actions.deleteBidSuccess(response.data.data));
//       if (jobId) dispatch(getJobById(jobId));
//       dispatch(getUserBids());
//       toast.success("Delete bid successfully");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error.message));
//       toast.error(error.message);
//     }
// };

export default slice.reducer;
