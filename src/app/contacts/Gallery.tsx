"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

// Предполагаем, что у вас уже есть массив slides
const slides = [
    { id: 1, src: "/shop-slider/1.webp", alt: "Слайд 1" },
    { id: 2, src: "/shop-slider/2.webp", alt: "Слайд 2" },
    { id: 3, src: "/shop-slider/4.webp", alt: "Слайд 3" },
    { id: 4, src: "/shop-slider/5.webp", alt: "Слайд 4" },
];

const Gallery = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Индекс текущего слайда

    // Функция для изменения текущего слайда
    const handleThumbnailClick = (index: number) => {
        setCurrentSlideIndex(index);
    };

    // Функция для открытия модалки (ваша существующая логика)
    const openModal = (index: number) => {
        // Здесь должен быть ваш код открытия модалки
        console.log("Открываем модалку для слайда:", index);
        // setIsModalOpen(true);
        // setCurrentModalSlide(index);
    };

    return (
        <div className="relative mt-2.5 p-7.5">
            {/* Основной слайдер */}
            <div className="w-full h-[563px] relative overflow-hidden">
                {/* Контейнер для основного слайда */}
                <div className="max-w-[709px] pr-40 box-content h-full relative">
                    {/* Основное изображение */}
                    <div
                        className="w-full h-full cursor-pointer"
                        onClick={() => openModal(currentSlideIndex)} // Открываем модалку при клике
                    >
                        <Image
                            src={slides[currentSlideIndex].src}
                            alt={slides[currentSlideIndex].alt}
                            width={709}
                            height={506}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Контейнер миниатюр */}
                <div
                    className="absolute right-0 top-0 w-[135px] flex flex-col"
                >
                    {/* Миниатюры */}
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`w-[135px] h-[101px] mb-2 last:mb-0 relative ${
                                index === currentSlideIndex ? "opacity-100" : "opacity-70"
                            } transition-opacity duration-250 cursor-pointer`}
                            onClick={() => handleThumbnailClick(index)}
                        >
                            <Image
                                src={slide.src}
                                alt={slide.alt}
                                width={135}
                                height={101}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;