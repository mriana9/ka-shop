import Ads from "../../components/Ads/Ads";
import Banner from "../../components/banner/Banner";
import BestSellers from "../../components/bestSellers/BestSellers";
import CarouselSlider from "../../components/carouselSlider/CarouselSlider";
import Categories from "../../components/categories/Categories";
import Subscribe from "../../components/subscribe/Subscribe";

export default function Home() {
  return (
    <>
      <CarouselSlider />
      <Categories />
      <BestSellers />
      <Ads />
      <Banner />
      <Subscribe />
    </>
  );
}
