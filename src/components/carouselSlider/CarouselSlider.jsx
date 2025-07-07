import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import heroImage from "../../assets/hero-img.png";
import { Link } from "react-router-dom";

const CarouselSlider = () => {
  const slides = [
    {
      title: "Feel Every Beat. Hear the Difference.",
      description:
        "Experience immersive sound with our premium speaker collection",
      discount: "30",
      bgColor: "#4fc4ca",
    },
    {
      title: "Feel Every Beat. Hear the Difference.",
      description:
        "Experience immersive sound with our premium speaker collection",
      discount: "30",
      bgColor: "#9E97E1",
    },
    {
      title: "Feel Every Beat. Hear the Difference.",
      description:
        "Experience immersive sound with our premium speaker collection",
      discount: "30",
      bgColor: "#4FC4CA",
    },
    {
      title: "Feel Every Beat. Hear the Difference.",
      description:
        "Experience immersive sound with our premium speaker collection",
      discount: "30",
      bgColor: "#6862A0",
    },
  ];
  return (
    <Box
      sx={{
        width: {
          md: "100vw",
          sm: "88vw",
        },
        height: {
          md: "430px",
          sm: "580px",
        },
        m: {
          md: 0,
          xs: 3,
        },
      }}
    >
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        spaceBetween={20}
        breakpoints={{
          768: {
            slidesPerView: 1.5,
          },
        }}
        centeredSlides={true}
        loop={true}
        initialSlide={0}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 2,
          slideShadows: false,
        }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{
              padding: "0px",
              backgroundColor: slide.bgColor,
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: "0px",
                width: "100%",
                backgroundColor: slide.bgColor,
              }}
              className="hero-swiper-card"
            >
              <CardContent
                sx={{
                  paddingRight: "0px",
                  width: "100%",
                }}
              >
                <Grid container direction={{ xs: "column-reverse", md: "row" }}>
                  <Grid
                    size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}
                    sx={{ display: "flex", alignItems: "center" }}
                    className="hero-content"
                  >
                    <Box>
                      <Typography variant="span" className="discount">
                        {slide.discount}% off
                      </Typography>
                      <Typography className="title">{slide.title}</Typography>
                      <Typography className="description" variant="body2">
                        {slide.description}
                      </Typography>

                      <Link to="/product">
                        <Button
                          variant="outlined"
                          className="btn light-btn"
                          sx={{
                            textTransform: "capitalize",
                            backgroundColor: "#fff",
                            border: "none",
                            mt: 2,
                          }}
                        >
                          Buy now
                        </Button>
                      </Link>
                    </Box>
                  </Grid>

                  <Grid
                    size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                      overflowX: "hidden",
                    }}
                    className="heroBg"
                  >
                    <Box component="img" src={heroImage} alt="Hero img" />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CarouselSlider;
