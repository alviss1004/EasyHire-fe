import {
  Breadcrumbs,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fCurrency } from "../utils/numberFormat";
import { createTheme } from "@mui/material/styles";
import { FormProvider, FTextField } from "../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, number } from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import CommentSection from "../features/comment/CommentSection";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getJobById } from "../features/job/jobSlice";
import { fToNow } from "../utils/formatTime";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/misc/LoadingScreen";

let bidSchema = object({
  bid: number().required("Bid is required"),
});

const defaultValues = {
  bid: null,
};

function JobDetailPage() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const jobId = params.id;
  const { selectedJob, isLoading } = useSelector(
    (state) => state.job,
    shallowEqual
  );

  useEffect(() => {
    if (jobId) dispatch(getJobById(jobId));
  }, [dispatch, jobId]);

  const methods = useForm({
    resolver: yupResolver(bidSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = () => {
    console.log("submitting");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{ mb: 3, mt: 12, ml: "13%" }}
      >
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/jobs"
        >
          Jobs
        </Link>
        <Typography>{selectedJob?.title}</Typography>
      </Breadcrumbs>
      <Container
        sx={{
          backgroundColor: "#FFF",
          minWidth: "75vw",
          maxWidth: "75vw",
          boxShadow: 1,
          p: 2,
        }}
      >
        <Helmet>
          <style>{"body { background-color: #F0F3F5; }"}</style>
        </Helmet>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={{ xs: 5, md: 0 }}
              d
            >
              <Stack spacing={2} sx={{ width: { xs: "100%", md: "75%" } }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#21BBB5", fontWeight: 600 }}
                  gutterBottom
                >
                  {selectedJob?.title}
                </Typography>
                <Typography variant="body1" sx={{ overflow: "hidden" }}>
                  {selectedJob?.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                >
                  Industry: {selectedJob?.industry}
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
                    fontWeight={500}
                    component={RouterLink}
                    to="/users/:id"
                    sx={{ ml: 1 }}
                  >
                    {selectedJob?.lister.name}
                  </Link>
                </Typography>
              </Stack>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ width: { xs: "100%", md: "20%" } }}
              >
                {selectedJob && (
                  <Typography
                    sx={{ position: "relative", top: -15, fontSize: 15 }}
                  >
                    Posted {fToNow(selectedJob.createdAt)}
                  </Typography>
                )}

                {selectedJob?.bidCount === 0 ? (
                  <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                    No Bids Yet
                  </Typography>
                ) : (
                  <>
                    {selectedJob && (
                      <>
                        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                          Highest Bid: {fCurrency(selectedJob?.highestBid)}
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                          Average Bid:{" "}
                          {fCurrency(selectedJob?.averageBid.toFixed(1))}
                        </Typography>
                      </>
                    )}
                    <Typography> {selectedJob?.bidCount} Bids </Typography>
                  </>
                )}
              </Stack>
            </Stack>
            <Divider sx={{ my: 2 }} />
            {user._id === selectedJob.lister._id ? (
              ""
            ) : !user.isFreelancer ? (
              <Typography variant="h6" fontWeight={"bold"}>
                You need to be a freelancer to bid on this job
              </Typography>
            ) : (
              <>
                <Typography variant="h6" fontWeight={"bold"}>
                  Interested in this job? Place your bid now and wait for
                  response.
                </Typography>
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    my={3}
                    sx={{ width: { xs: "100%", md: "75%" } }}
                  >
                    <FTextField name="bid" label="Your bid" />
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleClickOpen}
                      sx={{
                        maxHeight: "55px",
                        backgroundColor: "#E53838",
                        ":hover": {
                          filter: "brightness(120%)",
                          backgroundColor: "#E53838",
                        },
                      }}
                    >
                      Place Your Bid
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        {"Bid confirmation"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Are you sure you want to bid? You cannot edit your bid
                          after.
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
                        <LoadingButton
                          type="submit"
                          loading={isSubmitting}
                          sx={{ fontWeight: 600 }}
                        >
                          Confirm
                        </LoadingButton>
                      </DialogActions>
                    </Dialog>
                  </Stack>
                </FormProvider>
              </>
            )}
            <Stack
              direction="column"
              mt={7}
              sx={{ width: { xs: "100%", md: "75%" } }}
            >
              <Typography variant="h6" fontWeight={"bold"}>
                Questions
              </Typography>
              <CommentSection />
            </Stack>{" "}
          </>
        )}
      </Container>
    </>
  );
}

export default JobDetailPage;
