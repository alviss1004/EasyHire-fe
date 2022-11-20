import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import UserDetailInfo from "../features/user/UserDetailInfo";
import { getUserById } from "../features/user/userSlice";

function UserDetailPage() {
  const params = useParams();
  const userId = params.id;
  const { selectedUser, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log("USER", selectedUser);
  console.log("USERID", userId);
  useEffect(() => {
    if (userId) dispatch(getUserById(userId));
  }, [dispatch, userId]);

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
        <Typography>{selectedUser?.name}</Typography>
      </Breadcrumbs>
      <UserDetailInfo user={selectedUser} />
      {selectedUser?.reviews.length !== 0 ? (
        <Container
          justifyContent="center"
          sx={{
            backgroundColor: "#FFF",
            boxShadow: 1,
            p: 2,
            mt: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Reviews
          </Typography>
        </Container>
      ) : null}
    </>
  );
}

export default UserDetailPage;
