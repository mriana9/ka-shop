import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axiosAuth from "../../api/axiosAuthInstance";
import { useQuery } from "@tanstack/react-query";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
export default function MyProfile() {
  const fetchUserData = async () => {
    const res = await axiosAuth.get("/Account/userinfo");
    return res.data;
  };

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    staleTime: 0,
  });

  console.log("userData", userData);

  return (
    <Box mx={3}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            label="First Name"
            fullWidth
            sx={{ m: 1, cursor: "not-allowed" }}
            disabled
            value={userData?.firstName || ""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Last Name"
            value={userData?.lastName || ""}
            fullWidth
            sx={{ m: 1, cursor: "not-allowed" }}
            disabled
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            label="User Name"
            value={userData?.userName || ""}
            fullWidth
            sx={{ m: 1, cursor: "not-allowed" }}
            disabled
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Gender"
            value={userData?.gender || ""}
            fullWidth
            sx={{ m: 1, cursor: "not-allowed" }}
            disabled
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    {userData?.gender === "Male" ? <ManIcon /> : <WomanIcon />}{" "}
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid item size={{ xs: 12, md: 12 }}>
          <TextField
            label="Email"
            value={userData?.email || ""}
            fullWidth
            sx={{ m: 1, cursor: "not-allowed" }}
            disabled
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
      </Grid>
      {/* <Box sx={{ display: "flex", gap: "10px", justifyContent: "end", my: 3 }}>
        <Button
          variant="outlined"
          sx={{
            boxShadow: "none",
            color: "#312d5f",
            borderColor: "#312d5f",
          }}
          startIcon={<EditIcon color="#312d5f" />}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: "#4fc4ca", color: "#312d5f" }}
        >
          Save Changes
        </Button>
      </Box> */}
    </Box>
  );
}
