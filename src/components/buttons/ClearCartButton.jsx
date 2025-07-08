import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Slide } from "react-toastify";

export default function ClearCartButton() {
  const queryClient = useQueryClient();

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const userToken = localStorage.getItem("userToken");

      return await axios.delete(
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
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },

    onError: () => {
      toast.error("Please Check Your Network and Try Again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
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
