import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import jobReducer from "../features/job/jobSlice";
import bidReducer from "../features/bid/bidSlice";

const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
  bid: bidReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
