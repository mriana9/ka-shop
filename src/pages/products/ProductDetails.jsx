import {
  Grid,
  Box,
  Typography,
  Rating,
  Button,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import mainImageDefault from "../../assets/product1.png";
import thumProduct2 from "../../assets/thum-prodect2.png";
import thumProduct3 from "../../assets/thum-prodect3.png";
import thumProduct4 from "../../assets/thum-prodect4.png";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import BestSellers from "../../components/bestSellers/BestSellers";
import ProductDetailsSkeleton from "../../components/loading/ProductDetailsSkeleton";

export default function ProductDetails() {
  const thumbnails = [
    mainImageDefault,
    thumProduct2,
    thumProduct3,
    thumProduct4,
  ];
  const { id } = useParams();

  const [mainImage, setMainImage] = useState(mainImageDefault || thumbnails[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const fetchProductById = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_BURL}/products/${id}`);
    return res.data;
  };

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isLoading) return <ProductDetailsSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                flexDirection: {
                  xs: "column-reverse",
                  md: "row",
                },
              }}
            >
              {/* Thumbnails */}
              <Stack
                sx={{
                  flexDirection: {
                    xs: "row",
                    md: "column",
                  },
                }}
              >
                {thumbnails.map((thumb, index) => (
                  <Avatar
                    key={index}
                    variant="rounded"
                    src={thumb}
                    alt={`thumb${index + 1}`}
                    onClick={() => {
                      setMainImage(thumb);
                      setSelectedIndex(index);
                    }}
                    sx={{
                      width: 60,
                      height: 60,
                      border:
                        selectedIndex === index
                          ? "2px solid #4fc4ca"
                          : "2px solid transparent",
                      cursor: "pointer",
                      transition: "border 0.3s",
                    }}
                  />
                ))}
              </Stack>

              {/* Main Image */}
              <Box
                component="img"
                src={mainImage}
                alt="Main Product"
                sx={{
                  m: "auto",
                  border: "1px solid #4fc4ca",
                  borderRadius: 2,
                  maxWidth: "90%",
                }}
              />
            </Box>
          </Grid>

          <Grid item size={{ xs: 12, md: 6 }} pl={2}>
            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">{product.name}</Typography>
                <IconButton>
                  <FavoriteBorderIcon />
                </IconButton>
              </Box>

              <Typography color="text.secondary" mt={3}>
                {product.description}
              </Typography>

              <Typography fontWeight="bold" mt={3}>
                Rate
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Rating value={3.4} precision={0.1} readOnly />
                <Typography variant="body2">({product.rate})</Typography>
              </Box>

              <Typography fontWeight="bold" mt={3}>
                Colours
              </Typography>
              <Stack direction="row" spacing={1}>
                {["white", "black", "red", "orange", "blue"].map((color) => (
                  <Box
                    key={color}
                    width={24}
                    height={24}
                    borderRadius="50%"
                    bgcolor={color}
                    border="1px solid #ccc"
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Stack>

              <Typography fontWeight="bold" mt={3}>
                Price
              </Typography>
              <Typography fontSize="20px" fontWeight="bold" color="dark">
                ${product.price}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
              >
                {/* Quantity Control Box */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{ minWidth: 40, color: "#312d5f" }}
                  >
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
                  <Button
                    variant="text"
                    sx={{ minWidth: 40, color: "#312d5f" }}
                  >
                    +
                  </Button>
                </Box>

                {/* Buy Button */}
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    flexGrow: 1,
                    height: "40px",
                    backgroundColor: "#4fc4ca",
                  }}
                >
                  Buy
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <BestSellers title={"Recommended for You"} />
    </>
  );
}
