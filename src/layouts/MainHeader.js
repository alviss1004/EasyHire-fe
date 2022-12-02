import * as React from "react";
import { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Stack, Link, Divider, Avatar, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "../components/misc/Logo";
import { useDispatch } from "react-redux";
import { becomeFreelancer } from "../features/user/userSlice";
import { useTheme } from "@emotion/react";
import { ColorModeContext } from "../theme/index";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function MainHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  let navigate = useNavigate();
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

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

  const styleVisible = {
    top: 0,
    position: "fixed",
    transition: "top 0.3s ease-out",
    backgroundColor: "#161A19",
  };

  const styleNonVisible = {
    top: "-80px",
    position: "fixed",
    transition: "top 0.3s ease-out",
    backgroundColor: "#161A19",
  };

  const style = visible ? styleVisible : styleNonVisible;

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
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleBecomeFreelancer = async () => {
    handleMenuClose();
    await dispatch(becomeFreelancer({ userId: user._id, isFreelancer: true }));
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
        {user?.isFreelancer && (
          <Typography variant="subtitle2" sx={{ color: "primary.main" }} noWrap>
            Freelancer
          </Typography>
        )}

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to={`/me/profile`}
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
      {!user?.isFreelancer ? (
        <MenuItem
          onClick={handleBecomeFreelancer}
          component={RouterLink}
          sx={{
            color: "#FFF",
            backgroundColor: "#31B9B3",
            ":hover": {
              backgroundColor: "#36B49F",
            },
          }}
        >
          Become a Freelancer
        </MenuItem>
      ) : (
        <MenuItem
          onClick={handleMenuClose}
          to="/me/freelancerProfile"
          component={RouterLink}
          sx={{
            color: "#FFF",
            backgroundColor: "#31B9B3",
            ":hover": {
              backgroundColor: "#36B49F",
            },
          }}
        >
          Freelancer Section
        </MenuItem>
      )}
      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar sx={style}>
        <Toolbar variant="dense">
          <IconButton
            onClick={() => navigate("/")}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: { xs: 1, sm: 2 },
              display: { xs: "none", sm: "initial" },
            }}
          >
            <Logo />
          </IconButton>
          <Stack
            spacing={{ xs: 2, sm: 2, md: 4, lg: 5 }}
            direction="row"
            my={1}
            sx={{
              fontSize: { xs: 12, sm: 14 },
              justifyContent: "center",
              alignItems: "center",
              ml: { xs: 0, sm: 2 },
            }}
          >
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  filter: "brightness(150%)",
                },
                fontSize: { xs: 14, sm: 16 },
                textAlign: "center",
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
                  filter: "brightness(150%)",
                },
                fontSize: { xs: 14, sm: 16 },
                textAlign: "center",
              }}
              color="inherit"
              component={RouterLink}
              to="/jobs"
            >
              Browse Jobs
            </Link>
            <Link
              sx={{
                textDecoration: "none",
                fontFamily: "Verdana",
                ":hover": { filter: "brightness(50%)", transition: "0.2s" },
                ":active": {
                  filter: "brightness(150%)",
                },
                fontSize: { xs: 14, sm: 16 },
                textAlign: "center",
              }}
              color="inherit"
              component={RouterLink}
              to="/freelancers"
            >
              Our Freelancers
            </Link>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          {isAuthenticated ? (
            <Stack
              spacing={{ xs: 1.5, sm: 1, md: 3 }}
              direction="row"
              my={1}
              sx={{
                mr: { md: 2 },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={() => navigate("/jobs/post")}
                sx={{
                  backgroundColor: "primary",
                  ":hover": {
                    filter: "brightness(120%)",
                  },
                  width: { xs: "40%", sm: "100%" },
                  fontSize: { xs: 11, md: 14 },
                }}
              >
                Post a Job
              </Button>
              <Box>
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  onClick={handleProfileMenuOpen}
                  sx={{ ":hover": { cursor: "pointer" } }}
                />
              </Box>
              {renderMenu}
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => {
                  colorMode.toggleColorMode();
                }}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Stack>
          ) : (
            <Stack
              spacing={{ xs: 1, md: 4, lg: 5 }}
              direction={{ xs: "column", md: "row" }}
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
                    filter: "brightness(150%)",
                  },
                  fontSize: { xs: 14, md: 16 },
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
                    filter: "brightness(150%)",
                  },
                  fontSize: { xs: 14, md: 16 },
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
