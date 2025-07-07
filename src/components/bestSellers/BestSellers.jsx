import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "../cards/ProductCard";
import ProductCardSkeleton from "../loading/ProductCardSkeleton";

export default function BestSellers({ title }) {
  const fetchProducts = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BURL}/products`);
    return data.data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  return (
    <Container sx={{ py: 3 }} className="best-sellers">
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h3">{title}</Typography>
        <Link to="/products" style={{ color: "#27c2c2" }}>
          See all
        </Link>
      </Box>

      {isLoading ? (
        <Swiper
          spaceBetween={10}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : isError ? (
        <Typography color="error">Error: {error.message}</Typography>
      ) : (
        <Swiper
          spaceBetween={10}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {data.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
}
