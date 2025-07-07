import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import logoImage from "../../assets/logo.svg";
import bgImage from "../../assets/register.svg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NumbersIcon from "@mui/icons-material/Numbers";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import axiosAuth from "../../api/axiosAuthInstance";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast, Slide } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CustomButton from "../../shared/CustomButton";
import CustomInput from "../../shared/CustomInput";

export default function SendCode() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const password = watch("password");
  const savedEmail = localStorage.getItem("userEmail");

  const userSendCode = useMutation({
    mutationFn: (data) => {
      return axiosAuth.post(
        `${import.meta.env.VITE_BURL}/Account/ForgotPassword`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sendCode"] });
      toast.success("Send Code Successfully", {
        transition: Slide,
        theme: "light",
      });
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Send Code failed");
    },
  });

  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const visible = name.slice(0, 4);
    return `${visible}${"*".repeat(name.length - 4)}@${domain}`;
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        className="bg-gradient"
        size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: "100% 100%",
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <Link to="/">
            <Box component="img" src={logoImage} alt="Login" />
          </Link>
        </Box>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6,
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: 5 }}>
          <Typography
            className="sub-title"
            variant="h4"
            sx={{ textTransform: "capitalize" }}
          >
            Step 2
          </Typography>
          <Typography variant="h4" py={2} sx={{ textTransform: "capitalize" }}>
            Set a New Password{" "}
          </Typography>
          <Typography variant="body2" sx={{ color: grey[500] }}>
            We have sent an OTP code via email to{" "}
            <strong>{maskEmail(savedEmail)}</strong>, please enter it below to
            reset your password.
          </Typography>

          <Box
            component="form"
            sx={{ py: 3 }}
            onSubmit={handleSubmit((data) => userSendCode.mutate(data))}
          >
            {/* Code Input */}
            <CustomInput
              label="Code"
              name="code"
              icon={NumbersIcon}
              register={register}
              rules={{ required: "Code is required" }}
              error={errors.code}
              helperText={errors.code?.message}
            />

            {/* Email Input */}
            <CustomInput
              label="Email"
              name="email"
              icon={MailOutlineIcon}
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              }}
              error={errors.email}
              helperText={errors.email?.message}
            />

            {/* Password Input */}
            <CustomInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              icon={LockIcon}
              register={register}
              rules={{
                required: "Password is required",
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) ||
                    "Passwords must have at least one uppercase ('A'-'Z')",
                  hasSymbol: (value) =>
                    /[^a-zA-Z0-9]/.test(value) ||
                    "Passwords must have at least one non alphanumeric character",
                },
              }}
              error={errors.password}
              helperText={errors.password?.message}
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
              name="ConfirmPassword"
              type="password"
              icon={LockIcon}
              register={register}
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              error={errors.ConfirmPassword}
              helperText={errors.ConfirmPassword?.message}
            />

            {/* Submit Button */}
            <CustomButton
              isLoading={userSendCode.isPending}
              text="Sending"
              loadingText="Sending..."
            />
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: grey[500],
              fontWeight: "600",
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            Remembered your password?
            <Link
              component={Link}
              to="/login"
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              {" "}
              Login
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
