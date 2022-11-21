import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { getUserListings } from "./userSlice";
import LoadingScreen from "../../components/misc/LoadingScreen";
import JobCard from "../job/JobListCard";

function AccountListings() {
  const dispatch = useDispatch();
  const { userListings, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserListings());
  }, [dispatch]);
  console.log("LISTINGS", userListings);
  console.log("LOADING", isLoading);

  let renderListings;

  if (userListings) {
    renderListings = (
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: { xs: "100%", md: "80%" } }}
      >
        {userListings.map((job) => (
          <JobCard key={job._id} job={job} loading={isLoading} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderListings = <LoadingScreen />;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        minWidth: "75vw",
      }}
    >
      <Helmet>
        <style>{"body { background-color: #F0F3F5; }"}</style>
      </Helmet>
      {renderListings}
    </Container>
  );
}

export default AccountListings;
