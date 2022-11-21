import { Box, Container, Link, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { styled } from "@mui/system";

function UserDetailInfo({ user }) {
  const IconStyle = styled(Box)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
  }));

  return (
    <Container
      justifyContent="center"
      sx={{
        backgroundColor: "#FFF",
        boxShadow: 1,
        p: 4,
      }}
    >
      <Helmet>
        <style>{"body { background-color: #F0F3F5; }"}</style>
      </Helmet>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 4 }}
        justifyContent={{ xs: "center", md: "flex-start" }}
        alignItems={{ xs: "center", md: "stretch" }}
      >
        {user?.avatarUrl ? (
          <>
            <Stack
              spacing={{ xs: 1, md: 2 }}
              alignItems="center"
              sx={{
                width: { xs: "60%", sm: "40%", md: "25%" },
              }}
            >
              <Box
                component="img"
                src={user.avatarUrl}
                height={{ xs: "20%", md: "20%" }}
                width={{ xs: "100%", md: "20%" }}
                alt="avatar"
                sx={{
                  minWidth: { xs: "60%", md: 220 },
                  minHeight: { xs: "20%", md: 220 },
                  borderRadius: "50%",
                }}
              />

              <Stack direction="row" spacing={3} sx={{ p: 1, mb: 1 }}>
                <Link
                  href={`https://${user?.linkedinLink}`}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  <IconStyle color="#006097">
                    <LinkedInIcon fontSize="large" />
                  </IconStyle>
                </Link>
                <Link
                  href={`https://${user?.twitterLink}`}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  <IconStyle color="#1877F2">
                    <TwitterIcon fontSize="large" />
                  </IconStyle>
                </Link>
                <Link
                  href={`https://${user?.facebookLink}`}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  <IconStyle color="#1C9CEA">
                    <FacebookIcon fontSize="large" />
                  </IconStyle>
                </Link>
                <Link
                  href={`https://${user?.instagramLink}`}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  <IconStyle color="#D7336D">
                    <InstagramIcon fontSize="large" />
                  </IconStyle>
                </Link>
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack
            spacing={{ xs: 2, md: 0 }}
            alignItems="center"
            sx={{
              width: { xs: "50%", md: "25%" },
            }}
          >
            <Box
              component="img"
              src=""
              height={{ xs: "70%", md: "20%" }}
              width={{ xs: "70%", md: "20%" }}
              sx={{
                minWidth: { xs: "70%", md: 220 },
                minHeight: { xs: "70%", md: 220 },
              }}
            ></Box>
            <Stack direction="row" sx={{ p: 1, mb: 1 }}>
              <Link
                href={`https://${user?.linkedinLink}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <IconStyle color="#006097">
                  <LinkedInIcon fontSize="large" />
                </IconStyle>
              </Link>
              <Link
                href={`https://${user?.twitterLink}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <IconStyle color="#1877F2">
                  <TwitterIcon fontSize="large" />
                </IconStyle>
              </Link>
              <Link
                href={`https://${user?.facebookLink}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <IconStyle color="#1C9CEA">
                  <FacebookIcon fontSize="large" />
                </IconStyle>
              </Link>
              <Link
                href={`https://${user?.instagramLink}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <IconStyle color="#D7336D">
                  <InstagramIcon fontSize="large" />
                </IconStyle>
              </Link>
            </Stack>
          </Stack>
        )}
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
            {user?.name}
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
              Company: {user?.company ? user.company : "N/A"}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600 }}
              fontFamily={"tahoma"}
              gutterBottom
            >
              Job Title: {user?.jobTitle ? user.jobTitle : "N/A"}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600 }}
            fontFamily={"tahoma"}
            gutterBottom
          >
            Industry: {user?.industry ? user.industry : "N/A"}
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1, md: 2 }}
            alignItems={{ xs: "center", md: "start" }}
          >
            <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, md: 0 } }}>
              {user?.rating ? (
                <Typography>{user.rating.toFixed(1)}</Typography>
              ) : (
                <Typography>No rating</Typography>
              )}
              <Rating
                name="user-rating"
                value={user ? user.rating : 0}
                precision={0.5}
                size="small"
                readOnly
              />
            </Stack>
            {user?.reviews?.length !== 0 ? (
              <Typography
                variant="body1"
                fontWeight={600}
                color={"#2B9EBD"}
                gutterBottom
              >
                ({user.reviews.length} reviews)
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
            {user?.aboutMe}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default UserDetailInfo;
