import { Card, CardContent, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";

function BidCard({ bid }) {
  return (
    <Card>
      <CardContent>
        <Typography>Bid Amount: {fCurrency(bid.price)}</Typography>
        <Typography>Job Title : {bid.targetJob.title}</Typography>
        <Typography>Bid Status : {bid.status}</Typography>
        <Link
          component={RouterLink}
          to={`/jobs/${bid.targetJob._id}`}
          sx={{ color: "#4492CE", fontWeight: 600 }}
        >
          Link to job
        </Link>
      </CardContent>
    </Card>
  );
}

export default BidCard;
