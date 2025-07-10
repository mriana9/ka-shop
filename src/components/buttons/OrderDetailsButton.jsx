import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosAuth from "../../api/axiosAuthInstance";
import { useQuery } from "@tanstack/react-query";
import OrderDetailsSkeleton from "../loading/OrderDetailsSkeleton";
export default function OrderDetailsButton({ orderId }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchUserOrderDetailsData = async () => {
    const res = await axiosAuth.get(`/Orders/${orderId}`);
    return res.data;
  };

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["userOrderDetails"],
    queryFn: fetchUserOrderDetailsData,
    staleTime: 0,
    enabled: open && !!orderId,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        Details
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* Close Icon */}
          <Box sx={{ position: "absolute", top: 10, right: 10 }}>
            <Button onClick={handleClose} sx={{ minWidth: 0, p: 0 }}>
              <CloseIcon color="error" />
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {isLoading ? (
            <OrderDetailsSkeleton />
          ) : orderDetails ? (
            <>
              <Typography>
                <strong>Order ID:</strong> {orderDetails.id}
              </Typography>
              <Typography>
                <strong>Status:</strong> {orderDetails.orderStatus}
              </Typography>
              <Typography>
                <strong>Payment:</strong> {orderDetails.paymentMethodType}
              </Typography>
              <Typography>
                <strong>Order Date:</strong>{" "}
                {new Date(orderDetails.orderDate).toLocaleString()}
              </Typography>
              <Typography>
                <strong>Shipped Date:</strong>{" "}
                {orderDetails.shippedDate.startsWith("0001")
                  ? "Not shipped yet"
                  : new Date(orderDetails.shippedDate).toLocaleString()}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Products:
              </Typography>
              <List dense>
                {orderDetails.items.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={item.productName}
                      secondary={`Price: $${item.totalPrice.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">
                Total: ${orderDetails.totalPrice.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography color="error">Failed to load order details.</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}
