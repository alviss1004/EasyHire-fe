import {
  Avatar,
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
          <Avatar
            src={freelancer.avatarUrl}
            alt={freelancer.name}
            sx={{
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "common.white",
              width: { xs: 125, sm: 170, md: 220 },
              height: { xs: 125, sm: 170, md: 220 },
            }}
          />
          <CardContent>
            <Stack
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "stretch" }}
              spacing={{ xs: 1, md: 1.5 }}
            >
              <Typography
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  color: "#21BBB5",
                  fontWeight: 600,
                  letterSpacing: 1,
                  fontSize: { xs: 20, sm: 25 },
                }}
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
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    fontWeight: 600,
                    fontSize: { xs: 14, md: 16 },
                  }}
                  gutterBottom
                  fontFamily={"tahoma"}
                >
                  Company: {freelancer?.company ? freelancer.company : "N/A"}
                </Typography>
                <Typography
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    fontWeight: 600,
                    fontSize: { xs: 14, md: 16 },
                  }}
                  fontFamily={"tahoma"}
                  gutterBottom
                >
                  Job Title:{" "}
                  {freelancer?.jobTitle ? freelancer.jobTitle : "N/A"}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  textAlign: { xs: "center", md: "left" },
                  fontWeight: 600,
                  fontSize: { xs: 14, md: 16 },
                }}
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
                  {freelancer && freelancer.rating ? (
                    <Typography>{freelancer.rating.toFixed(1)}</Typography>
                  ) : (
                    <Typography>No rating</Typography>
                  )}
                  <Rating
                    name="freelancer-rating"
                    value={freelancer ? freelancer.rating : 0}
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
                {truncateString(freelancer?.aboutMe)}
              </Typography>
            </Stack>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default FreelancerListCard;
