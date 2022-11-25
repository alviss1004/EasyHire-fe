import { Grid } from "@mui/material";
import React from "react";
import JobBidCard from "../bid/JobBidCard";

function JobDetailBids({ bids }) {
  return (
    <Grid container spacing={3}>
      {bids.map((bid) => (
        <Grid key={bid._id} item xs={12} lg={4}>
          <JobBidCard bid={bid} />
        </Grid>
      ))}
    </Grid>
  );
}

export default JobDetailBids;
