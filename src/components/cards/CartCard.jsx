import { Box, Typography, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import cardImage from "../../assets/cartimg.png";

export default function CartCard() {
  return (
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Box
        component="img"
        src={cardImage}
        alt="cart img"
        sx={{
          height: { xs: 100, md: 120 },
        }}
      />
      <Box flexGrow={1}>
        <Typography variant="h6">MacBook M1</Typography>
        <Typography variant="body2" color="text.secondary">
          Product Description Product Description Product Description
        </Typography>
        <Box mt={1} sx={{ display: "flex", gap: 1 }}>
          <Typography color="error" sx={{ textDecoration: "line-through" }}>
            1499,99
          </Typography>
          <Typography fontWeight="bold">1299,99</Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "end" }}>
        <IconButton sx={{ color: "#DC1818" }}>
          <DeleteIcon />
        </IconButton>
        <IconButton sx={{ color: "#4fc4ca" }}>
          <FavoriteBorderIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Button variant="text" sx={{ minWidth: 40, color: "#312d5f" }}>
            -
          </Button>
          <Typography
            sx={{
              px: 2,
              borderLeft: "1px solid #ccc",
              borderRight: "1px solid #ccc",
              minWidth: 32,
              textAlign: "center",
            }}
          >
            1
          </Typography>
          <Button variant="text" sx={{ minWidth: 40, color: "#312d5f" }}>
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
