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
import { fToNow } from "../../utils/formatTime";
import { fCurrency } from "../../utils/numberFormat";

function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{ width: "70%" }}
      onClick={() => navigate(`/jobs/${job._id}`)}
    >
      <CardActionArea>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box sx={{ width: { xs: "100%", md: "80%" } }}>
              <Typography
                variant="h6"
                sx={{ color: "#2E82D2", fontWeight: 600 }}
                gutterBottom
              >
                {job.title}
              </Typography>
              <Typography sx={{ fontSize: 18, overflow: "hidden" }}>
                {job.description}
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
              <Box sx={{ position: "relative", top: { xs: 5, md: 0 } }}>
                <Typography
                  textAlign={"center"}
                  sx={{ position: "relative", top: -15, fontSize: 15 }}
                >
                  Posted {fToNow(job.createdAt)}
                </Typography>
              </Box>
              {job.bidCount === 0 ? (
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  No Bids Yet
                </Typography>
              ) : (
                <>
                  <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                    Highest Bid: {fCurrency(job.highestBid)}
                  </Typography>
                  <Typography> {job.bidCount} Bids </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default JobCard;
