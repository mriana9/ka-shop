import { Box, Grid, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveFromCartButton from "../buttons/RemoveFromCartButton";
import cartImage from "../../assets/cartimg.png";
import { Link } from "react-router-dom";

export default function SummaryCard({ item }) {
  return (
    <Grid container spacing={2} mt={2}>
      {/* Product Image */}
      <Grid
        item
        size={{ xs: 4, md: 4 }}
        component="img"
        src={cartImage}
        alt={item?.name}
        sx={{
          objectFit: "contain",
        }}
      ></Grid>

      {/* Product Info */}
      <Grid item size={{ xs: 12, md: 8 }}>
        <Link to={`/product/${item?.id}`} fontWeight={600}>
          <Typography variant="h6" fontWeight={300} sx={{ color: "#312d5f" }}>
            {item.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {item?.description}
        </Typography>
        <Box mt={1} sx={{ display: "flex", gap: 1 }}>
          <Typography fontWeight="bold">${item?.price}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
