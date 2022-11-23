import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { getJobById } from "../job/jobSlice";
import { getUserBids } from "../user/userSlice";

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createBidSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    deleteBidSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createBid =
  ({ price, jobId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/bids/${jobId}`, {
        price,
      });
      dispatch(slice.actions.createBidSuccess(response.data.data));
      dispatch(getJobById(jobId));
      toast.success("Create bid successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteBid =
  (bidId, jobId = null) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/bids/${bidId}`);
      dispatch(slice.actions.deleteBidSuccess(response.data.data));
      if (jobId) dispatch(getJobById(jobId));
      dispatch(getUserBids());
      toast.success("Delete bid successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
