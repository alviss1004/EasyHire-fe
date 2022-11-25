import {
  Avatar,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import { acceptBid, declineBid } from "../bid/bidSlice";

function JobBidCard({ bid }) {
  const dispatch = useDispatch();
  const [openAccept, setOpenAccept] = React.useState(false);
  const [openDecline, setOpenDecline] = React.useState(false);

  const handleClickOpenAccept = () => {
    setOpenAccept(true);
  };
  const handleClickOpenDecline = () => {
    setOpenDecline(true);
  };

  const handleClose = () => {
    setOpenAccept(false);
    setOpenDecline(false);
  };

  const handleDeclineBid = async (bidId, jobId) => {
    dispatch(declineBid(bidId, jobId));
  };

  const handleAcceptBid = async (bidId, jobId) => {
    dispatch(acceptBid(bidId, jobId));
  };

  return (
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
            {bid.status === "accepted" ? (
              <CheckCircleIcon fontSize={"large"} sx={{ color: "#25C335" }} />
            ) : (
              <>
                <Button
                  sx={{ fontSize: "0.8rem", height: "40%" }}
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={handleClickOpenAccept}
                >
                  Accept
                </Button>
                <Dialog
                  open={openAccept}
                  onClose={handleClose}
                  aria-labelledby="accept-dialog"
                >
                  <DialogTitle id="accept-dialog">
                    {"Accept confirmation"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to accept this bid?
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
                        handleAcceptBid(bid._id, bid.targetJob);
                        handleClose();
                      }}
                      autoFocus
                      sx={{ fontWeight: 600 }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  sx={{ fontSize: "0.8rem", height: "40%" }}
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={handleClickOpenDecline}
                >
                  Decline
                </Button>
                <Dialog
                  open={openDecline}
                  onClose={handleClose}
                  aria-labelledby="decline-dialog"
                >
                  <DialogTitle id="decline-dialog">
                    {"Decline confirmation"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to decline this bid?
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
                        handleDeclineBid(bid._id, bid.targetJob);
                        handleClose();
                      }}
                      autoFocus
                      sx={{ fontWeight: 600 }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default JobBidCard;
