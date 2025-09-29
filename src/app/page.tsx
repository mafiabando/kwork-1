import Image from "next/image";
import HeroSlider from "./components/HeroSlider";
import PopularCategories from "./components/PopularCategories";
import StoreInfo from "./components/StoreInfo";
import PopularProducts from "./components/PopularProducts";
import RelatedProductsSlider from "./components/RelatedProductsSlider";
import CompleteSolutionSlider from "./components/CompleteSolutionSlider";
import BannerForm from "./components/BannerForm";
import PaymentInfo from "./components/PaymentInfo";


export default function Home() {
   return (
    <main className="px-4 lg:px-6">
        <HeroSlider />
        <PopularCategories />
        <StoreInfo />
        <PopularProducts />
        <RelatedProductsSlider />
        <CompleteSolutionSlider />
        <BannerForm />
        <PaymentInfo />
    </main>
  );
}
