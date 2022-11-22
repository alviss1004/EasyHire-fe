import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";

function JobDetailBids({ bids, loading }) {
  return (
    <Grid container spacing={3}>
      {bids.map((bid) => (
        <Grid key={bid._id} item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.5}>
                  <Avatar
                    alt={bid.bidder.name}
                    src={bid.bidder.avatarUrl}
                    sx={{ width: 48, height: 48 }}
                  />
                  <Stack>
                    <Typography fontSize={17}>
                      Bidder :{" "}
                      <Link
                        component={RouterLink}
                        to={`/users/${bid.bidder._id}`}
                        sx={{
                          textDecoration: "none",
                          color: "#34CEC3",
                          fontWeight: 600,
                        }}
                      >
                        {bid.bidder.name}
                      </Link>
                    </Typography>
                    <Typography>Amount: {fCurrency(bid.price)}</Typography>
                  </Stack>
                </Stack>
                <Stack spacing={1} alignItems="center">
                  <Button
                    sx={{ fontSize: "0.8rem", height: "40%" }}
                    size="small"
                    variant="contained"
                    color="success"
                  >
                    Accept
                  </Button>
                  <Button
                    sx={{ fontSize: "0.8rem", height: "40%" }}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    Decline
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default JobDetailBids;
