import { Container, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/misc/LoadingScreen";
import BidCard from "../bid/BidCard";
import { getUserBids } from "./userSlice";

function AccountBids() {
  const dispatch = useDispatch();
  const { userBids, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserBids());
  }, [dispatch]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
      }}
    >
      <Helmet>
        <style>{"body { background-color: #F0F3F5; }"}</style>
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        userBids && (
          <Grid container spacing={3}>
            {userBids.map((bid) => (
              <Grid key={bid._id} item xs={12} sm={6} md={4}>
                <BidCard bid={bid} />
              </Grid>
            ))}
          </Grid>
        )
      )}
    </Container>
  );
}

export default AccountBids;
