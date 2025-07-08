import {
  Box,
  Typography,
  Button,
  Divider,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import CartCard from "../../components/cards/CartCard";
import BestSellers from "../../components/bestSellers/BestSellers";
import axiosAuth from "../../api/axiosAuthInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CartCardSkeleton from "../../components/loading/CartCardSkeleton";
import { grey } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import ClearCartButton from "../../components/buttons/ClearCartButton";

export default function CartPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const increaseCart = async (cartId) => {
    await axiosAuth.patch(
      `${import.meta.env.VITE_BURL}/Carts/increaseCount/${cartId}`
    );
    queryClient.invalidateQueries(["cartItems"]);
    queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
  };

  const decreaseCart = async (cartId) => {
    await axiosAuth.patch(
      `${import.meta.env.VITE_BURL}/Carts/decreaseCount/${cartId}`
    );
    queryClient.invalidateQueries(["cartItems"]);
    queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
  };

  const fetchCartItem = async () => {
    const res = await axiosAuth.get("/Carts");
    return res.data.cartResponse;
  };

  const {
    data: cartItems,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: fetchCartItem,
    staleTime: 0,
  });

  const fetchTotalPrice = async () => {
    const res = await axiosAuth.get("/Carts");
    return res.data.totalPrice;
  };

  const { data: totalPrice } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: fetchTotalPrice,
    staleTime: 0,
  });

  return (
    <Container>
      <Grid container spacing={2} py={5}>
        {/* Cart Items */}
        <Grid size={{ xs: 12, sm: 12, md: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" mb={2}>
              Cart
            </Typography>
            <ClearCartButton />
          </Box>
          {isLoading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <CartCardSkeleton key={index} />
              ))}
            </>
          ) : isError ? (
            <Typography color="error">{error.message}</Typography>
          ) : cartItems?.length === 0 ? (
            <Box sx={{ textAlign: "center", color: grey[500] }}>
              <ShoppingCartIcon />
              <Typography sx={{ fontWeight: "700" }}>
                Your cart is empty
              </Typography>
              <Typography>
                Looks like you haven’t added anything yet. Let’s fix that!
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/products")}
                sx={{ backgroundColor: "#3ed7e9", mt: 4 }}
              >
                Shop now
              </Button>
            </Box>
          ) : (
            cartItems.map((item) => (
              <CartCard
                key={item.id}
                item={item}
                onIncrease={() => increaseCart(item.id)}
                onDecrease={() => decreaseCart(item.id)}
              />
            ))
          )}
        </Grid>

        {/* Order Summary */}
        <Grid
          size={{ xs: 12, sm: 12, md: 4 }}
          sx={{ backgroundColor: "#F2F2F2" }}
        >
          {cartItems?.length === 0 ? (
            <Typography
              sx={{
                fontWeight: "700",
                textAlign: "center",
                minHeight: "200px",
                pt: 5,
              }}
              color={grey[500]}
            >
              Your Summary is empty
            </Typography>
          ) : (
            <CardContent>
              <Typography variant="h6" mb={2} fontWeight="bold">
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography>Subtotal</Typography>
                <Typography>1499,99</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Delivery Charges</Typography>
                <Typography>20,00</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>V.A.T</Typography>
                <Typography>10,00</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Discount</Typography>
                <Typography color="error">-100,00</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="bold">Total</Typography>
                <Typography fontWeight="bold">{totalPrice}$</Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/checkout"
                sx={{ backgroundColor: "#3ed7e9" }}
              >
                Proceed to checkout
              </Button>
            </CardContent>
          )}
        </Grid>
      </Grid>
      <Divider />
      <BestSellers title={"Recommended for You"} />
    </Container>
  );
}
