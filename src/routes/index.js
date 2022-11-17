import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import FreelancerListPage from "../pages/FreelancerListPage";
import JobListPage from "../pages/JobListPage";
import JobDetailPage from "../pages/JobDetailPage";
import UserDetailPage from "../pages/UserDetailPage";
import PostJobPage from "../pages/PostJobPage";
import AccountPage from "../pages/AccountPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="freelancers" element={<FreelancerListPage />} />
        <Route path="jobs" element={<JobListPage />} />
      </Route>

      <Route
        element={
          <AuthRequire>
            <ProtectedLayout />
          </AuthRequire>
        }
      >
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
        <Route path="/jobs/post" element={<PostJobPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
