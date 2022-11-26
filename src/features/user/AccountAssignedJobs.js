import { Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/misc/LoadingScreen";
import { fToNow } from "../../utils/formatTime";
import { fCurrency } from "../../utils/numberFormat";
import { getUserAssignedJobs } from "./userSlice";

function AccountAssignedJobs() {
  const dispatch = useDispatch();
  const { userAssignedJobs, isLoading } = useSelector((state) => state.user);

  const truncateString = (str, num = 200) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  useEffect(() => {
    dispatch(getUserAssignedJobs());
  }, [dispatch]);

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
        userAssignedJobs && (
          <Stack spacing={2} justifyContent="center">
            {userAssignedJobs.map((job) => (
              <Card variant="outlined">
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
                    <Typography
                      fontFamily={"Roboto"}
                      fontSize={"1.15rem"}
                      fontWeight={600}
                    >
                      Assigned for {fCurrency(job.bids[0].price)}
                    </Typography>
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
