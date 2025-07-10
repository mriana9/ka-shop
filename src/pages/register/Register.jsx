import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import logoImage from "../../assets/logo.svg";
import registerImage from "../../assets/register.svg";
import { grey } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import { Slide, toast } from "react-toastify";
import CustomButton from "../../shared/CustomButton";
import CustomInput from "../../shared/CustomInput";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const queryClient = new QueryClient();
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();
  const password = watch("password");

  const registerUser = useMutation({
    mutationFn: (data) => {
      return axiosAuth.post(
        `/Account/register`,
        data
      );
    },
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["userRegister"] });
      toast.success("Create User Successfully", {
        transition: Slide,
        theme: "light",
      });

      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Register failed");
    },
  });
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
            backgroundImage: `url(${registerImage})`,
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
          <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
            Create New Account
          </Typography>
          <Typography variant="P" sx={{ color: grey[500] }}>
            Join us to track orders, save favorites, and get special offers.
          </Typography>
          <Box
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "flex",
                lg: "flex",
              },
              gap: 3,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              fullWidth
              className="btn-primary-outlined"
              sx={{
                textTransform: "capitalize",
                marginTop: "10px",
                borderRadius: 2,
                minWidth: "max-content",
              }}
              startIcon={<FacebookIcon />}
            >
              facebook
            </Button>
            <Button
              variant="outlined"
              fullWidth
              className="btn-primary-outlined"
              sx={{
                textTransform: "capitalize",
                marginTop: "10px",
                borderRadius: 2,
                minWidth: "max-content",
              }}
              startIcon={<GoogleIcon />}
            >
              google
            </Button>
            <Button
              variant="outlined"
              fullWidth
              className="btn-primary-outlined"
              sx={{
                textTransform: "capitalize",
                marginTop: "10px",
                borderRadius: 2,
                minWidth: "max-content",
              }}
              startIcon={<AppleIcon />}
            >
              apple ID
            </Button>
          </Box>

          <Divider sx={{ color: grey[500], my: 4 }}>or</Divider>

          <Box
            component={"form"}
            onSubmit={handleSubmit((data) => registerUser.mutate(data))}
          >
            <Grid container sx={{ mb: 3 }} spacing={3}>
              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                {/* First Name Input Field */}
                <CustomInput
                  label="First Name"
                  name="firstName"
                  icon={PersonOutlineIcon}
                  register={register}
                  rules={{
                    required: "First name is required",
                    minLength: {
                      value: 4,
                      message: "User name must be at least 4 characters long",
                    },
                  }}
                  error={errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                {/* Last Name Input Field */}
                <CustomInput
                  label="Last Name"
                  name="lastName"
                  icon={PersonOutlineIcon}
                  register={register}
                  rules={{
                    required: "Last name is required",
                    minLength: {
                      value: 4,
                      message: "User name must be at least 4 characters long",
                    },
                  }}
                  error={errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid>
            </Grid>

            {/* User Name */}
            <CustomInput
              label="User Name"
              name="userName"
              icon={PersonOutlineIcon}
              register={register}
              rules={{
                required: "User name is required",
                minLength: {
                  value: 6,
                  message: "User name must be at least 6 characters long",
                },
              }}
              error={errors.userName}
              helperText={errors.userName?.message}
            />

            {/* Email */}
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

            {/* Password */}
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
                    "Must include at least one uppercase letter",
                  hasSymbol: (value) =>
                    /[^a-zA-Z0-9]/.test(value) ||
                    "Must include a special character",
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
              name="confirmPassword"
              type="password"
              icon={LockIcon}
              register={register}
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            {/* Date of Birth */}
            <CustomInput
              label="Date of Birth"
              name="birthOfDate"
              type="date"
              register={register}
              rules={{
                required: "Date of birth is required",
                validate: (value) => {
                  const today = new Date();
                  const dob = new Date(value);
                  const age = today.getFullYear() - dob.getFullYear();
                  const m = today.getMonth() - dob.getMonth();
                  const d = today.getDate() - dob.getDate();
                  const is18 =
                    age > 18 || (age === 18 && (m > 0 || (m === 0 && d >= 0)));
                  return is18 || "Must be at least 18 years old";
                },
              }}
              error={errors.birthOfDate}
              helperText={errors.birthOfDate?.message}
              InputLabelProps={{ shrink: true }}
            />

            <CustomButton
              isLoading={registerUser.isPending}
              text="Register"
              loadingText="Registering..."
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
            Already have an Account?
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
