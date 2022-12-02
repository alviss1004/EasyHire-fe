import { Container, Grid } from "@mui/material";
import React from "react";
import LoadingScreen from "../../components/misc/LoadingScreen";
import AccountBidCard from "../bid/AccountBidCard";

function AccountBids({ bids, loading }) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
      }}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        bids && (
          <Grid container spacing={3}>
            {bids.map((bid) => (
              <Grid key={bid._id} item xs={12} md={6}>
                <AccountBidCard bid={bid} />
              </Grid>
            ))}
          </Grid>
        )
      )}
    </Container>
  );
}

export default AccountBids;
