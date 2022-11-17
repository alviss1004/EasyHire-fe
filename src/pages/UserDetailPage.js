import { faker } from "@faker-js/faker";
import {
  Box,
  Breadcrumbs,
  Chip,
  Container,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

let skillList = [];
Array.from({ length: 3 }).forEach(() => {
  skillList.push(faker.company.bsBuzz());
});
const freelancer = {
  userId: faker.datatype.uuid(),
  aboutMe: faker.lorem.paragraph(),
  name: faker.internet.userName(),
  avatar: faker.image.avatar(),
  company: faker.company.companyName(),
  industry: faker.name.jobArea(),
  skills: skillList,
  reviewCount: faker.datatype.number({ max: 1000 }),
  rating: Math.floor(Math.random() * 10),
};

function UserDetailPage() {
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
          to="/freelancers"
        >
          Users
        </Link>
        <Typography>{freelancer.name}</Typography>
      </Breadcrumbs>
      <Container
        justifyContent="center"
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
          spacing={{ xs: 1, md: 4 }}
          justifyContent="center"
          alignItems={{ xs: "center", md: "stretch" }}
        >
          <Box
            component="img"
            src={freelancer.avatar}
            height={{ xs: "70%", md: "20%" }}
            width={{ xs: "70%", md: "20%" }}
            alt="avatar"
            sx={{
              minWidth: { xs: "70%", md: 220 },
              minHeight: { xs: "70%", md: 220 },
            }}
          />
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

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 1, md: 2 }}
              alignItems={{ xs: "center", md: "start" }}
            >
              <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, md: 0 } }}>
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
              <Box
                sx={{ width: { xs: "100%", md: "80%" }, mt: { xs: 2, md: 0 } }}
              >
                <Box sx={{ display: "flex" }}>
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
        </Stack>
      </Container>
      <Container
        justifyContent="center"
        sx={{
          backgroundColor: "#FFF",
          minWidth: "75vw",
          maxWidth: "75vw",
          boxShadow: 1,
          p: 2,
          mt: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Reviews
        </Typography>
      </Container>
    </>
  );
}

export default UserDetailPage;
