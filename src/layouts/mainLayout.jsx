import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

// icons
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BusinessIcon from "@mui/icons-material/Business";
import LogoutIcon from "@mui/icons-material/Logout";

import { Avatar } from "@mui/material";

import { NavLink, Navigate, Outlet, redirect } from "react-router-dom";
import {
  checkAuthenticated,
  loadUser,
  login_failed,
} from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// react router dom
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    // sx: { backgroundColor: "white" }
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "unset",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispach = useDispatch();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const imgUrl = localStorage.getItem("img"); // logo

  // Handle Authentication
  useEffect(() => {
    dispach(checkAuthenticated());
    dispach(loadUser());
  }, []);

  // Loading Page
  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuthenticated);

  if (isAuth === "NA") {
    return (
      <div className=" w-[100%] h-[700px] flex  justify-center  items-center ">
        <img
          className="  w-[50%] m-auto  p-20 shadow-sm shadow-blue-100"
          src={imgUrl}
        />
      </div>
    );
  } else {
    // must be "/auth/login" not "auth/login"
    return !isAuth === true ? (
      <Navigate to="/auth/company" />
    ) : (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* costumize appbar color */}
        <AppBar
          sx={{ background: "white", boxShadow: "initial" }}
          position="fixed"
          open={open}
        >
          <Toolbar className="flex justify-between">
            <div className="flex">
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              {!open && (
                <img
                  onClick={() => {
                    navigate("/");
                  }}
                  className=" w-36 h-12 object-center cursor-pointer"
                  src={imgUrl}
                />
              )}
            </div>

            {/* User And Avatar */}

            <div className="flex  flex-col justify-center items-center p-2 cursor-pointer">
              <Avatar />
              <Typography className="text-black font-bold text-center">
                {user?.name}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" anchor="left" open={open}>
          <DrawerHeader>
            {/* Here the arrow for opening and closing */}
            <div className="flex justify-between">
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>

              <img className="flex-1 w-[40%] m-2" src={imgUrl} />
            </div>
          </DrawerHeader>

          <div className="flex-1 py-4 shadow-gray-600 box-border">
            <List>
              {/* {[{ name: "Analytics", link: "/" }, { name: "All Companies", link: "/tables" }].map((item, index) => ( */}

              {/* Icon 1 analytics  */}

              <ListItem
                key={"Analytics"}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <NavLink to={"/"}>
                      {({ isActive, isPending }) => (
                        <AnalyticsIcon
                          color={isActive ? "primary" : "action"}
                        />
                      )}
                    </NavLink>
                  </ListItemIcon>

                  <ListItemText
                    primary={"Analytics"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem
                key={"All Companies"}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <NavLink to={"/tables"}>
                      {({ isActive, isPending }) => (
                        <BusinessIcon color={isActive ? "primary" : "action"} />
                      )}
                    </NavLink>
                  </ListItemIcon>
                  <ListItemText
                    primary={"All Companies"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
            <List>
              {["logout"].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                <NavLink key={text} to={text}>
                      {({ isActive, isPending }) => (
                        <LogoutIcon color={isActive ? "primary" : "action"} />
                      )}
                    </NavLink>
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
              ))}
            </List>
            {/* <div onClick={()=> dispach(login_failed())}> logout</div> */}
          </div>
        </Drawer>

        <Box sx={{ padding: 3, width: 1300 }} component="main">
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    );
  }
}
