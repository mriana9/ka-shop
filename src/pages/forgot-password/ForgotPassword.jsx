import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import logoImage from "../../assets/logo.svg";
import bgImage from "../../assets/register.svg";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import axiosAuth from "../../api/axiosAuthInstance";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast, Slide } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../shared/CustomButton";
import CustomInput from "../../shared/CustomInput";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const userSendEmail = useMutation({
    mutationFn: (data) => {
      return axiosAuth.post(
        `/Account/ForgotPassword`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sendEmail"] });
      toast.success("Send Email Successfully", {
        transition: Slide,
        theme: "light",
      });
      navigate("/send-code");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Send Email failed");
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
            Step 1
          </Typography>
          <Typography variant="h4" py={2} sx={{ textTransform: "capitalize" }}>
            Forget Password
          </Typography>
          <Typography variant="P" sx={{ color: grey[500] }}>
            Please enter your phone number and we’ll send you a recovery code.{" "}
          </Typography>

          <Box
            component={"form"}
            sx={{ py: 3 }}
            onSubmit={handleSubmit((data) => userSendEmail.mutate(data))}
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

            <CustomButton
              isLoading={userSendEmail.isPending}
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
