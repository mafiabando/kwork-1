import Image from "next/image";
import HeroSlider from "./components/HeroSlider";
import PopularCategories from "./components/PopularCategories";
import StoreInfo from "./components/StoreInfo";
import PopularProducts from "./components/PopularProducts";

export default function Home() {
   return (
    <main className="px-4 lg:px-6">
        <HeroSlider />
        <PopularCategories />
        <StoreInfo />
        <PopularProducts />
    </main>
  );
}
