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
      sx={{ width: "80%" }}
      onClick={() => navigate("/freelancers/:id")}
    >
      <CardActionArea>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{ pl: { xs: 2, md: 4 } }}
          spacing={{ xs: 1, md: 4 }}
        >
          <Box
            component="img"
            src={freelancer.avatar}
            height={{ xs: "250px", md: "150px" }}
            width={{ xs: "250px", md: "150px" }}
            marginTop={3}
            alt="avatar"
          />
          <CardContent>
            <Stack spacing={{ xs: 0, md: 1.5 }}>
              <Typography
                variant="h5"
                sx={{ color: "#2E82D2", fontWeight: 600, letterSpacing: 1 }}
                gutterBottom
                fontFamily={"Roboto"}
              >
                {freelancer.name}
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

              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <Stack direction="row" spacing={1}>
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
                  {freelancer.reviewCount} reviews
                </Typography>
              </Stack>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Box sx={{ width: { xs: "100%", md: "80%" } }}>
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Typography sx={{ fontSize: 18, overflow: "hidden" }}>
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
