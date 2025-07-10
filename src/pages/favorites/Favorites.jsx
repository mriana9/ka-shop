import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        minHeight: "75vh",
        color: grey[500],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <FavoriteBorderIcon />
        <Typography sx={{ fontWeight: "700" }}>Nothing here yet!</Typography>
        <Typography>
          Add items to your favorites to find them easily later.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          sx={{ backgroundColor: "#3ed7e9", mt: 4 }}
        >
          Shop now
        </Button>
      </Box>
    </Box>
  );
}
