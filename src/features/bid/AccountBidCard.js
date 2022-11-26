import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, CardContent, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import { deleteBid } from "../bid/bidSlice";
import Clear from "@mui/icons-material/Clear";

function AccountBidCard({ bid }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteBid = async (bidId) => {
    dispatch(deleteBid(bidId));
  };

  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="space-between"
        >
          <Stack spacing={1}>
            <Typography letterSpacing={0.35} color="#DF1919" fontWeight={600}>
              Bid Amount: {fCurrency(bid.price)}
            </Typography>
            <Typography>
              For:{" "}
              <Link
                component={RouterLink}
                to={`/jobs/${bid.targetJob._id}`}
                sx={{
                  textDecoration: "none",
                  fontSize: 18,
                  letterSpacing: 0.35,
                  color: "#4492CE",
                  fontWeight: 600,
                }}
              >
                {bid.targetJob.title}
              </Link>
            </Typography>
            <Typography
              letterSpacing={0.35}
              sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}
            >
              Status:{" "}
              <Typography letterSpacing={0.35} fontWeight={600}>
                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
              </Typography>
            </Typography>
          </Stack>
          {bid.status === "active" ? (
            <>
              {" "}
              <IconButton aria-label="delete" onClick={handleClickOpen}>
                <Clear />
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="cancelBid-dialog"
              >
                <DialogTitle id="cancelBid-dialog">
                  {"Cancel confirmation"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to cancel this bid?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    autoFocus
                    onClick={handleClose}
                    sx={{ color: "#F22C35", fontWeight: 600 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteBid(bid._id);
                      handleClose();
                    }}
                    autoFocus
                    sx={{ fontWeight: 600 }}
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>{" "}
            </>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AccountBidCard;
