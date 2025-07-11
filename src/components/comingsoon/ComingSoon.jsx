import { Box, Typography, Button } from "@mui/material";
import Lottie from "lottie-react";
import comingSoonAnimation from "../../assets/coming-soon.json";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <Box textAlign="center" mt={5} minHeight="70vh">
      <Box sx={{ maxWidth: 400, mx: "auto" }}>
        <Lottie animationData={comingSoonAnimation} loop autoplay />
      </Box>
      <Button
        component={Link}
        color="inherit"
        className="nav-link"
        sx={{
          mt: 5,
          fontWeight: 500,
          minWidth: "max-content",
          textTransform: "capitalize",
          backgroundColor: "#4fc4ca",
        }}
      >
        Back To Home
      </Button>
    </Box>
  );
}
