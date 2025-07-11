import { Box, Typography, Button } from "@mui/material";
// or use lottie-react (preferred)
import Lottie from "lottie-react";
import errorAnimation from "../../assets/404.json";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Box textAlign="center" mt={5}>
      <Box sx={{ maxWidth: 400, mx: "auto" }}>
        <Lottie animationData={errorAnimation} loop autoplay />
      </Box>
      <Typography variant="h6" mt={1} mb={3}>
        Oops! Page not found
      </Typography>
      <Button
        component={Link}
        color="inherit"
        className="nav-link"
        sx={{
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
