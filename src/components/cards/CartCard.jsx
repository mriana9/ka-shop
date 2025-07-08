import { Box, Button, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveFromCartButton from "../buttons/RemoveFromCartButton";
import cartImage from "../../assets/cartimg.png";
import { Link } from "react-router-dom";
import QuantityButton from "../buttons/QuantityButton";

export default function CartCard({ item, onIncrease, onDecrease }) {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
      }}
      gap={2}
      mb={2}
    >
      {/* Product Image */}
      <Box
        component="img"
        src={cartImage}
        alt={item?.name}
        sx={{
          height: { xs: 100, md: 120 },
          width: 120,
          objectFit: "contain",
        }}
      />

      {/* Product Info */}
      <Box flex={1}>
        <Typography variant="h6">
          <Link to={`/product/${item?.id}`} fontWeight={600}>
            {item.name}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item?.description}
        </Typography>
        <Box mt={1} sx={{ display: "flex", gap: 1 }}>
          {/* {item?.product?.oldPrice && (
            <Typography color="error" sx={{ textDecoration: "line-through" }}>
              ${item.product.oldPrice}
            </Typography>
          )} */}
          <Typography fontWeight="bold">${item?.price}</Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Box
        sx={{
          textAlign: {
            xs: "start",
            md: "end",
          },
        }}
      >
        <RemoveFromCartButton cartId={item.id} />
        <IconButton sx={{ color: "#4fc4ca" }}>
          <FavoriteBorderIcon />
        </IconButton>
        <QuantityButton
          count={item.count}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      </Box>
    </Box>
  );
}
