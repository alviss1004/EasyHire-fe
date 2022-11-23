import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/misc/LoadingScreen";
import { getUserBids } from "./userSlice";
import { Button, Card, CardContent, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import { deleteBid } from "../bid/bidSlice";
import DeleteIcon from "@mui/icons-material/Delete";

function AccountBids() {
  const dispatch = useDispatch();
  const { userBids, isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getUserBids());
  }, [dispatch]);

  const handleDeleteBid = async (bidId) => {
    dispatch(deleteBid(bidId));
  };

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
              <Grid key={bid._id} item xs={12} md={6} lg={4}>
                <Card>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between">
                      <Stack>
                        <Typography fontFamily={"tahoma"}>
                          Bid Amount: {fCurrency(bid.price)}
                        </Typography>
                        <Typography fontFamily={"tahoma"}>
                          Job Title : {bid.targetJob.title}
                        </Typography>
                        <Typography fontFamily={"tahoma"}>
                          {" "}
                          Bid Status : {bid.status}
                        </Typography>
                        <Link
                          component={RouterLink}
                          to={`/jobs/${bid.targetJob._id}`}
                          sx={{ color: "#4492CE", fontWeight: 600 }}
                        >
                          Link to job
                        </Link>
                      </Stack>
                      <IconButton aria-label="delete" onClick={handleClickOpen}>
                        <DeleteIcon />
                      </IconButton>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Delete confirmation"}
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
                            onClick={() => handleDeleteBid(bid._id)}
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
              </Grid>
            ))}
          </Grid>
        )
      )}
    </Container>
  );
}

export default AccountBids;
