"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const OurWorksSlider = () => {
    const [isMobile, setIsMobile] = useState(false); // <768px
    const [isTablet, setIsTablet] = useState(false); // <1024px
    const [activeCategory, setActiveCategory] = useState("Все");

    // Для адаптивности
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width < 1024);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Фотографии (можно заменить на реальные данные)
    const works = [
        { id: 1, src: "/works/1.webp", alt: "Работа 1" },
        { id: 2, src: "/works/2.webp", alt: "Работа 2" },
        { id: 3, src: "/works/3.webp", alt: "Работа 3" },
        { id: 4, src: "/works/4.webp", alt: "Работа 4" },
        { id: 5, src: "/works/5.webp", alt: "Работа 5" },
        { id: 6, src: "/works/6.webp", alt: "Работа 6" },
        { id: 7, src: "/works/7.webp", alt: "Работа 7" },
        { id: 8, src: "/works/8.webp", alt: "Работа 8" },
    ];

    // Фильтрация работ по категории (заглушка — можно расширить)
    const filteredWorks = works.filter((work) => {
        if (activeCategory === "Все") return true;
        if (activeCategory === "Одиночные") return work.id % 2 === 1;
        if (activeCategory === "Двойные") return work.id % 2 === 0;
        if (activeCategory === "В виде креста") return work.id === 3 || work.id === 7;
        return true;
    });

    // Рефы для слайдера
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Модальное окно
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalSlide, setCurrentModalSlide] = useState(0);

    const openModal = (index: number) => {
        setCurrentModalSlide(index);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"; // Блокируем скролл
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto"; // Возвращаем скролл
    };

    const nextSlide = () => {
        setCurrentModalSlide((prev) => (prev + 1) % filteredWorks.length);
    };

    const prevSlide = () => {
        setCurrentModalSlide((prev) => (prev - 1 + filteredWorks.length) % filteredWorks.length);
    };

    // Закрытие по Esc
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;
            if (e.key === "Escape") {
                closeModal();
            } else if (e.key === "ArrowLeft") {
                prevSlide();
            } else if (e.key === "ArrowRight") {
                nextSlide();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen, nextSlide, prevSlide]);

    // Функции для навигации (аналогично CompleteSolutionSlider)
    const getVisibleCards = () => {
        if (isMobile) return 1;
        return isTablet ? 2 : 4; // <1024: 2, ≥1024: 4
    };

    const getSlideWidth = () => {
        if (!containerRef.current) return 0;
        const containerWidth = containerRef.current.offsetWidth;
        const visibleCards = getVisibleCards();
        return containerWidth / visibleCards;
    };

    const scrollLeft = () => {
        if (sliderRef.current) {
            const slideWidth = getSlideWidth();
            const scrollAmount = slideWidth * getVisibleCards();
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            const slideWidth = getSlideWidth();
            const scrollAmount = slideWidth * getVisibleCards();
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    // Карточка работы (без цен, без кнопок, только фото)
    const WorkCard = ({ work, index }: { work: { id: number; src: string; alt: string }; index: number }) => {
        const cardBasis = isMobile
            ? "basis-[calc(100%_+_10px)]" // 100% + немного перекрытия
            : isTablet
                ? "basis-[calc(50%_+_5px)]" // 50% + немного перекрытия
                : "basis-[calc(25%_+_2px)]"; // 25% + немного перекрытия

        return (
            <div
                key={work.id}
                className={`relative flex-shrink-0 cursor-pointer ${cardBasis} px-1.5`}
                onClick={() => openModal(index)}
            >
                <img
                    src={work.src}
                    alt={work.alt}
                    className="w-full h-auto rounded-xl "
                />
            </div>
        );
    };

    return (
        <section className="max-w-[1300px]  mt-17 md:mt-30 container-centered">
            <h2 className="text-4xl font-bold text-[#2c3a54] mb-6">Наши работы</h2>

            {/* Панель категорий */}
            <div className="flex flex-wrap gap-2 mb-6">
                {["Все", "Одиночные", "Двойные", "В виде креста"].map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 border border-gray-300 rounded-full text-[16px] font-medium transition ${activeCategory === category
                            ? "bg-[#2c3a54] text-white"
                            : "text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div ref={containerRef} className="relative">
                {/* На мобильных — только свайп, без стрелок */}
                {isMobile ? (
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto pb-4 snap-x snap-mandatory"
                        style={{
                            scrollSnapType: "x mandatory",
                            msOverflowStyle: "none",
                            scrollbarWidth: "none",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {filteredWorks.map((work, index) => (
                            <WorkCard key={work.id} work={work} index={index} />
                        ))}
                    </div>
                ) : (
                    // На таблетах и десктопах — со стрелками
                    <>
                        {!isTablet && (
                            <button
                                onClick={scrollLeft}
                                className="absolute left-[-16px] border border-[#2c3a54] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#2c3a54"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                        )}
                        <div
                            ref={sliderRef}
                            className={`flex gap-0 overflow-x-auto pb-4 snap-x snap-mandatory ${!isTablet ? "px-0.5" : ""
                                }`}
                            style={{
                                scrollSnapType: "x mandatory",
                                msOverflowStyle: "none",
                                scrollbarWidth: "none",
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            {filteredWorks.map((work, index) => (
                                <WorkCard key={work.id} work={work} index={index} />
                            ))}
                        </div>
                        {!isTablet && (
                            <button
                                onClick={scrollRight}
                                className="absolute right-[-16px] border border-[#2c3a54] top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#2c3a54"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 6l6 6-6 6" />
                                </svg>
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Кнопка внизу */}
            <div className="mt-10 flex">
                <Link href={'/'} className="font-bold md:min-w-[330px] px-7.5 py-3 bg-[#2c3a54] border border-[#2c3a54] text-white rounded-full hover:bg-white hover:text-[#2c3a54] transition">
                    Смотреть все
                </Link>
            </div>

            {/* Модальное окно */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                    onClick={closeModal} // Закрытие при клике вне изображения
                >
                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()} // Не закрывать при клике на контент
                    >
                        {/* Индикатор текущего слайда (например, "1 / 16") */}
                        <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-70 px-2 py-1 rounded z-10">
                            {currentModalSlide + 1} / {filteredWorks.length}
                        </div>

                        {/* Стрелка влево */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white text-lg sm:text-xl rounded-full hover:bg-opacity-70 transition cursor-pointer"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            {"<"}
                        </button>

                        {/* Стрелка вправо */}
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white text-lg sm:text-xl rounded-full hover:bg-opacity-70 transition cursor-pointer"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            {">"}
                        </button>

                        {/* Изображение */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={filteredWorks[currentModalSlide].src}
                                alt={filteredWorks[currentModalSlide].alt}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Подпись под изображением */}
                        <div className="text-center text-white text-lg font-medium">
                            {filteredWorks[currentModalSlide].alt} {/* или .title, если будете использовать */}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OurWorksSlider;