import Image from "next/image";
import HeroSlider from "./components/HeroSlider";
import PopularCategories from "./components/PopularCategories";

export default function Home() {
   return (
    <main className="px-4 lg:px-6">
        <HeroSlider />
        <PopularCategories />
    </main>
  );
}
