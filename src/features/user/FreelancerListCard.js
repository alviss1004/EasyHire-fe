import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function FreelancerListCard({ freelancer }) {
  const navigate = useNavigate();

  const calculateRating = () => {
    const reviews = freelancer.reviews.map((review) => review.rating);
    const averageRating =
      reviews.reduce((r1, r2) => r1 + r2, 0) / reviews.length;
    return averageRating;
  };

  const userRating = calculateRating();

  return (
    <Card
      variant="outlined"
      sx={{ width: "80%", p: 2 }}
      onClick={() => navigate(`/users/${freelancer._id}`)}
    >
      <CardActionArea>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 4 }}
          justifyContent={{ xs: "center", md: "stretch" }}
          alignItems={{ xs: "center", md: "stretch" }}
        >
          <Box
            component="img"
            src={freelancer.avatarUrl}
            height={{ xs: "60%", md: "20%" }}
            width={{ xs: "60%", md: "20%" }}
            alt="avatar"
            sx={{
              minWidth: { xs: "60%", md: 220 },
              minHeight: { xs: "60%", md: 220 },
              borderRadius: "50%",
            }}
          />
          <CardContent>
            <Stack
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "stretch" }}
              spacing={{ xs: 1, md: 1.5 }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#21BBB5", fontWeight: 600, letterSpacing: 1 }}
                gutterBottom
                fontFamily={"Roboto"}
              >
                {freelancer?.name}
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 10 }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                  fontFamily={"tahoma"}
                >
                  Company: {freelancer?.company ? freelancer.company : "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                  fontFamily={"tahoma"}
                  gutterBottom
                >
                  Job Title:{" "}
                  {freelancer?.jobTitle ? freelancer.jobTitle : "N/A"}
                </Typography>
              </Stack>
              <Typography
                variant="body1"
                sx={{ fontWeight: 600 }}
                fontFamily={"tahoma"}
                gutterBottom
              >
                Industry: {freelancer?.industry ? freelancer.industry : "N/A"}
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 2 }}
                alignItems={{ xs: "center", md: "start" }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: { xs: 2, md: 0 } }}
                >
                  {freelancer && userRating ? (
                    <Typography>{userRating.toFixed(1)}</Typography>
                  ) : (
                    <Typography>No rating</Typography>
                  )}
                  <Rating
                    name="freelancer-rating"
                    value={freelancer ? userRating : 0}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Stack>
                {freelancer?.reviews.length !== 0 ? (
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={"#2B9EBD"}
                    gutterBottom
                  >
                    ({freelancer.reviews.length} reviews)
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

              <Typography variant="body1" sx={{ overflow: "hidden" }}>
                {freelancer?.aboutMe}
              </Typography>
            </Stack>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default FreelancerListCard;
