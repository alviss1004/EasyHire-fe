import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Stack, Link, Divider, Avatar } from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "../components/misc/Logo";

function MainHeader() {
  const { user, logout } = useAuth();
  let navigate = useNavigate();
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;

      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#161A19" }}>
        <Toolbar variant="dense">
          <IconButton
            onClick={() => navigate("/")}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Stack
            spacing={{ xs: 1, sm: 3, md: 4, lg: 5 }}
            direction={{ xs: "column", sm: "row" }}
            my={1}
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              ml: 2,
            }}
          >
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  textDecoration: "underline",
                  filter: "brightness(100%)",
                },
              }}
              color="inherit"
              component={RouterLink}
              to="/"
            >
              Home
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  textDecoration: "underline",
                  filter: "brightness(100%)",
                },
              }}
              color="inherit"
              component={RouterLink}
              // to="/tvshows/1"
            >
              Browse Jobs
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  textDecoration: "underline",
                  filter: "brightness(100%)",
                },
              }}
              color="inherit"
              component={RouterLink}
              // to="/movies/1"
            >
              Our Freelancers
            </Link>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Stack
              spacing={{ xs: 1, md: 3, lg: 5 }}
              direction={{ xs: "column", md: "row", lg: "row" }}
              my={1}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                onClick={handleProfileMenuOpen}
              />
            </Stack>
          ) : (
            <Stack
              spacing={{ xs: 3, md: 4, lg: 5 }}
              direction={"row"}
              my={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                sx={{
                  textDecoration: "none",
                  fontFamily: "Verdana",
                  ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                  ":active": {
                    textDecoration: "underline",
                    filter: "brightness(100%)",
                  },
                }}
                color="inherit"
                component={RouterLink}
                to="/login"
              >
                Log In
              </Link>
              <Link
                sx={{
                  textDecoration: "none",
                  fontFamily: "Verdana",
                  ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                  ":active": {
                    textDecoration: "underline",
                    filter: "brightness(100%)",
                  },
                }}
                color="inherit"
                component={RouterLink}
                to="/register"
              >
                Sign Up
              </Link>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
