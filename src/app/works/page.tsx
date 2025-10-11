"use client";
import { useEffect, useState } from "react";
import OurWorksSlider from "../components/OurWorksSlider";
import PathPage from "../components/PathPage";
import SidebarCatalogMenu from "../components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "../components/Sidebar/SidebarStickyHelp";
import Pagination from "../components/Pagination";
import { works } from "../mock/works";
import Blog from "../components/Blog";

// Функция для получения работ для конкретной страницы
const getWorksForPage = (cards: typeof works, page: number, worksPerPage = 24) => {
    const startIndex = (page - 1) * worksPerPage;
    return cards.slice(startIndex, startIndex + worksPerPage);
};

const OurWorksPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState("Все работы");
    // Состояние для модального окна
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalSlide, setCurrentModalSlide] = useState(0);

    // Фильтруем работы по категории
    const filteredWorks = activeCategory === "Все работы"
        ? works
        : works.filter(work => work.category === activeCategory);

    const totalPages = Math.ceil(filteredWorks.length / 24); // Рассчитываем общее количество страниц

    // Получаем работы для текущей страницы ИЗ ОТФИЛЬТРОВАННОГО МАССИВА
    const currentWorks = getWorksForPage(filteredWorks, currentPage);

    // Функция для открытия модального окна
    const openModal = (index: number) => {
        // Индекс в массиве filteredWorks
        setCurrentModalSlide(index);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"; // Блокируем скролл
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto"; // Возвращаем скролл
    };

    // Функции для навигации в модалке
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

    return (
        <>
            <section className="container-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <PathPage />
                    <h1 className="text-black text-[28px] mt-2.5 mb-5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Наши работы</h1>

                    {/* Панель категорий */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {["Все работы", "Одиночные", "Двойные", "В виде креста"].map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setCurrentPage(1); // Сбрасываем на первую страницу при смене категории
                                }}
                                className={`px-4 py-2 border border-gray-300 rounded-full text-[16px] font-medium transition ${activeCategory === category
                                    ? "bg-[#2c3a54] text-white"
                                    : "text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Сетка работ */}
                    <div className="grid grid-cols-2 md:grid-cols-3 space-y-2.5 mb-7.5">
                        {currentWorks.map((work) => (
                            <div
                                key={work.id}
                                className="block overflow-hidden rounded-lg cursor-pointer hover:opacity-80 duration-500"
                                onClick={() => openModal(
                                    // Индекс в массиве filteredWorks
                                    filteredWorks.findIndex(w => w.id === work.id)
                                )}
                            >
                                <img
                                    src={work.image}
                                    alt={`Работа ${work.id}`}
                                    className="w-full h-auto object-cover px-1.25"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Пагинация */}
                    <Pagination
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        initialPage={1}
                    />
                </div>
            </section>

            {/* Blog внизу страницы */}
            <div className="mb-15 md:mb-22.5">
                <Blog />
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
                        <div className="fixed top-4 left-4 text-white text-sm bg-black bg-opacity-70 px-2 py-1 rounded z-10">
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
                                src={filteredWorks[currentModalSlide].image}
                                alt={`Работа ${filteredWorks[currentModalSlide].id}`}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Подпись под изображением (опционально) */}
                        <div className="text-center text-white text-lg font-medium mt-2">
                            {filteredWorks[currentModalSlide].category}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OurWorksPage;