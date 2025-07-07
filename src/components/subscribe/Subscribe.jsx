import { Box, Container, Typography, TextField, Button } from "@mui/material";

export default function Subscribe() {
  return (
    <Box
      className="subscribe"
      sx={{
        background: "#9E97E1",
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 10 },
        mt: 6,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md" className="subscribe-content">
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" color="dark" mb={2}>
          Subscribe Don't Miss a Deal
        </Typography>

        {/* Subtitle */}
        <Typography variant="body1" color="dark" mb={4}>
          Sign up for the latest discounts, offers, and shopping trends.
        </Typography>

        {/* Form */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            width:"70%",
            justifyContent: "center",
            alignItems: "center",
            m:"auto",
            mt: 2,
          }}
        >
          <TextField
            placeholder="email@example.com"
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "white",
              outline: "none",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              width: { xs: "100%", sm: "60%" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#27c2c2",
              color: "white",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#1daaaa",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
