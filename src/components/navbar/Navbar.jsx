import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logoImage from "../../assets/dark-logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const pages = ["Home", "Categories", "Products", "About Us", "Contact Us"];
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <AppBar
      className="navbar"
      sx={{ boxShadow: "none" }}
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
                key={page}
                color="inherit"
                className="nav-link"
                sx={{
                  fontWeight: 500,
                  minWidth: "max-content",
                  textTransform: "capitalize",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              variant="outlined"
              className="btn light-btn"
              sx={{
                textTransform: "capitalize",
                backgroundColor: "#fff",
                border: "none",
                margin: "0px 10px",
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
                margin: "0px 10px",
              }}
            >
              <Link to="/register">Create Account</Link>
            </Button>
          </Box>

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
          "& .MuiDrawer-paper": { width: "100%", padding: 5 },
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
          {pages.map((page) => (
            <ListItem button key={page}>
              <ListItemText primary={page} />
            </ListItem>
          ))}

          <Box sx={{ display: "flex", justifyContent:"flex-start", gap:"10px" }}>
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
        </List>
      </Drawer>
    </AppBar>
  );
}
