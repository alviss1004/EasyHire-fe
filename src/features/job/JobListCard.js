import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import ConstructionIcon from "@mui/icons-material/Construction";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "../../utils/numberFormat";
import { fToNow } from "../../utils/formatTime";

function JobCard({ job }) {
  const navigate = useNavigate();

  const truncateString = (str, num = 200) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
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
            <Box sx={{ width: { xs: "100%", md: "75%" } }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h6"
                  sx={{ color: "#2E82D2", fontWeight: 600 }}
                  gutterBottom
                >
                  {job.title}
                </Typography>
                <Typography fontSize={"0.85rem"}>
                  Posted {fToNow(job.createdAt)}
                </Typography>
              </Stack>
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
            {job.status === "bidding" ? (
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={1}
                sx={{ mr: 3 }}
              >
                {job.bidCount === 0 ? (
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, mr: { md: 3 } }}
                  >
                    No Bids Yet
                  </Typography>
                ) : (
                  <>
                    <Typography
                      textAlign={"center"}
                      color="#EE1B1B"
                      sx={{ fontSize: 16, fontWeight: 600 }}
                    >
                      Highest Bid: {fCurrency(job.highestBid)}
                    </Typography>
                    <Typography
                      textAlign={"center"}
                      sx={{ fontSize: 16, fontWeight: 600 }}
                    >
                      Average Bid: {fCurrency(job.averageBid)}
                    </Typography>
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
                <ConstructionIcon />
                <Typography fontWeight={600} fontSize={17}>
                  Job in progress
                </Typography>
              </Stack>
            ) : null}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default JobCard;
