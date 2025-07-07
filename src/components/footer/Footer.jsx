import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Instagram,
  Pinterest,
  Twitter,
  Telegram,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#121212", color: "#fff", py: 6 }}>
      <Container>
        <Grid
          className="footer-content"
          container
          spacing={4}
          sx={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {/* Social Icons */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              {[Instagram, Pinterest, Twitter, Telegram].map((Icon, idx) => (
                <IconButton
                  key={idx}
                  sx={{ border: "1px solid #8e8e8e", color: "#00e5ff" }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Our Product */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Our Product
            </Typography>
            {[
              "All Products",
              "Laptops",
              "Headphones",
              "Smartphones",
              "PlayStation",
              "Smartwatch",
            ].map((item) => (
              <Typography key={item} variant="body2" sx={{ mt: 1 }}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            {[
              "Terms & Conditions",
              "Privacy Policy",
              "Refund & Return Policy",
            ].map((item) => (
              <Typography key={item} variant="body2" sx={{ mt: 1 }}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Site Pages */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Site Pages
            </Typography>
            {["Homepage", "About KA Store", "Shop", "Contact Us"].map(
              (item) => (
                <Typography key={item} variant="body2" sx={{ mt: 1 }}>
                  {item}
                </Typography>
              )
            )}
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 6,
            borderTop: "1px solid #333",
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Typography variant="body2">
              Sunday to Thursday 09 AM — 07 PM
            </Typography>
            <Email fontSize="small" />
            <Phone fontSize="small" />
            <Button
              variant="outlined"
              size="small"
              sx={{ borderColor: "#444", color: "#fff" }}
              startIcon={<LocationOn />}
            >
              Location
            </Button>
          </Box>
          <Typography variant="body2" sx={{ mt: { xs: 2, md: 0 } }}>
            KA Store © 2025 | All Rights Reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
