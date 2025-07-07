import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function BannerCard({
  title,
  description,
  image,
  backgroundColor,
}) {
  return (
    <Box
      className="banner-card"
      sx={{
        backgroundColor,
        borderRadius: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: { xs: 2, md: 4 },
        height: { xs: 260, md: 240 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ maxWidth: "60%" }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.primary" mb={2}>
          {description}
        </Typography>
        <Link to="/product">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
          >
            Buy Now
          </Button>
        </Link>
      </Box>

      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          height: { xs: 100, md: 180 },
          position: "absolute",
          zIndex:3,
          right: 16,
          bottom: 16,
        }}
      />
    </Box>
  );
}
