import { Box, Grid, Typography, Button } from "@mui/material";
import adsImage1 from "../../assets/ads1.png";
import adsImage2 from "../../assets/ads2.png";
import adsImage3 from "../../assets/ads3.png";

export default function Ads() {
  return (
    <Box
      sx={{
        background:
          " radial-gradient(50% 50% at 50% 50%, #C0BAFC 17.31%, #E8E6FF 100%)",
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 8 },
        borderRadius: 4,
        my: 4,
      }}
    >
      <Grid container spacing={2} alignItems="stretch">
        <Grid item size={{ xs: 12, md: 6 }}>
          <Grid container direction="column" spacing={2} height="100%">
            {/* Top Ad */}
            <Grid item>
              <Box
                sx={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: { xs: 180, md: 160 },
                  borderRadius: 2,
                  backgroundImage: `url(${adsImage1})`,
                }}
              ></Box>
            </Grid>

            {/* Bottom Ad */}
            <Grid item>
              <Box
                sx={{
                  backgroundImage: `url(${adsImage2})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 2,
                  p: 2,
                  height: { xs: 180, md: 160 },
                }}
              ></Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Right side - Full ad */}
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              backgroundImage: `url(${adsImage3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: { xs: 360, md: "100%" },
              borderRadius: 2,
              p: 4,
            }}
          ></Box>
        </Grid>
      </Grid>
    </Box>
  );
}
