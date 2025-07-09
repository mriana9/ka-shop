import {
  Box,
  Button,
  Grid,
  Typography,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import loginImage from "../../assets/login.svg";
import logoImage from "../../assets/logo.svg";
import { grey } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosAuth from "../../api/axiosAuthInstance";
import { Slide, toast } from "react-toastify";
import CustomButton from "../../shared/CustomButton";
import CustomInput from "../../shared/CustomInput";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const queryClient = useQueryClient();
  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const navigate = useNavigate();

  const loginUser = useMutation({
    mutationFn: (data) => {
      return axiosAuth.post(`${import.meta.env.VITE_BURL}/Account/Login`, data);
    },
    onSuccess: (res, variables) => {
      const userData = {
        token: res.data.token,
        email: variables.email,
      };

      //queryClient.invalidateQueries({ queryKey: ["userLogin"] });
      queryClient.setQueryData(["userLogin"], userData);

      toast.success("Login Successfully", {
        transition: Slide,
        theme: "light",
      });
      localStorage.setItem("userToken", userData.token);
      localStorage.setItem("userEmail", userData.email);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
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
            backgroundImage: `url(${loginImage})`,
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
            login
          </Typography>
          <Typography variant="P" sx={{ color: grey[500] }}>
            Good to see you again!
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
            onSubmit={handleSubmit((data) => loginUser.mutate(data))}
          >
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

            <Typography variant="body2" sx={{ textAlign: "end" }}>
              <Link
                component={Link}
                to="/forgot-password"
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Link>
            </Typography>

            <CustomButton
              isLoading={loginUser.isPending}
              text="Login"
              loadingText="Logging in..."
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
            Don't have an account?
            <Link
              component={Link}
              to="/register"
              underline="hover"
              sx={{ cursor: "pointer" }}
            >
              {" "}
              Create Account
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
