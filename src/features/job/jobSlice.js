import { createSlice } from "@reduxjs/toolkit";
import { stringify } from "query-string";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { JOBS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  selectedJob: null,
  jobsById: {},
  latestJobs: [],
  currentPageJobs: [],
  totalJobs: 0,
  totalPages: 1,
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
    createJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    editJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedJob = action.payload.job;
    },
    getJobsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPageJobs = [];
      const { jobs, totalPages, count } = action.payload;
      state.allJobs = jobs;
      jobs.forEach((job) => {
        state.jobsById[job._id] = job;
        if (!state.currentPageJobs.includes(job._id))
          state.currentPageJobs.push(job._id);
      });
      state.totalJobs = count;
      state.totalPages = totalPages;
    },
    getLatestJobsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.latestJobs = [];
      const { jobs } = action.payload;
      state.latestJobs = jobs;
    },
    getJobByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedJob = action.payload.job;
    },
    deleteJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const createJob =
  ({ title, industry, description, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/jobs", {
        title,
        industry,
        description,
        image: imageUrl,
      });
      dispatch(slice.actions.createJobSuccess(response.data.data));
      toast.success("Create job successfully");
      return response.data.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getJobs =
  ({ page, limit = JOBS_PER_PAGE, industry, search, sortBy }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const query = { page, limit, industry, search, sortBy };
      const response = await apiService.get(`/jobs?${stringify(query)}`);
      dispatch(slice.actions.getJobsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getLatestJobs = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/jobs/latest`);
    dispatch(slice.actions.getLatestJobsSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getJobById = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/jobs/${id}`);
    dispatch(slice.actions.getJobByIdSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const editJob =
  ({ jobId, title, industry, description, image }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.put(`/jobs/${jobId}`, {
        title,
        industry,
        description,
        image: imageUrl,
      });
      dispatch(slice.actions.editJobSuccess(response.data.data));
      toast.success("Edit job successfully");
      return response.data.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteJob = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/jobs/${id}`);
    dispatch(slice.actions.deleteJobSuccess());
    toast.success("Job Deleted");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
