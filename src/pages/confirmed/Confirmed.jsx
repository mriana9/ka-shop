import { Box, Button, Container, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

export default function Confirmed() {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 10, textAlign: "center" }}>
      {/* Icon */}
      <Box display="flex" justifyContent="center" mb={3}>
        <CheckCircleIcon
          sx={{
            fontSize: 80,
            color: "#00BCD4",
            borderRadius: "50%",
            border: "4px solid #00BCD4",
            p: 1,
          }}
        />
      </Box>

      {/* Heading */}
      <Typography
        variant="h6"
        fontWeight="500"
        color="text.secondary"
        gutterBottom
      >
        Your order is confirmed!
      </Typography>

      {/* Subtitle */}
      <Typography variant="body1" sx={{ color: grey[500] }} mb={4}>
        We’ve received your payment and will start processing your order
        shortly.
      </Typography>

      {/* Buttons */}
      <Box display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4dd0e1",
            color: "#fff",
            "&:hover": { backgroundColor: "#4fc4ca" },
          }}
          onClick={() => navigate("/orders")}
        >
          Go to order
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1f1b4f",
            color: "#fff",
            "&:hover": { backgroundColor: "#312d5f" },
          }}
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}
