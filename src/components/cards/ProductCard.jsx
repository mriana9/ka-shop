import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        position: "relative",
        mt: 2,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: 0,
        transition: "0.3s",
        "&:hover .hover-overlay": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      {/* Product Image */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={product.mainImg}
          alt="Product"
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        {/* Favorite Icon */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#eee",
            },
            zIndex: 2,
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>

        {/* Hover Add to Cart Button */}
        <Box
          className="hover-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "all 0.3s ease",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#27c2c2",
              color: "white",
              "&:hover": {
                backgroundColor: "#1daaaa",
              },
            }}
            startIcon={<ShoppingCartIcon />}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>

      {/* Product Info */}
      <Box sx={{ p: 2 }}>
        <Link
          to={`/product/${product.id}`}
          fontWeight={600}
          sx={{
            color: "#312d5f",
          }}
        >
          {product.name}
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          height="40px"
          mt={0.5}
        >
          {product.description}
        </Typography>
        <Typography mt={1} fontWeight={600} color="#001e6c">
          {product.price}$
        </Typography>
      </Box>
    </Card>
  );
}
