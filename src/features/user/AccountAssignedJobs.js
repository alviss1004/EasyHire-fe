import {
  Card,
  CardContent,
  Chip,
  Link,
  Typography,
  Rating,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import LoadingScreen from "../../components/misc/LoadingScreen";
import { fToNow } from "../../utils/formatTime";
import { fCurrency } from "../../utils/numberFormat";

function AccountAssignedJobs({ jobs, loading }) {
  const truncateString = (str, num = 200) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <Container
      sx={{
        width: "100%",
      }}
    >
      {loading ? (
        <LoadingScreen />
      ) : (
        jobs && (
          <Stack spacing={{ xs: 4, md: 2 }} justifyContent="center">
            {jobs.map((job) => (
              <Card key={job._id} variant="outlined">
                <CardContent>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={{ xs: 3, sm: 0 }}
                  >
                    <Stack
                      spacing={2}
                      sx={{ width: { xs: "100%", md: "75%" } }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Link
                          component={RouterLink}
                          to={`/jobs/${job._id}`}
                          sx={{
                            textDecoration: "none",
                            fontSize: 20,
                            color: "#21BBB5",
                            fontWeight: 600,
                          }}
                          gutterBottom
                        >
                          {job?.title}
                        </Link>
                        <Typography fontSize={"0.85rem"}>
                          Posted {fToNow(job.createdAt)}
                        </Typography>
                      </Stack>
                      <Typography variant="body1" sx={{ overflow: "hidden" }}>
                        {truncateString(job.description)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 600 }}
                        gutterBottom
                      >
                        Industry:{" "}
                        <Chip
                          label={`${job.industry}`}
                          size="small"
                          variant="filled"
                          sx={{ mr: 1 }}
                        />
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
                    {job.status === "ongoing" ? (
                      <Stack alignItems="center">
                        <Typography
                          fontFamily={"Roboto"}
                          fontSize={"1.15rem"}
                          fontWeight={600}
                        >
                          Winning bid
                        </Typography>
                        <Typography
                          fontFamily={"Roboto"}
                          fontSize={"1.15rem"}
                          fontWeight={600}
                        >
                          {fCurrency(job.bids[0].price)}
                        </Typography>
                      </Stack>
                    ) : (
                      <Stack alignItems="center" spacing={1}>
                        {job?.review ? (
                          <>
                            <Typography variant="h5">
                              {job.review.rating}/5
                            </Typography>{" "}
                            <Rating
                              name="job-rating"
                              value={job.review.rating}
                              precision={0.5}
                              readOnly
                            />{" "}
                          </>
                        ) : (
                          <Typography
                            textAlign="center"
                            sx={{ fontSize: 16, mr: { xs: 0, md: 3 } }}
                          >
                            No review
                          </Typography>
                        )}
                      </Stack>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )
      )}
    </Container>
  );
}

export default AccountAssignedJobs;
