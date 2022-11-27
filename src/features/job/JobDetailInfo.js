import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Link,
  Rating,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Stack } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import { FormProvider, FTextField } from "../../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, number } from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { fToNow } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";
import { createBid, deleteBid } from "../bid/bidSlice";
import { editJob } from "./jobSlice";
import { styled } from "@mui/system";
import ReviewForm from "../review/ReviewForm";
import CommentPost from "../comment/CommentPost";
import CommentList from "../comment/CommentList";

const StyledLink = styled(RouterLink)({
  textDecoration: "none",
  color: "#007fed",
  "&:hover": {
    textDecoration: "none",
  },
  "&:active": {
    textDecoration: "none",
  },
  "&:link": {
    textDecoration: "none",
  },
  "&:visited": {
    textDecoration: "none",
  },
});

let bidSchema = object({
  price: number().required("Bid is required").positive(),
});

const defaultValues = {
  price: "",
};

function JobDetailPage({ job, loading }) {
  let location = useLocation();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const params = useParams();
  const jobId = params.id;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const methods = useForm({
    resolver: yupResolver(bidSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      dispatch(createBid({ ...data, jobId }));
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const handleDeleteBid = async (bidId, jobId) => {
    dispatch(deleteBid(bidId, jobId));
  };

  const handleCompleteJob = async (jobId) => {
    await dispatch(editJob({ jobId, status: "finished" }));
  };

  const getCurrentUserBid = () => {
    if (job) {
      const jobBids = job.bids;
      const userBid = jobBids.filter((bid) => bid.bidder._id === user._id);
      return userBid[0];
    }
  };

  return (
    <>
      <Helmet>
        <style>{"body { background-color: #F0F3F5; }"}</style>
      </Helmet>

      {job && (
        <>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={{ xs: 5, md: 0 }}
          >
            <Stack spacing={2} sx={{ width: { xs: "100%", md: "75%" } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  sx={{ color: "#21BBB5", fontWeight: 600 }}
                  gutterBottom
                >
                  {job?.title}
                </Typography>
                <Typography fontSize={"0.85rem"}>
                  Posted {fToNow(job.createdAt)}
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ overflow: "hidden" }}>
                {job?.description}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }} gutterBottom>
                Industry: {job?.industry}
              </Typography>

              <Typography
                variant="body1"
                fontWeight={"bold"}
                sx={{ overflow: "hidden" }}
              >
                Client:
                <Link
                  underline="hover"
                  color="#007fed"
                  fontSize={17}
                  component={RouterLink}
                  to={`/users/${job.lister._id}`}
                  sx={{ ml: 1 }}
                >
                  {job.lister.name}
                </Link>
              </Typography>
            </Stack>
            {job.status === "bidding" ? (
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ width: { xs: "100%", md: "20%" } }}
              >
                {job?.bidCount === 0 ? (
                  <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                    No Bids Yet
                  </Typography>
                ) : (
                  <>
                    {job && (
                      <>
                        <Typography
                          textAlign={"center"}
                          sx={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#EE1B1B",
                          }}
                        >
                          Highest Bid: {fCurrency(job.highestBid)}
                        </Typography>
                        <Typography
                          textAlign={"center"}
                          sx={{ fontSize: 18, fontWeight: 600 }}
                        >
                          Average Bid: {fCurrency(job.averageBid.toFixed(1))}
                        </Typography>
                      </>
                    )}
                    <Typography> {job.bidCount} Bids </Typography>
                  </>
                )}
              </Stack>
            ) : job.status === "ongoing" ? (
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ pr: { md: 1 } }}
              >
                <ConstructionIcon fontSize="large" />
                <Typography fontWeight={600} fontSize={18}>
                  Job in progress
                </Typography>
              </Stack>
            ) : (
              <Stack alignItems="center" spacing={1} sx={{ pr: { md: 1 } }}>
                <CheckCircleIcon fontSize={"large"} sx={{ color: "#25C335" }} />
                <Typography fontWeight={600} fontSize={18}>
                  Job finished
                </Typography>
              </Stack>
            )}
          </Stack>
          <Divider sx={{ my: 2 }} />
          {job && user._id === job.lister._id ? (
            ""
          ) : !user.isFreelancer ? (
            <Typography variant="h6" fontWeight={"bold"}>
              You need to be a freelancer to bid on this job
            </Typography>
          ) : job.bidders.includes(user._id) && !job.assignee ? (
            <Stack alignItems="center">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  width: { md: "20%" },
                  mt: 2,
                }}
              >
                <CheckCircleIcon fontSize={"large"} sx={{ color: "#25C335" }} />
                <Typography textAlign={"center"} fontSize={18} fontWeight={600}>
                  You are bidding {fCurrency(getCurrentUserBid().price)} on this
                  job
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#E85454",
                    ":hover": {
                      filter: "brightness(120%)",
                      backgroundColor: "#E53838",
                    },
                  }}
                  onClick={handleClickOpen}
                >
                  Cancel Bid
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
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
                        handleDeleteBid(getCurrentUserBid()._id, jobId);
                        handleClose();
                      }}
                      autoFocus
                      sx={{ fontWeight: 600 }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Stack>
          ) : user.isFreelancer && !job.assignee ? (
            <>
              <Typography variant="h6" fontWeight={"bold"}>
                Interested in this job? Place your bid now and wait for
                response.
              </Typography>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={2}
                  my={3}
                  sx={{ width: { xs: "100%", md: "75%" } }}
                >
                  {!!errors.responseError && (
                    <Alert severity="error">
                      {errors.responseError.message}{" "}
                    </Alert>
                  )}
                  <FTextField name="price" label="Your Bid In $" />
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    sx={{
                      maxHeight: 60,
                      fontWeight: 600,
                      backgroundColor: "#E53838",
                      ":hover": {
                        filter: "brightness(120%)",
                        backgroundColor: "#E53838",
                      },
                    }}
                  >
                    Place Your Bid
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </>
          ) : null}
          {job?.status === "bidding" ? (
            <Stack
              direction="column"
              mt={7}
              sx={{ width: { xs: "100%", md: "75%" } }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                Questions
              </Typography>
              <CommentPost jobId={job._id} />
              <CommentList jobId={job._id} />
            </Stack>
          ) : job?.status === "ongoing" ? (
            <Stack spacing={2} sx={{ mt: 3, mb: 1 }}>
              <Typography
                fontSize={{ xs: "1rem", sm: "1.25rem" }}
                fontFamily={"Roboto"}
                fontWeight={600}
              >
                Freelancer{" "}
                <StyledLink to={`/users/${job.assignee._id}`}>
                  {job.assignee.name}{" "}
                </StyledLink>{" "}
                is currently working on this job
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  component="img"
                  src={job.assignee.avatarUrl}
                  height="10%"
                  width="10%"
                  alt="avatar"
                  sx={{
                    minWidth: { xs: "40%", sm: 150 },
                    minHeight: { xs: "40%", sm: 150 },
                    borderRadius: "50%",
                  }}
                />
                <Stack
                  spacing={{ xs: 1, md: 2 }}
                  alignItems={{ xs: "center", md: "start" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: { xs: 2, md: 0 } }}
                  >
                    {job.assignee?.rating ? (
                      <Typography>{job.assignee.rating.toFixed(1)}</Typography>
                    ) : (
                      <Typography>No rating</Typography>
                    )}
                    <Rating
                      name="user-rating"
                      value={job.assignee ? job.assignee.rating : 0}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                  </Stack>
                  {job.assignee?.reviews?.length !== 0 ? (
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={"#2B9EBD"}
                      gutterBottom
                    >
                      ({job.assignee.reviews.length} reviews)
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      color={"#2B9EBD"}
                      gutterBottom
                    >
                      (No reviews)
                    </Typography>
                  )}
                </Stack>
              </Stack>
              {user._id === job.lister._id ? (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      height: 40,
                      alignSelf: "center",
                      backgroundColor: "#EF4444",
                      ":hover": {
                        backgroundColor: "#EF4444",
                        filter: "brightness(90%)",
                      },
                      fontWeight: 600,
                    }}
                    onClick={handleClickOpen}
                  >
                    Mark Job As Complete
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="markComplete-dialog"
                  >
                    <DialogTitle id="markComplete-dialog">
                      {"Mark as Complete Confirmation"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText sx={{ color: "#555555" }}>
                        Are you sure you want to mark this job as complete? Only
                        confirms if the freelancer has completed this job. You
                        cannot redo once confirmed.
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
                        state={{ backgroundLocation: location }}
                        onClick={() => {
                          handleCompleteJob(job._id);
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
              ) : null}
            </Stack>
          ) : (
            <>
              <Stack spacing={2} sx={{ mt: 3, mb: 1 }}>
                <Typography
                  fontSize={{ xs: "1rem", sm: "1.25rem" }}
                  fontFamily={"Roboto"}
                  fontWeight={600}
                >
                  Freelancer{" "}
                  <StyledLink to={`/users/${job.assignee._id}`}>
                    {job.assignee.name}{" "}
                  </StyledLink>{" "}
                  was assigned for this job
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Box
                    component="img"
                    src={job.assignee.avatarUrl}
                    height="10%"
                    width="10%"
                    alt="avatar"
                    sx={{
                      minWidth: { xs: "40%", sm: 150 },
                      minHeight: { xs: "40%", sm: 150 },
                      borderRadius: "50%",
                    }}
                  />
                  <Stack spacing={1} alignItems={{ xs: "center", md: "start" }}>
                    <Typography fontWeight={600}>
                      Winning bid: {fCurrency(job.bids[0].price)}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: { xs: 2, md: 0 } }}
                    >
                      {job.assignee?.rating ? (
                        <Typography>
                          {job.assignee.rating.toFixed(1)}
                        </Typography>
                      ) : (
                        <Typography>No rating</Typography>
                      )}
                      <Rating
                        name="user-rating"
                        value={job.assignee ? job.assignee.rating : 0}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </Stack>
                    {job.assignee?.reviews?.length !== 0 ? (
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color={"#2B9EBD"}
                        gutterBottom
                      >
                        ({job?.assignee?.reviews?.length} reviews)
                      </Typography>
                    ) : (
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        color={"#2B9EBD"}
                        gutterBottom
                      >
                        (No reviews)
                      </Typography>
                    )}
                  </Stack>{" "}
                </Stack>
              </Stack>
              {!job.review && <ReviewForm jobId={job._id} />}
            </>
          )}
        </>
      )}
    </>
  );
}

export default JobDetailPage;
