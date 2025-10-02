"use client";
import Link from "next/link";
import React from "react";

const Blog = () => {
    // Данные акций
    const campaigns = [
        {
            id: 1,
            title: "Гранитная ваза в подарок!",
            description: "При заказе памятника и благоустройства гранитная ваза из двух половин - в подарок",
            image: "/promo/1.webp",
            link: "/",
        },
        {
            id: 2,
            title: "Ваза из полимербетона в подарок!",
            description: "При заказе памятника и благоустройства ваза из полимербетона на кладбище в подарок",
            image: "/promo/2.webp",
            link: "/",
        },
        {
            id: 3,
            title: "Благоустройство могил на весну-лето 2025 года",
            description: "Выгода при оформлении договора на установку на весну-лето 2025 года!",
            image: "/promo/3.webp",
            link: "/",
        },
        {
            id: 4,
            title: "Благоустройство могил на весну-лето 2025 года",
            description: "Выгода при оформлении договора на установку на весну-лето 2025 года!",
            image: "/promo/3.webp",
            link: "/",
        },
    ];

    return (
        <section className="bg-[#f5f6fa] mt-17 md:mt-30">
            <div className="max-w-[1300px] py-[93px] container-centered">

                <h2 className="text-4xl font-bold text-[#2c3a54] mb-7.5">Блог</h2>

                {/* Используем flex + gap, чтобы отступы не ломали ширину */}
                <div className="flex flex-col md:flex-row space-x-2.5 space-y-5 md:space-y-0">
                    {campaigns.map((campaign) => (
                        <div
                            key={campaign.id}
                            className="w-full md:w-1/4 mx-2.5 bg-white rounded-lg shadow-sm overflow-hidden"
                        >
                            <a href={campaign.link} className="block">
                                <img
                                    src={campaign.image}
                                    alt={campaign.title}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="px-4.25 py-3.75 md:p-6">
                                    <h3 className="font-bold text-md lg:text-xl text-[#2c3a54] mb-1.25">{campaign.title}</h3>
                                    <p className="text-sm md:text-md text-[#2c3a54cc] leading-relaxed">
                                        {campaign.description}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-6 md:mt-8 flex text-center">
                    <Link href={'/'} className="font-bold w-full md:max-w-[338px] px-7.5 py-3 bg-[#2c3a54] border border-[#2c3a54] text-white rounded-full hover:bg-white hover:text-[#2c3a54] transition">
                        Смотреть все
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blog;