import { Container, Grid } from "@mui/material";
import BannerCard from "../cards/BannerCard";
import bannerImage1 from "../../assets/banner1.png";
import bannerImage2 from "../../assets/banner2.png";
export default function Banner() {
  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <BannerCard
            title="Apple Watch"
            description="Stay on top of your day—Apple Watch, your perfect companion for health, fitness, and staying connected. Be present in every moment."
            image={bannerImage1}
            backgroundColor="#4FC4CA"
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <BannerCard
            title="AirPods Pro 2"
            description="Enjoy the freedom of real wireless audio for long hours and less charging. AirPods: The sound of innovation."
            image={bannerImage2}
            backgroundColor="#4FC4CA"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
