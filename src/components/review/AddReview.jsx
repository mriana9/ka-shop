import { Box, Typography, TextField, Rating, Container } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import { Slide, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import CustomButton from "../../shared/CustomButton";
import { useState } from "react";

export default function AddReview() {
  const queryClient = useQueryClient();
  const { id: productId } = useParams();

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const addReviewMutation = useMutation({
    mutationFn: ({ productId, data }) =>
      axiosAuth.post(`/products/${productId}/Reviews/Create`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success("Review submitted successfully!", {
        transition: Slide,
        theme: "light",
      });
      setApiError(""); // Clear error on success
      reset();
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to submit review";
      setApiError(message); 
    },
  });

  const onSubmit = (data) => {
    if (!data.Rate) {
      toast.error("Please select a rating");
      return;
    }
    setApiError(""); // Clear old errors
    addReviewMutation.mutate({
      productId,
      data,
    });
  };

  return (
    <Container sx={{ my: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box sx={{ py: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add a Review
            </Typography>

            {/* Controller for Rating */}
            <Controller
              name="Rate"
              control={control}
              rules={{ required: "Rating is required" }}
              render={({ field }) => (
                <Rating
                  {...field}
                  value={field.value || 0}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  sx={{
                    "& .MuiRating-icon": {
                      fontSize: "40px",
                    },
                  }}
                />
              )}
            />
            {errors.Rate && (
              <Typography color="error" variant="body2">
                {errors.Rate.message}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Comment Field */}
        <TextField
          label="Your Comment"
          fullWidth
          multiline
          rows={3}
          {...register("Comment", {
            required: "Comment is required",
            minLength: {
              value: 5,
              message: "Comment must be at least 5 characters",
            },
          })}
          error={!!errors.Comment}
          helperText={errors.Comment?.message}
        />

        {/* Submit Button */}
        <CustomButton
          isLoading={addReviewMutation.isPending}
          text="Submit Review"
          loadingText="Submitting..."
        />

        {apiError && (
          <Typography
            variant="body2"
            color="error"
            sx={{ mt: 2, textAlign: "center" }}
          >
            {apiError}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
