import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import { fToNow } from "../../utils/formatTime";
import LoadingScreen from "../../components/misc/LoadingScreen";

function JobCard({ job, loading }) {
  const navigate = useNavigate();

  const truncateString = (str, num = 200) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Card
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={() => navigate(`/jobs/${job._id}`)}
        >
          <CardActionArea>
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={{ xs: 2, md: 0 }}
              >
                <Box sx={{ width: { xs: "100%", md: "80%" } }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#2E82D2", fontWeight: 600 }}
                    gutterBottom
                  >
                    {job.title}
                  </Typography>
                  <Typography variant="body1" sx={{ overflow: "hidden" }}>
                    {truncateString(job.description)}
                  </Typography>
                  <Stack
                    my={{ xs: 2, md: 1 }}
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600, mt: 1, mr: 1 }}
                    >
                      Industry:
                    </Typography>
                    <Chip
                      key={`${job.jobId}`}
                      label={`${job.industry}`}
                      size="small"
                      variant="filled"
                      sx={{ mr: 1 }}
                    />
                  </Stack>
                </Box>
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                  sx={{ mr: 3 }}
                >
                  <Typography
                    textAlign={"center"}
                    sx={{ position: "relative", top: -10, fontSize: 15 }}
                  >
                    Posted {fToNow(job.createdAt)}
                  </Typography>

                  {job.bidCount === 0 ? (
                    <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                      No Bids Yet
                    </Typography>
                  ) : (
                    <>
                      <Typography
                        textAlign={"center"}
                        sx={{ fontSize: 16, fontWeight: 600 }}
                      >
                        Highest Bid: {fCurrency(job.highestBid)}
                      </Typography>
                      <Typography
                        textAlign={"center"}
                        sx={{ fontSize: 16, fontWeight: 600 }}
                      >
                        Average Bid: {fCurrency(job.averageBid.toFixed(1))}
                      </Typography>
                      <Typography> {job.bidCount} Bids </Typography>
                    </>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
}

export default JobCard;
