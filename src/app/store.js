import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import jobReducer from "../features/job/jobSlice";
import bidReducer from "../features/bid/bidSlice";
import reviewReducer from "../features/review/reviewSlice";
import commentReducer from "../features/comment/commentSlice";

const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
  bid: bidReducer,
  review: reviewReducer,
  comment: commentReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
