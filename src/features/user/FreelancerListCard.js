import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function FreelancerListCard({ freelancer }) {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{ width: "80%", p: 2 }}
      onClick={() => navigate("/users/:id")}
    >
      <CardActionArea>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 4 }}
          justifyContent="center"
          alignItems={{ xs: "center", md: "stretch" }}
        >
          <Box
            component="img"
            src={freelancer.avatar}
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
              spacing={{ xs: 0, md: 1.5 }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#21BBB5", fontWeight: 600, letterSpacing: 1 }}
                gutterBottom
                fontFamily={"Roboto"}
              >
                {freelancer.name}
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ md: 10 }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                  gutterBottom
                  fontFamily={"tahoma"}
                >
                  Company: {freelancer.company}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600 }}
                  fontFamily={"tahoma"}
                  gutterBottom
                >
                  Industry: {freelancer.industry}
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "center", md: "stretch" }}
                spacing={{ md: 2 }}
              >
                <Stack direction="row" spacing={1} mt={{ xs: 1, md: 0 }}>
                  <Typography>{freelancer.rating.toFixed(1)}</Typography>
                  <Rating
                    name="freelancer-rating"
                    value={freelancer.rating / 2}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </Stack>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color={"#2B9EBD"}
                  gutterBottom
                >
                  ({freelancer.reviewCount} reviews)
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ width: { xs: "100%", md: "80%" } }}>
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Typography variant="body1" sx={{ overflow: "hidden" }}>
                      {freelancer.aboutMe}
                    </Typography>
                  </Box>
                  <Stack
                    my={{ xs: 2, md: 1 }}
                    flexDirection="row"
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Typography variant="body1" sx={{ fontWeight: 600, mr: 1 }}>
                      Skills:
                    </Typography>
                    {freelancer.skills.map((skill) => (
                      <Chip
                        key={`${freelancer.userId}`}
                        label={skill}
                        variant="filled"
                        sx={{ mr: 0.5, overflow: "hidden", fontSize: 15 }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default FreelancerListCard;
