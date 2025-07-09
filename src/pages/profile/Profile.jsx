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
import MyOrders from "../../components/profile/MyOrders";
import { useQuery } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";

const menuItems = [
  { text: "My Profile", icon: <AccountCircle /> },
  { text: "My Orders", icon: <ShoppingCart /> },
  { text: "Change Password", icon: <LockOutlineSharp /> },
  { text: "Log out", icon: <Logout /> },
];

export default function Profile() {
  const fetchUserData = async () => {
    const res = await axiosAuth.get("/Account/userinfo");
    return res.data;
  };

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    staleTime: 0,
  });
  const contentMap = {
    "My Profile": <MyProfile userData={userData} />,
    "My Orders": <MyOrders />,
    Addresses: (
      <Typography variant="h6">Your saved addresses appear here.</Typography>
    ),
    Cards: <Typography variant="h6">Your payment methods go here.</Typography>,
    Notifications: <Typography variant="h6">Notification settings.</Typography>,
    "Log out": <Typography variant="h6">Logging out...</Typography>,
  };
  const [selectedTab, setSelectedTab] = useState("My Profile");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        my: 3,
      }}
    >
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: {
            xs: "100%",
            md: "max-content",
          },
          height: "max-content",
          flexShrink: 0,
          "& .MuiDrawer-paper ": {
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
            {userData?.firstName || ""} {userData?.lastName || ""}
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
