import OurWorksSlider from "../components/OurWorksSlider";
import PathPage from "../components/PathPage";
import Sidebar from "../components/Sidebar/Sidebar";
import type { Metadata } from "next";
import Sales from "../components/Sales";

export const metadata: Metadata = {
    title: "Акции",
    description: "Акции",
};

const PolicyPage = () => {
    return (
        <>
            <section className="container-centered mt-5 max-w-[1300px] flex">
                <Sidebar />
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <PathPage />
                    <div className="mb-5 lg:mb-7.5">
                    <h1 className="text-black text-[28px] leading-8 lg:text-[40px] lg:leading-12 font-[600]">Акции</h1>
                    </div>
                    <Sales />
                </div>
            </section>
            <div className="mb-22.5">
                <OurWorksSlider />
            </div>
        </>
    );
};

export default PolicyPage;
