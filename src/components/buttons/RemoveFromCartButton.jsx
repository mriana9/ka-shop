import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosAuth from "../../api/axiosAuthInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function RemoveFromCartButton({ cartId }) {
  const queryClient = useQueryClient();

  const removeFromCartMutation = useMutation({
    mutationFn: () =>
      axiosAuth.delete(`/Carts/${cartId}`),

    onSuccess: () => {
      toast.success("Removed from Cart Successfully");
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove item");
    },
  });

  return (
    <IconButton
      onClick={() => removeFromCartMutation.mutate()}
      sx={{ color: "#DC1818" }}
      disabled={removeFromCartMutation.isLoading}
    >
      <DeleteIcon />
    </IconButton>
  );
}
