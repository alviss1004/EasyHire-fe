import { faker } from "@faker-js/faker";
import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Divider,
  Link,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { fCurrency } from "../utils/numberFormat";
import { createTheme } from "@mui/material/styles";
import { FormProvider, FTextField } from "../components/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, number } from "yup";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import CommentSection from "../features/comment/CommentSection";

let skillList = [];
Array.from({ length: 3 }).forEach(() => {
  skillList.push(faker.company.bsBuzz());
});
const job = {
  jobId: faker.datatype.uuid(),
  listerName: faker.internet.userName(),
  name: faker.name.jobTitle(),
  description: faker.commerce.productDescription(),
  industry: faker.name.jobArea(),
  skills: skillList,
  highestBid: Math.floor(Math.random() * (100 - 10) + 10),
  averageBid: Math.floor(Math.random() * (50 - 10) + 10),
  bidCount: Math.floor(Math.random() * 30),
  bidderCount: Math.floor(Math.random() * 20),
};

let bidSchema = object({
  bid: number().required("Bid is required"),
});

const defaultValues = {
  bid: null,
};

function JobDetailPage() {
  const theme = createTheme();

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

  const onSubmit = () => {
    console.log("submitting");
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
        <Typography>{job.name}</Typography>
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
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 5, md: 0 }}
          divider={
            <Divider
              orientation={
                useMediaQuery(theme.breakpoints.down("md"))
                  ? "horizontal"
                  : "vertical"
              }
              flexItem={true}
            />
          }
        >
          <Stack spacing={2} sx={{ width: { xs: "100%", md: "75%" } }}>
            <Typography
              variant="h6"
              sx={{ color: "#21BBB5", fontWeight: 600 }}
              gutterBottom
            >
              {job.name}
            </Typography>
            <Typography variant="body1" sx={{ overflow: "hidden" }}>
              {job.description}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }} gutterBottom>
              Industry: {job.industry}
            </Typography>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                Skills required:
              </Typography>
              {job.skills.map((skill) => (
                <Chip
                  key={`${job.jobId}`}
                  label={`${job.name}`}
                  size="small"
                  variant="filled"
                  sx={{ mr: 0.5 }}
                />
              ))}
            </Stack>
            <Typography
              variant="body1"
              fontWeight={"bold"}
              sx={{ overflow: "hidden" }}
            >
              Client:{" "}
              <Link
                underline="hover"
                color="#007fed"
                fontWeight={500}
                component={RouterLink}
                to="/users/:id"
              >
                {job.listerName}
              </Link>
            </Typography>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ width: { xs: "100%", md: "25%" } }}
          >
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              Highest Bid: {fCurrency(job.highestBid)}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
              Average Bid: {fCurrency(job.averageBid)}
            </Typography>
            {job.bidCount === 0 ? (
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, mr: 1, fontSize: 15, paddingTop: 5 }}
              >
                No Bids Yet
              </Typography>
            ) : (
              <Typography sx={{ fontSize: 15, paddingTop: 5 }}>
                {" "}
                {job.bidCount} people are bidding on this job{" "}
              </Typography>
            )}
          </Stack>
        </Stack>
        <Divider variant="middle" sx={{ my: 2 }} />
        <Typography variant="h6" fontWeight={"bold"}>
          Interested in this job? Place your bid now and wait for response.
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            my={3}
            sx={{ width: { xs: "100%", md: "75%" } }}
          >
            <FTextField name="bid" label="Your bid" />
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              loading={isSubmitting}
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
            </LoadingButton>
          </Stack>
        </FormProvider>
        <Stack
          direction="column"
          mt={7}
          sx={{ width: { xs: "100%", md: "75%" } }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Questions
          </Typography>
          <CommentSection />
        </Stack>
      </Container>
    </>
  );
}

export default JobDetailPage;
