import { Box, Button, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveFromCartButton from "../buttons/RemoveFromCartButton";
import cartImage from "../../assets/cartimg.png";

export default function CartCard({ item }) {
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
        <Typography variant="h6">{item?.name}</Typography>
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
      <Box>
        <RemoveFromCartButton cartId={item.id} />
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
            mt: 1,
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
            {item.count}
          </Typography>
          <Button variant="text" sx={{ minWidth: 40, color: "#312d5f" }}>
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
