import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import { FormProvider, FTextField } from "../../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, number } from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import CommentSection from "../comment/CommentSection";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getJobById } from "../job/jobSlice";
import { fToNow } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../../components/misc/LoadingScreen";
import { createBid } from "../bid/bidSlice";

let bidSchema = object({
  price: number().required("Bid is required"),
});

const defaultValues = {
  price: "",
};

function JobDetailPage({ job, loading }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const params = useParams();
  const jobId = params.id;

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
      dispatch(createBid({ ...data, jobId })).then(window.location.reload());
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  const getCurrentUserBid = () => {
    if (job) {
      const jobBids = job.bids;
      const userBid = jobBids.filter((bid) => bid.bidder === user._id);
      return userBid[0];
    }
  };
  let currentUserBid = getCurrentUserBid();

  return (
    <>
      <Helmet>
        <style>{"body { background-color: #F0F3F5; }"}</style>
      </Helmet>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {job && (
            <>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={{ xs: 5, md: 0 }}
              >
                <Stack spacing={2} sx={{ width: { xs: "100%", md: "75%" } }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#21BBB5", fontWeight: 600 }}
                    gutterBottom
                  >
                    {job?.title}
                  </Typography>
                  <Typography variant="body1" sx={{ overflow: "hidden" }}>
                    {job?.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600 }}
                    gutterBottom
                  >
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
                      fontWeight={500}
                      component={RouterLink}
                      to={`/users/${job.lister._id}`}
                      sx={{ ml: 1 }}
                    >
                      {job.lister.name}
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
                  {job && (
                    <Typography
                      textAlign={"center"}
                      sx={{ position: "relative", top: -15, fontSize: 15 }}
                    >
                      Posted {fToNow(job.createdAt)}
                    </Typography>
                  )}

                  {job?.bidCount === 0 ? (
                    <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                      No Bids Yet
                    </Typography>
                  ) : (
                    <>
                      {job && (
                        <>
                          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                            Highest Bid: {fCurrency(job.highestBid)}
                          </Typography>
                          <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                            Average Bid: {fCurrency(job.averageBid.toFixed(1))}
                          </Typography>
                        </>
                      )}
                      <Typography> {job.bidCount} Bids </Typography>
                    </>
                  )}
                </Stack>
              </Stack>
              <Divider sx={{ my: 2 }} />
              {job && user._id === job.lister._id ? (
                ""
              ) : !user.isFreelancer ? (
                <Typography variant="h6" fontWeight={"bold"}>
                  You need to be a freelancer to bid on this job
                </Typography>
              ) : job.bidders.includes(user._id) ? (
                <Stack alignItems={{ xs: "center", md: "end" }}>
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
                    <CheckCircleIcon
                      fontSize={"large"}
                      sx={{ color: "#25C335" }}
                    />
                    <Typography
                      textAlign={"center"}
                      fontSize={18}
                      fontWeight={600}
                    >
                      You bidded {fCurrency(currentUserBid.price)} on this job
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
                    >
                      Cancel Bid
                    </Button>
                  </Box>
                </Stack>
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
        </>
      )}
    </>
  );
}

export default JobDetailPage;
