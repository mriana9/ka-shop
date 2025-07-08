import {
  Box,
  Button,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaymentIcon from "@mui/icons-material/Payment";
//import MailOutlineIcon from "@mui/icons-material/MailOutline";
//import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import { Slide, toast } from "react-toastify";
import { grey } from "@mui/material/colors";
import SummaryCard from "../../components/cards/SummaryCard";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [selectedMethod, setSelectedMethod] = useState("Cash");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const checkout = useMutation({
    mutationFn: (data) =>
      axiosAuth.post(`${import.meta.env.VITE_BURL}/CheckOuts/Pay`, data),

    onSuccess: () => {
      toast.success("Payment Successfully", {
        transition: Slide,
        theme: "light",
      });

      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["totalPrice"] });

      navigate("/confirmed");
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Payment failed");
    },
  });

  const paymentMethods = [
    {
      value: "Cash",
      label: "Cash",
      icon: <AttachMoneyIcon size={30} color="#4caf50" />,
    },
    {
      value: "Visa",
      label: "VISA",
      icon: <PaymentIcon size={30} color="#4caf50" />,
    },
  ];

  const fetchTotalPrice = async () => {
    const res = await axiosAuth.get("/Carts");
    return res.data.totalPrice;
  };

  const { data: totalPrice } = useQuery({
    queryKey: ["totalPrice"],
    queryFn: fetchTotalPrice,
    staleTime: 0,
  });

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

  return (
    <Container>
      <Grid container spacing={4} py={5}>
        <Grid item size={{ xs: 12, md: 8 }}>
          <Typography variant="h5" mb={2}>
            Checkout
          </Typography>

          {/* <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First Name"
                fullWidth
                sx={{ m: 1 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                helperText="Ex: Mariana"
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last Name"
                fullWidth
                sx={{ m: 1 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                helperText="Ex: Algafy"
              />
            </Grid>
            <Grid item size={{ xs: 12, md: 12 }}>
              <TextField
                label="Email"
                fullWidth
                sx={{ m: 1 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                helperText="Ex: mariana.algafy@gmail.com"
              />
            </Grid>
          </Grid> */}

          <Box mt={4}>
            {/* <Typography variant="subtitle1" mb={2}>
              Card
            </Typography> */}

            <Grid container spacing={2}>
              {paymentMethods.map((method) => (
                <Grid size={{ xs: 12, sm: 6 }} key={method.value}>
                  <Paper
                    onClick={() => setSelectedMethod(method.value)}
                    elevation={selectedMethod === method.value ? 6 : 1}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 0,
                      p: 2,
                      cursor: "pointer",
                      border:
                        selectedMethod === method.value
                          ? "2px solid #4fc4ca"
                          : "1px solid #ccc",
                      backgroundColor:
                        selectedMethod === method.value ? "#e3f2fd" : "white",
                      transition: "all 0.2s",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      {method.icon}
                      <Typography variant="body2">{method.label}</Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid
          item
          size={{ xs: 12, sm: 12, md: 4 }}
          sx={{ backgroundColor: "#F2F2F2" }}
        >
          <CardContent>
            <Typography variant="h6" mb={2} fontWeight="bold">
              Summary
            </Typography>
            {/* Cart Items */}
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
                  Your Summary is empty
                </Typography>
              </Box>
            ) : (
              cartItems.map((item) => <SummaryCard item={item} />)
            )}
            <Box display="flex" justifyContent="space-between" mt={2}>
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
              color="primary"
              fullWidth
              sx={{ backgroundColor: "#3ed7e9" }}
              disabled={checkout.isPending}
              onClick={() => checkout.mutate({ PaymentMethod: selectedMethod })}
            >
              {checkout.isPending ? "Processing..." : "Pay Now"}
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}
