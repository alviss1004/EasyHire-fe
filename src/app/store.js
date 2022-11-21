import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import jobReducer from "../features/job/jobSlice";

const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
