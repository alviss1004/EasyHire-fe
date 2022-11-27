import { Breadcrumbs, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import UserDetailInfo from "../features/user/UserDetailInfo";
import { getUserById } from "../features/user/userSlice";
import LoadingScreen from "../components/misc/LoadingScreen";

function UserDetailPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;
  const { selectedUser, isLoading } = useSelector(
    (state) => state.user,
    shallowEqual
  );

  useEffect(() => {
    dispatch(getUserById(userId));
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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {selectedUser && (
            <UserDetailInfo user={selectedUser} loading={isLoading} />
          )}
        </>
      )}
    </>
  );
}

export default UserDetailPage;
