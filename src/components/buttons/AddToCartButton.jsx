import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axiosAuth from "../../api/axiosAuthInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Slide, toast } from "react-toastify";

export default function AddToCartButton({ productId }) {
  const queryClient = useQueryClient();

  const addToCardMutation = useMutation({
    mutationFn: (productId) => {
      return axiosAuth.post(`/Carts/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["totalPrice"] });

      toast.success("Add to Cart Successfully", {
        transition: Slide,
        theme: "light",
      });
    },
    onError: (error) => {
      console.error("Add to cart error:", error.message);
    },
  });

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => addToCardMutation.mutate(productId)}
      sx={{
        backgroundColor: "#27c2c2",
        color: "white",
        "&:hover": {
          backgroundColor: "#1daaaa",
        },
      }}
      startIcon={<ShoppingCartIcon />}
      disabled={addToCardMutation.isLoading}
    >
      {addToCardMutation.isLoading ? (
        <CircularProgress size={16} sx={{ mr: 1 }} />
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
}
