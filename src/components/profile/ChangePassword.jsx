import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import CustomButton from "../../shared/CustomButton";
import CustomInput from "../../shared/CustomInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import { Slide, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("NewPassword");
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const changePassword = useMutation({
    mutationFn: (data) => {
      return axiosAuth.patch(
        `${import.meta.env.VITE_BURL}/Account/ChangePassword`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sendCode"] });
      toast.success("Change Password Successfully", {
        transition: Slide,
        theme: "light",
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Change Password failed");
    },
  });

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h6" my={1}>
        Change Password{" "}
      </Typography>

      <Box
        component="form"
        sx={{ py: 3 }}
        onSubmit={handleSubmit((data) => changePassword.mutate(data))}
      >
        {/* Password Input */}
        <CustomInput
          label="Old Password"
          register={register}
          name="OldPassword"
          type={showPassword ? "text" : "password"}
          icon={LockIcon}
          rules={{
            required: "Old Password is required",
            validate: {
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) ||
                "Old Passwords must have at least one uppercase ('A'-'Z')",
              hasSymbol: (value) =>
                /[^a-zA-Z0-9]/.test(value) ||
                "Old Passwords must have at least one non alphanumeric character",
            },
          }}
          error={errors.OldPassword}
          helperText={errors.OldPassword?.message}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />

        {/* Password Input */}
        <CustomInput
          label="New Password"
          register={register}
          name="NewPassword"
          type={showPassword ? "text" : "password"}
          icon={LockIcon}
          rules={{
            required: "New Password is required",
            validate: {
              hasUpperCase: (value) =>
                /[A-Z]/.test(value) ||
                "New Password must have at least one uppercase ('A'-'Z')",
              hasSymbol: (value) =>
                /[^a-zA-Z0-9]/.test(value) ||
                "New Password must have at least one non alphanumeric character",
            },
          }}
          error={errors.NewPassword}
          helperText={errors.NewPassword?.message}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />

        {/* Confirm Password */}
        <CustomInput
          label="Confirm Password"
          register={register}
          name="ConfirmNewPassword"
          type={showPassword ? "text" : "password"}
          icon={LockIcon}
          rules={{
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          }}
          error={errors.ConfirmNewPassword}
          helperText={errors.ConfirmNewPassword?.message}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {/* Submit Button */}
        <CustomButton
          isLoading={changePassword.isPending}
          text="Sending"
          loadingText="Sending..."
        />
      </Box>
    </Box>
  );
}
