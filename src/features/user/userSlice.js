import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { FREELANCERS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { stringify } from "query-string";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
  freelancersById: {},
  currentPageFreelancers: [],
  featuredFreelancers: [],
  userListings: [],
  userBids: [],
  totalFreelancers: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getMyProfile(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getFreelancersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentPageFreelancers = [];
      const { freelancers, totalPages, count } = action.payload;
      freelancers.forEach((freelancer) => {
        state.freelancersById[freelancer._id] = freelancer;
        if (!state.currentPageFreelancers.includes(freelancer._id))
          state.currentPageFreelancers.push(freelancer._id);
      });
      state.totalFreelancers = count;
      state.totalPages = totalPages;
    },
    getFeaturedFreelancersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { freelancers } = action.payload;
      state.featuredFreelancers = freelancers;
    },
    getUserListingsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { myJobs } = action.payload;
      state.userListings = myJobs;
    },
    getUserBidsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { myBids } = action.payload;
      state.userBids = myBids;
    },
    getUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedUser = action.payload.user;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload.user;
    },
  },
});

export const getUserById = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserByIdSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getFreelancers =
  ({ page, limit = FREELANCERS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const query = { page, limit };
      const response = await apiService.get(
        `/users/freelancers?${stringify(query)}`
      );
      dispatch(slice.actions.getFreelancersSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getFeaturedFreelancers = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/freelancers/featured`);
    dispatch(slice.actions.getFeaturedFreelancersSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getUserListings = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/me/jobs`);
    dispatch(slice.actions.getUserListingsSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getUserBids = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/me/bids`);
    dispatch(slice.actions.getUserBidsSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getMyProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/me`);
    dispatch(slice.actions.getMyProfileSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const updateUserProfile =
  ({
    userId,
    name,
    isFreelancer,
    avatarUrl,
    aboutMe,
    company,
    jobTitle,
    industry,
    facebookLink,
    instagramLink,
    linkedinLink,
    twitterLink,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        userId,
        name,
        isFreelancer,
        aboutMe,
        company,
        jobTitle,
        industry,
        facebookLink,
        instagramLink,
        linkedinLink,
        twitterLink,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export default slice.reducer;
