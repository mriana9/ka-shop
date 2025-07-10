import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Slide } from "react-toastify";
import axiosAuth from "../../api/axiosAuthInstance";

export default function ClearCartButton() {
  const queryClient = useQueryClient();

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const userToken = localStorage.getItem("userToken");

      return await axiosAuth.delete(
        `${import.meta.env.VITE_BURL}/Carts/clearCart`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    },

    onSuccess: () => {
      toast.success("Clear All Successfully", {
        position: "top-right",
        theme: "light",
        transition: Slide,
      });

      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      queryClient.invalidateQueries({ queryKey: ["totalPrice"] });
    },

    onError: () => {
      toast.error("Please Check Your Network and Try Again!", {
        position: "top-right",
        theme: "colored",
        transition: Slide,
      });
    },
  });

  return (
    <Button
      variant="contained"
      sx={{ backgroundColor: "#3ed7e9" }}
      onClick={() => clearCartMutation.mutate()}
      disabled={clearCartMutation.isLoading}
    >
      {clearCartMutation.isLoading ? "Clearing..." : "Clear All"}
    </Button>
  );
}
