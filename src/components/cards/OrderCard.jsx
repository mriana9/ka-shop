import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
export default function OrderCard({ order }) {
  return (
    <Box
      border="1px solid #ddd"
      borderRadius={2}
      p={2}
      my={2}
      sx={{ backgroundColor: "#fff" }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Box display="flex">
            <LocalMallIcon
              sx={{
                color: "#4fc4ca",
              }}
            />{" "}
            <Typography fontWeight={600}>Product ID: {order.id} </Typography>
          </Box>
          <Typography color="text.secondary">
            ${order.totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color:
              order.orderStatus === "Approved"
                ? "green"
                : order.orderStatus === "Pending"
                ? "#b38b00"
                : "#555",
            borderColor:
              order.orderStatus === "Approved"
                ? "lightgreen"
                : order.orderStatus === "Pending"
                ? "gold"
                : "#aaa",
            backgroundColor:
              order.orderStatus === "Approved"
                ? "rgba(144, 238, 144, 0.2)"
                : order.orderStatus === "Pending"
                ? "rgba(255, 255, 0, 0.2)"
                : "transparent",
          }}
        >
          {order.orderStatus}
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box>
          <Typography variant="body2" fontWeight={500}>
            Order Date
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight={500}>
            Shipped Date
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(order.shippedDate).toLocaleDateString()}
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" fontWeight={500}>
            Payment Method
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {order.paymentMethodType}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
