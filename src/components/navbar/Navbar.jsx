import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logoImage from "../../assets/dark-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  Menu,
  MenuItem,
  ListItemText,
  Badge,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import axiosAuth from "../../api/axiosAuthInstance";

const pages = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/about-us" },
  { name: "Contact Us", path: "/contact-us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ["userLogin"],
    queryFn: () => {
      const token = localStorage.getItem("userToken");
      const email = localStorage.getItem("userEmail");
      return token && email ? { token, email } : null;
    },
    initialData: () => {
      const token = localStorage.getItem("userToken");
      const email = localStorage.getItem("userEmail");
      return token && email ? { token, email } : null;
    },
  });

  const isLoggedIn = !!userData?.token;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    handleMenuClose();
    queryClient.removeQueries({ queryKey: ["userLogin"] });

    navigate("/");
  };

  const fetchCartItem = async () => {
    const res = await axiosAuth.get(`/Carts`);
    return res.data.cartResponse;
  };

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItem,
    staleTime: 0,
  });

  return (
    <AppBar
      className="navbar"
      sx={{ boxShadow: "0 2px 12px #4fc4ca" }}
      position="relative"
      elevation={2}
    >
      <Container>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link to="/">
            <Box component="img" src={logoImage} alt="Login" />
          </Link>

          {/* Desktop Nav - hidden on sm & md */}
          <Box
            sx={{
              flex: 4,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 3,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.path}
                component={Link}
                to={page.path}
                color="inherit"
                className="nav-link"
                sx={{
                  fontWeight: 500,
                  minWidth: "max-content",
                  textTransform: "capitalize",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Desktop Buttons */}
          {!isLoggedIn ? (
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                className="btn light-btn"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#fff",
                  border: "none",
                }}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                variant="contained"
                className="btn dark-btn"
                sx={{
                  textTransform: "capitalize",
                  color: "#fff",
                  border: "none",
                }}
              >
                <Link to="/register">Create Account</Link>
              </Button>
            </Box>
          ) : (
            <>
              {/* Profile dropdown */}
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  mx: 1,
                  color: "#312d5f",
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <PersonOutlineIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem sx={{ fontWeight: 600 }}>
                  <AccountCircleIcon sx={{ color: "#4fc4ca" }} />{" "}
                  {userData.email}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleMenuClose();
                  }}
                >
                  <PersonOutlineIcon sx={{ color: "#4fc4ca" }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  {" "}
                  <LogoutIcon sx={{ color: "#4fc4ca" }} /> Logout
                </MenuItem>
              </Menu>
              {/* Favorite icon */}
              <IconButton
                component={Link}
                to="/favorites"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  mx: 1,
                  color: "#312d5f",
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>

              {/* Cart icon */}
              <Badge
                badgeContent={cartItems.length}
                color="error"
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    mx: 1,
                    color: "#312d5f",
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </>
          )}

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none", color: "#000" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "100%",
            padding: 5,
            background:
              "linear-gradient(to bottom, #fff, rgba(11, 232, 244, 0.5), #fff)",
            backdropFilter: "blur(20px)",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Link to="/">
            <Box component="img" src={logoImage} alt="Login" />
          </Link>

          <IconButton
            onClick={handleDrawerToggle}
            sx={{ borderRadius: "6px" }}
            className="close-btn"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index} component={Link} to={page.path}>
              <ListItemText primary={page.name} />
            </ListItemButton>
          ))}

          {!isLoggedIn ? (
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                variant="outlined"
                className="btn light-btn"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#fff",
                  border: "none",
                }}
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                variant="contained"
                className="btn dark-btn"
                sx={{
                  textTransform: "capitalize",
                  color: "#fff",
                  border: "none",
                }}
              >
                <Link to="/register">Create Account</Link>
              </Button>
            </Box>
          ) : (
            <>
              {/* Profile dropdown */}
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  mx: 1,
                  color: "#312d5f",
                  display: {
                    xs: "inline",
                    md: "none",
                  },
                }}
              >
                <PersonOutlineIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem sx={{ fontWeight: 600 }}>
                  <AccountCircleIcon sx={{ color: "#4fc4ca" }} />{" "}
                  {userData.email}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                    handleMenuClose();
                    handleDrawerToggle();
                  }}
                >
                  <PersonOutlineIcon sx={{ color: "#4fc4ca" }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  {" "}
                  <LogoutIcon sx={{ color: "#4fc4ca" }} /> Logout
                </MenuItem>
              </Menu>
              {/* Favorite icon */}
              <IconButton
                component={Link}
                to="/favorites"
                onClick={handleDrawerToggle}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 1,
                  mx: 1,
                  color: "#312d5f",
                  display: {
                    xs: "inline",
                    md: "none",
                  },
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>

              {/* Cart icon */}
              <Badge
                badgeContent={cartItems.length}
                color="error"
                sx={{
                  display: {
                    xs: "inline",
                    md: "none",
                  },
                }}
              >
                <IconButton
                  component={Link}
                  to="/cart"
                  onClick={() => {
                    navigate("/cart");
                    handleDrawerToggle();
                  }}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    mx: 1,
                    color: "#312d5f",
                  }}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
}
