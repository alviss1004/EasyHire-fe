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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

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
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography color="#DF1919" fontWeight={600}>
              Bid Amount: {fCurrency(bid.price)}
            </Typography>
            <Typography>For: {bid.targetJob.title}</Typography>
            <Typography> Status: {bid.status}</Typography>
            <Link
              component={RouterLink}
              to={`/jobs/${bid.targetJob._id}`}
              sx={{ color: "#4492CE", fontWeight: 600 }}
            >
              Link to job
            </Link>
          </Stack>
          <IconButton aria-label="delete" onClick={handleClickOpen}>
            <HighlightOffIcon />
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
          </Dialog>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AccountBidCard;
