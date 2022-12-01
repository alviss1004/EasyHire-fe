import {
  Avatar,
  Box,
  Container,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { styled } from "@mui/system";
import ReviewList from "../review/ReviewList";

function UserDetailInfo({ user, loading }) {
  const IconStyle = styled(Box)(({ theme }) => ({
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
  }));

  const convertUrl = (url) => {
    if (url.includes("http")) {
      return url;
    } else {
      const newUrl = `https://${url}`;
      return newUrl;
    }
  };

  return (
    <>
      <Container
        sx={{
          backgroundColor: "#FFF",
          boxShadow: 1,
          p: 4,
        }}
      >
        <Helmet>
          <style>{"body { background-color: #F0F3F5; }"}</style>
        </Helmet>
        {user && (
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 4 }}
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems={{ xs: "center", md: "stretch" }}
          >
            <Stack
              spacing={{ xs: 1, md: 2 }}
              alignItems="center"
              sx={{
                width: { xs: "60%", sm: "40%", md: "25%" },
              }}
            >
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                sx={{
                  mx: "auto",
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: "common.white",
                  width: { xs: 125, sm: 170, md: 220 },
                  height: { xs: 125, sm: 170, md: 220 },
                }}
              />
              <Stack direction="row" spacing={3.5} sx={{ p: 1, mb: 1 }}>
                {user.linkedinLink ? (
                  <Link
                    href={convertUrl(user.linkedinLink)}
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                  >
                    <IconStyle color="#006097">
                      <LinkedInIcon fontSize="large" />
                    </IconStyle>
                  </Link>
                ) : (
                  <IconStyle color="#006097">
                    <LinkedInIcon fontSize="large" />
                  </IconStyle>
                )}
                {user.twitterLink ? (
                  <Link
                    href={convertUrl(user.twitterLink)}
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                  >
                    <IconStyle color="#1877F2">
                      <TwitterIcon fontSize="large" />
                    </IconStyle>
                  </Link>
                ) : (
                  <IconStyle color="#1877F2">
                    <TwitterIcon fontSize="large" />
                  </IconStyle>
                )}
                {user.facebookLink ? (
                  <Link
                    href={convertUrl(user.facebookLink)}
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                  >
                    <IconStyle color="#1C9CEA">
                      <FacebookIcon fontSize="large" />
                    </IconStyle>
                  </Link>
                ) : (
                  <IconStyle color="#1C9CEA">
                    <FacebookIcon fontSize="large" />
                  </IconStyle>
                )}
                {user.instagramLink ? (
                  <Link
                    href={convertUrl(user.instagramLink)}
                    target="_blank"
                    sx={{ textDecoration: "none" }}
                  >
                    <IconStyle color="#D7336D">
                      <InstagramIcon fontSize="large" />
                    </IconStyle>
                  </Link>
                ) : (
                  <IconStyle color="#D7336D">
                    <InstagramIcon fontSize="large" />
                  </IconStyle>
                )}
              </Stack>
            </Stack>

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
                alignItems="center"
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
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: { xs: 2, md: 0 } }}
                >
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
        )}
      </Container>
      {user?.reviews.length !== 0 ? (
        <Container
          justifyContent="center"
          sx={{
            backgroundColor: "#FFF",
            boxShadow: 1,
            p: 2,
            mt: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Reviews
          </Typography>
          {user && <ReviewList reviews={user.reviews} loading={loading} />}
        </Container>
      ) : null}
    </>
  );
}

export default UserDetailInfo;
