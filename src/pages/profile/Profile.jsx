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
  Button,
} from "@mui/material";
import {
  AccountCircle,
  ShoppingCart,
  Logout,
  LockOutlineSharp,
} from "@mui/icons-material";
import MyProfile from "../../components/profile/MyProfile";
import MyOrders from "../../components/profile/MyOrders";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import ChangePassword from "../../components/profile/ChangePassword";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const menuItems = [
  { text: "My Profile", icon: <AccountCircle /> },
  { text: "My Orders", icon: <ShoppingCart /> },
  { text: "Change Password", icon: <LockOutlineSharp /> },
  { text: "Log out", icon: <Logout /> },
];

const tabRoutes = {
  "My Profile": "userinfo",
  "My Orders": "orders",
  "Change Password": "changePassword",
  "Log out": "logout",
};

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
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    queryClient.removeQueries({ queryKey: ["userLogin"] });

    navigate("/");
  };

  const contentMap = {
    "My Profile": <MyProfile userData={userData} />,
    "My Orders": <MyOrders />,
    "Change Password": <ChangePassword />,
    "Log out": (
      <Box
        height="40vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          onClick={handleLogout}
          variant="outlined"
          sx={{
            boxShadow: "none",
            color: "#fff",
            borderColor: "#4fc4ca",
            backgroundColor: "#4fc4ca",
          }}
          startIcon={<LogoutIcon color="#fff" />}
        >
          Logout
        </Button>
      </Box>
    ),
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
              onClick={() => {
                setSelectedTab(text);
                navigate(`/profile/${tabRoutes[text]}`, { replace: true });
              }}
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
