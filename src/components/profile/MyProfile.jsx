import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

export default function MyProfile({ userData }) {
  const isLoading = !userData;

  const renderField = (label, value, icon) => {
    return isLoading ? (
      <Skeleton variant="rounded" height={56} />
    ) : (
      <TextField
        label={label}
        value={value}
        fullWidth
        disabled
        sx={{ my: 1, cursor: "not-allowed" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          },
        }}
      />
    );
  };

  return (
    <Box minHeight="80vh">
      <Typography variant="h6" my={1}>
        My Profile
      </Typography>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, sm: 6 }}>
          {renderField(
            "First Name",
            userData?.firstName || "",
            <PersonOutlineIcon />
          )}
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          {renderField(
            "Last Name",
            userData?.lastName || "",
            <PersonOutlineIcon />
          )}
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          {renderField(
            "User Name",
            userData?.userName || "",
            <PersonOutlineIcon />
          )}
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          {renderField(
            "Gender",
            userData?.gender || "",
            userData?.gender === "Male" ? <ManIcon /> : <WomanIcon />
          )}
        </Grid>
        <Grid item size={{ xs: 12, sm: 6 }}>
          {renderField("Email", userData?.email || "", <MailOutlineIcon />)}
        </Grid>
      </Grid>
    </Box>
  );
}
