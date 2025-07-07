import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CategoryCard from "../cards/CategoryCard";
import { CategoryCardSkeleton } from "../loading/CategoryCardSkeleton";

export default function Categories() {
  const fetchCategories = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BURL}/categories`);
    return data;
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  if (isLoading) {
    return (
      <Container sx={{ my: 3 }}>
        <Swiper
          spaceBetween={10}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index}>
              <CategoryCardSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    );
  }
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Container sx={{ my: 3 }}>
      <Swiper
        spaceBetween={10}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {data.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
