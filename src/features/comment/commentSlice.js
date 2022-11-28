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
    editCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
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

export const editComment =
  ({ content, commentId, jobId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comments/${commentId}`, {
        content,
      });
      dispatch(slice.actions.editCommentSuccess(response.data.data));
      dispatch(getJobComments({ page: 1, limit: 5, jobId }));
      return response.data.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteComment = (commentId, jobId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/comments/${commentId}`);
    dispatch(slice.actions.deleteCommentSuccess(response.data.data));
    dispatch(getJobComments({ page: 1, limit: 5, jobId }));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
