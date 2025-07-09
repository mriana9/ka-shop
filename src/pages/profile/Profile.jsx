import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  ShoppingCart,
  Logout,
  LockOutlineSharp,
} from "@mui/icons-material";
import MyProfile from "../../components/profile/MyProfile";

const menuItems = [
  { text: "My Profile", icon: <AccountCircle /> },
  { text: "My Orders", icon: <ShoppingCart /> },
  { text: "Change Password", icon: <LockOutlineSharp /> },
  { text: "Log out", icon: <Logout /> },
];

export default function Profile() {
  const contentMap = {
    "My Profile": <MyProfile />,
    "My Orders": (
      <Typography variant="h6">This is your orders content.</Typography>
    ),
    Addresses: (
      <Typography variant="h6">Your saved addresses appear here.</Typography>
    ),
    Cards: <Typography variant="h6">Your payment methods go here.</Typography>,
    Notifications: <Typography variant="h6">Notification settings.</Typography>,
    "Log out": <Typography variant="h6">Logging out...</Typography>,
  };
  const [selectedTab, setSelectedTab] = useState("My Profile");

  return (
    <Box sx={{ display: "flex", my: 3, gap: 3 }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper ": {
            width: "max-content",
            position: "static",
            border: 0,
            mx: 3,
            boxSizing: "border-box",
            backgroundColor: "#F2F2F2",
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Ahmed Mohamed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cairo, Egypt
          </Typography>
        </Box>
        <Divider />

        <List>
          {menuItems.map(({ text, icon }) => (
            <ListItemButton
              key={text}
              selected={selectedTab === text}
              onClick={() => setSelectedTab(text)}
              sx={{
                borderRadius: 2,
                my: 0.5,
                backgroundColor:
                  selectedTab === text ? "#d0f0f4" : "transparent",
                color: selectedTab === text ? "#00acc1" : "inherit",
                "&:hover": {
                  backgroundColor: "#e0f7fa",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: selectedTab === text ? "#00acc1" : "inherit" }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {contentMap[selectedTab]}
      </Box>
    </Box>
  );
}
