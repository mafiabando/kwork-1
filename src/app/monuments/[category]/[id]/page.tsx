"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import OurWorksSlider from "../../../components/OurWorksSlider";
import PathPage from "../../../components/PathPage";
import SidebarCatalogMenu from "../../../components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "../../../components/Sidebar/SidebarStickyHelp";
import ProductCard from "../../../components/ProductCard";
import { productsMonuments } from "../../../mock/products";
import { graniteTypes } from "../../../mock/graniteTypes";
import Image from "next/image";
import Tooltip from "@/app/components/Tooltip";
import ModalCommunication from "@/app/components/Modal/ModalCommunication";

interface ImageItem {
    id: number;
    src: string; // Путь к изображению
    alt: string; // Альтернативный текст
    caption?: string; // Опциональный подпись
}

const ProductPage = () => {
    const params = useParams();
    const productId = parseInt(params?.id as string);
    // const categorySlug = params?.category as string;

    // Находим продукт по ID
    const product = productsMonuments.find((p) => p.id === productId);


    // Состояния
    const [selectedColor, setSelectedColor] = useState<{
        name: string;
        image: string;
    } | null>(null);
    const [activeTab, setActiveTab] = useState<
        "characteristics" | "description" | "granite"
    >("characteristics"); // Активная вкладка
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipContent, setTooltipContent] = useState({
        image: "",
        description: "",
    });
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null); // Реф для элемента тултипа
    const characteristicsContentRef = useRef<HTMLDivElement>(null); // Ref для содержимого вкладки "Характеристики"
    const tooltipOpenRef = useRef(tooltipOpen);
    const activeTabRef = useRef(activeTab);
    const [tooltipAbsolutePosition, setTooltipAbsolutePosition] = useState({
        top: 0,
        left: 0,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    // Модальное окно для видов гранита (как на странице /granite)
    const [isGraniteModalOpen, setIsGraniteModalOpen] = useState(false);
    const [currentGraniteSlide, setCurrentGraniteSlide] = useState(0);
    //Модальное окно для готовых работ и примеров оформления
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [currentImageSlide, setCurrentImageSlide] = useState(0);

    const [imageSlides, setImageSlides] = useState<ImageItem[]>([]); // Массив изображений для модалки

    // Закрытие по клику вне модалки
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(e.target as Node) &&
            backdropRef.current &&
            e.target === backdropRef.current
        ) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    // Функция для открытия модалки
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Функция для закрытия модалки
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const nextImageSlide = () => {
        setCurrentImageSlide((prev) => (prev + 1) % imageSlides.length);
    };

    const prevImageSlide = () => {
        setCurrentImageSlide(
            (prev) => (prev - 1 + imageSlides.length) % imageSlides.length
        );
    };


    const nextGraniteSlide = () => {
        setCurrentGraniteSlide((prev) => (prev + 1) % graniteTypes.length);
    };

    const prevGraniteSlide = () => {
        setCurrentGraniteSlide(
            (prev) => (prev - 1 + graniteTypes.length) % graniteTypes.length
        );
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isGraniteModalOpen) return;
            if (e.key === "Escape") {
                closeGraniteModal();
            } else if (e.key === "ArrowLeft") {
                prevGraniteSlide();
            } else if (e.key === "ArrowRight") {
                nextGraniteSlide();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isGraniteModalOpen, nextGraniteSlide, prevGraniteSlide]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isImageModalOpen) return;
            if (e.key === "Escape") {
                closeImageModal();
            } else if (e.key === "ArrowLeft") {
                prevImageSlide();
            } else if (e.key === "ArrowRight") {
                nextImageSlide();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isImageModalOpen, nextImageSlide, prevImageSlide]);

    // Блокировка скролла при открытии модалки
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.pointerEvents = "none";

            const modalBackdrop = document.querySelector(".modal-backdrop");
            if (modalBackdrop) {
                modalBackdrop.parentElement!.style.pointerEvents = "auto";
            }
        } else {
            document.body.style.overflow = "";
            document.body.style.pointerEvents = "";
        }
    }, [isModalOpen]);

    // Закрытие по Esc
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsModalOpen(false);
            }
        };
        if (isModalOpen) {
            window.addEventListener("keydown", handleEsc);
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isModalOpen]);

    // Для адаптивности
    useEffect(() => {
        const checkScreenSize = () => {
            setIsTablet(window.innerWidth < 1024);
            setIsMobile(window.innerWidth < 768);
            setIsNarrowMobile(window.innerWidth < 425);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(product?.id));
    }, [product?.id]);

    // Используем useRef для хранения актуального значения tooltipOpen
    useEffect(() => {
        tooltipOpenRef.current = tooltipOpen;
    }, [tooltipOpen]);

    // Обработчик клика вне, использующий useRef
    useEffect(() => {
        activeTabRef.current = activeTab;
    }, [activeTab]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!tooltipOpenRef.current) return;

            const target = event.target as Node;

            // Единственное исключение: клик по самому тултипу
            if (tooltipRef.current && tooltipRef.current.contains(target)) {
                return;
            }

            // Во ВСЕХ остальных случаях — закрываем
            setTooltipOpen(false);
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Если продукт не найден
    if (!product) {
        return (
            <section className="container-centered mt-5 max-w-[1300px]">
                <div className="w-full lg:ml-5 lg:max-w-[75%]">
                    <PathPage />
                    <h1 className="text-black text-[28px] mt-2.5 mb-5">
                        Товар не найден
                    </h1>
                </div>
            </section>
        );
    }

    // Обработчик клика на звезду (избранное)
    const toggleFavorite = () => {
        const newIsFavorite = !isFavorite;
        setIsFavorite(newIsFavorite);

        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (newIsFavorite) {
            if (!favorites.includes(product.id)) {
                favorites.push(product.id);
                localStorage.setItem('favorites', JSON.stringify(favorites));
            }
        } else {
            const newFavorites = favorites.filter((id: number) => id !== product.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }

        // Отправляем кастомное событие
        window.dispatchEvent(new Event('favoritesChanged'));
    };

    const openGraniteModal = (index: number) => {
        setCurrentGraniteSlide(index);
        setIsGraniteModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    // Компонент для отображения одной характеристики с тултипом
    const CharacteristicItem = ({
        label,
        value,
        tooltipImage,
        tooltipDescription,
    }: {
        label: string;
        value: string;
        tooltipImage?: string;
        tooltipDescription?: string;
    }) => {
        const tooltipTriggerRef = useRef<HTMLSpanElement>(null);

        const handleClick = (e: React.MouseEvent) => {
            if (tooltipImage && tooltipDescription) {
                const element = tooltipTriggerRef.current;
                if (!element) return;

                const parentContainer = characteristicsContentRef.current;
                if (!parentContainer) return;

                const elementRect = element.getBoundingClientRect();
                const parentRect = parentContainer.getBoundingClientRect();

                // Относительная позиция (для позиционирования тултипа внутри контейнера)
                const relativeTop = elementRect.top - parentRect.top;
                const relativeLeft = elementRect.left - parentRect.left;

                // Абсолютная позиция (для расчёта места сверху/снизу)
                const absoluteTop = elementRect.top;
                const absoluteLeft = elementRect.left;

                setTooltipPosition({
                    top: relativeTop - 10,
                    left: relativeLeft + elementRect.width / 2,
                });

                // Передаём абсолютные координаты отдельно
                setTooltipAbsolutePosition({
                    top: absoluteTop,
                    left: absoluteLeft,
                });

                setTooltipContent({
                    image: tooltipImage,
                    description: tooltipDescription,
                });

                const img = new window.Image();
                img.src = tooltipImage;
                img.onload = () => setTooltipOpen(true);
                img.onerror = () => setTooltipOpen(true);
            }
        };

        return (
            <div className="flex justify-between items-center py-2 border-b border-[#969ead]">
                <div className="flex items-center space-x-3">
                    <span className="text-[#2D4266]">{label}</span>
                    {tooltipImage && tooltipDescription && (
                        <span
                            className="text-[#969ead] text-xs font-bold border-1 border-[#969ead] hover:border-[#2c3a54] hover:text-[#2c3a54] rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                            ref={tooltipTriggerRef}
                            onClick={handleClick}
                        >
                            ?
                        </span>
                    )}
                </div>
                <span className="text-[#2D4266]">{value}</span>
            </div>
        );
    };

    // Выбираем изображение для отображения
    const displayImage = selectedColor ? selectedColor.image : product.image;

    // Получаем список похожих товаров (6 рандомных из той же категории)
    const similarProducts = productsMonuments
        .filter((p) => p.category === product.category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

    const closeGraniteModal = () => {
        setIsGraniteModalOpen(false);
        document.body.style.overflow = "auto";
    };


    const openImageModal = (index: number, type: "work" | "example") => {
        // Подготовьте массив изображений в зависимости от типа
        const slides: ImageItem[] =
            type === "work"
                ? [
                    { id: 1, src: "/single/work1.webp", alt: "Готовая работа 1" },
                    { id: 2, src: "/single/work2.webp", alt: "Готовая работа 2" },
                ]
                : [
                    {
                        id: 1,
                        src: "/single/example1.webp",
                        alt: "Пример оформления 1",
                        caption:
                            "Гравировка портрета A4, текста (ФИО, даты, памятная надпись), крестика",
                    },
                    {
                        id: 2,
                        src: "/single/example2.webp",
                        alt: "Пример оформления 2",
                        caption:
                            "Гравировка портрета, текст (ФИО, даты, памятная надпись), крест - сусальное золото или золотая краска+ бронзовые буквы",
                    },
                    {
                        id: 3,
                        src: "/single/example3.webp",
                        alt: "Пример оформления 3",
                        caption:
                            "Медальон в нише, текст (ФИО, даты, памятная надпись), крест - сусальное золото или золотая краска",
                    },
                    {
                        id: 4,
                        src: "/single/example4.webp",
                        alt: "Пример оформления 4",
                        caption:
                            "Медальон в рамке, текст (ФИО, даты), крест - итальянская бронза Caggiati",
                    },
                ];

        setImageSlides(slides);
        setCurrentImageSlide(index);
        setIsImageModalOpen(true);
        document.body.style.overflow = "hidden";
    };


    // Обработчик отправки формы
    const handleModalSubmit = (formData: { name: string; phone: string }) => {
        // Здесь можно обработать данные формы, например, отправить на сервер
        console.log("Данные формы:", formData);
        alert(
            `Форма отправлена! Имя: ${formData.name}, Телефон: ${formData.phone} (реализация отправки на сервер позже)`
        );
        closeModal(); // Закрываем модалку после отправки
    };

    // Компонент для слайдера цветов (для мобильных устройств)
    const ColorSlider = ({ colors, selectedColor, onSelectColor }: { colors: { name: string; image: string }[]; selectedColor: { name: string; image: string } | null; onSelectColor: (color: { name: string; image: string } | null) => void }) => {
        const sliderRef = useRef<HTMLDivElement>(null);
        const startX = useRef(0);
        const isDragging = useRef(false);

        const handleMouseDown = (e: React.MouseEvent) => {
            isDragging.current = true;
            startX.current = e.clientX;
            if (sliderRef.current) {
                sliderRef.current.style.cursor = "grabbing";
            }
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            if (sliderRef.current) {
                sliderRef.current.style.cursor = "grab";
            }
        };

        const handleMouseMove = (e: React.MouseEvent) => {
            if (!isDragging.current || !sliderRef.current) return;
            const deltaX = e.clientX - startX.current;
            sliderRef.current.scrollLeft -= deltaX;
            startX.current = e.clientX;
        };

        const handleTouchStart = (e: React.TouchEvent) => {
            isDragging.current = true;
            startX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            isDragging.current = false;
        };

        const handleTouchMove = (e: React.TouchEvent) => {
            if (!isDragging.current || !sliderRef.current) return;
            const deltaX = e.touches[0].clientX - startX.current;
            sliderRef.current.scrollLeft -= deltaX;
            startX.current = e.touches[0].clientX;
        };

        return (
            <div className="relative">
                {/* Заголовок */}
                <h3 className="text-[16px] text-[#222222]">Выберите материал:</h3>

                {/* Название выбранного цвета */}
                <p className="text-[14px] text-[#969ead] mb-1">
                    {selectedColor ? selectedColor.name : "Габбро Карелия"}
                </p>

                {/* Слайдер */}
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto scrollbar-hide py-2 gap-2"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                    style={{
                        cursor: "grab",
                        scrollSnapType: "x mandatory",
                    }}
                >
                    {/* Дефолтный цвет (базовое изображение) */}
                    <div
                        key="default"
                        onClick={() => onSelectColor(null)}
                        className={`w-[calc(25%-8px)] aspect-3/2 flex-shrink-0 rounded-lg border-2 transition ${selectedColor === null
                            ? "border-[#2c3a54]"
                            : "border-gray-300 hover:border-[#2c3a54]"
                            }`}
                        style={{
                            backgroundImage: `url(${product.image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                        aria-label="Габбро Карелия"
                    />

                    {/* Цвета из массива */}
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => onSelectColor(color)}
                            className={`w-[calc(25%-8px)] aspect-3/2 flex-shrink-0 rounded-lg border-2 transition ${selectedColor?.name === color.name
                                ? "border-[#2c3a54]"
                                : "border-gray-300 hover:border-[#2c3a54]"
                                }`}
                            style={{
                                backgroundImage: `url(${color.image})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                            aria-label={color.name}
                        />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <section className="container-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <PathPage />
                    <h1 className="text-black text-[24px] md:text-[28px] mt-2.5 mb-5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">
                        {product.name}
                    </h1>

                    {/* Основной контент карточки */}
                    <div className={`mb-7.5 font-[600] ${isMobile ? 'block' : 'flex p-5'}`}>
                        {/* Изображение */}
                        {/* Изображение */}
                        <div className="relative max-w-[523px] md:w-7/12 mx-auto">
                            {/* Плашка скидки */}
                            {product.discount !== undefined && (
                                <div className="absolute top-2 left-2 z-10 bg-[#cd5554] text-white text-xs font-bold px-2.5 py-0.75 rounded">
                                    Сегодня -{product.discount}%
                                </div>
                            )}

                            {/* Звезда (избранное) */}
                            <div
                                className={`absolute top-12 left-2 z-10 w-11 h-11 text-center content-center flex-wrap text-2xl shadow-xs rounded-full hover:text-[#2c3a54] transition cursor-pointer ${isFavorite ? "text-[#2c3a54]" : "text-gray-400"
                                    }`}
                                onClick={toggleFavorite}
                            >
                                ★
                            </div>

                            <img
                                src={displayImage}
                                alt={product.name}
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        </div>

                        {/* Блок с информацией о товаре */}
                        <div className={`${isMobile ? 'w-full' : 'flex flex-col w-5/12'}`}>
                            <div className={`${isMobile ? "mb-5" : 'bg-[#f5f6fa] p-5 rounded-lg mb-5'}`}>
                                {/* Блок выбора цвета */}
                                {product.colors && (
                                    <div className="mb-2 md:mb-5">
                                        {isMobile ? (
                                            <ColorSlider
                                                colors={product.colors}
                                                selectedColor={selectedColor}
                                                onSelectColor={(color) => setSelectedColor(color)}
                                            />
                                        ) : (
                                            <>
                                                <h3 className="text-[16px] text-[#222222]">Выберите материал:</h3>
                                                <p className="text-[14px] text-[#969ead]">
                                                    {selectedColor ? selectedColor.name : "Габбро Карелия"}
                                                </p>
                                                <div className="flex flex-wrap mt-3 gap-2">
                                                    <button
                                                        key="default"
                                                        onClick={() => setSelectedColor(null)}
                                                        className={`w-1/4 aspect-square rounded-lg border-2 transition ${selectedColor === null
                                                            ? "border-[#2c3a54] bg-[#f5f6fa]"
                                                            : "border-gray-300 hover:border-[#2c3a54]"
                                                            }`}
                                                        style={{
                                                            backgroundImage: `url(${product.image})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                        }}
                                                        aria-label="Габбро Карелия"
                                                    />
                                                    {product.colors.map((color, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => setSelectedColor(color)}
                                                            className={`w-1/4 aspect-square rounded-lg border-2 transition ${selectedColor?.name === color.name
                                                                ? "border-[#2c3a54] bg-[#f5f6fa]"
                                                                : "border-gray-300 hover:border-[#2c3a54]"
                                                                }`}
                                                            style={{
                                                                backgroundImage: `url(${color.image})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                            }}
                                                            aria-label={color.name}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Цена */}
                                <div className="mb-5">
                                    <span className="text-[#2c3a54]">Цена:</span>
                                    <div className="flex space-x-2">
                                        {product.oldPrice && (
                                            <p className="text-3xl font-bold text-[#cd5554]">
                                                {product.price} руб.
                                            </p>
                                        )}
                                        <p className="text-gray-500 line-through mb-1 self-end">
                                            {product.oldPrice} руб.
                                        </p>
                                    </div>
                                </div>

                                {/* Кнопки */}
                                <div className="space-y-2.5 mb-5">
                                    <button
                                        className="w-full py-3 bg-[#2c3a54] text-white rounded-full font-bold hover:bg-[#1a273b] transition"
                                        onClick={openModal}
                                    >
                                        Заказать
                                    </button>
                                </div>
                            </div>

                            {/* Блок с иконками и текстом */}
                            <div className={`max-w-[550px] ${isMobile ? 'flex flex-wrap gap-y-3' : 'flex flex-wrap gap-y-5'}`}>
                                <div className={`flex w-1/2 items-center space-x-2`}>
                                    <Image src="/guarantee.svg" width={24} height={24} alt="Гарантия 10 лет" />
                                    <span className="text-[12px] text-[#2D4266]">Гарантия 10 лет</span>
                                </div>
                                <div className={`flex w-1/2 items-center space-x-2`}>
                                    <Image src="/3d.svg" width={24} height={24} alt="Бесплатный 3D эскиз" />
                                    <span className="text-[12px] text-[#2D4266]">Бесплатный 3D эскиз</span>
                                </div>
                                <div className={`flex w-1/2 items-center space-x-2`}>
                                    <Image src="/credit.svg" width={24} height={24} alt="Рассрочка платежа" />
                                    <span className="text-[12px] text-[#2D4266]">Рассрочка платежа</span>
                                </div>
                                <div className={`flex w-1/2 items-center space-x-2`}>
                                    <Image src="/safe.svg" width={24} height={24} alt="Бесплатное хранение" />
                                    <span className="text-[12px] text-[#2D4266]">Бесплатное хранение</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Вкладки: Характеристики, Описание, Варианты гранита */}
                    <div className="border-b border-gray-200 mb-5">
                        <div className="flex space-x-4 md:space-x-6 text-[14px] md:text-[16px]">
                            <button
                                onClick={() => setActiveTab("characteristics")}
                                className={`pb-2 font-bold text-[#2c3a54] hover:no-underline ${activeTab === "characteristics"
                                    ? ""
                                    : "decoration-dashed decoration-[0.5px] underline underline-offset-4"
                                    }`}
                            >
                                Характеристики
                            </button>
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`pb-2 font-bold text-[#2c3a54] hover:no-underline ${activeTab === "description"
                                    ? ""
                                    : "decoration-dashed decoration-[0.5px] underline underline-offset-4"
                                    }`}
                            >
                                Описание
                            </button>
                            <button
                                onClick={() => setActiveTab("granite")}
                                className={`pb-2 font-bold text-[#2c3a54] hover:no-underline ${activeTab === "granite"
                                    ? ""
                                    : "decoration-dashed decoration-[0.5px] underline underline-offset-4"
                                    }`}
                            >
                                Варианты гранита
                            </button>
                        </div>
                    </div>

                    {/* Контент вкладок */}
                    <div className="mb-7.5 font-[600]">
                        {activeTab === "characteristics" && (
                            <div>
                                {product.options && Object.keys(product.options).length > 0 ? (
                                    <div
                                        className="space-y-1 relative"
                                        ref={characteristicsContentRef}
                                    >
                                        {Object.entries(product.options).map(([key, value]) => (
                                            <CharacteristicItem
                                                key={key}
                                                label={key}
                                                value={value}
                                                tooltipImage={
                                                    key === "Общая высота"
                                                        ? "/single/height.webp"
                                                        : key === "Общая ширина"
                                                            ? "/single/width.webp"
                                                            : key === "Стела"
                                                                ? "/single/stela.webp"
                                                                : undefined
                                                }
                                                tooltipDescription={
                                                    key === "Общая высота"
                                                        ? "Высота от нижней до верхней точки памятника"
                                                        : key === "Общая ширина"
                                                            ? "Ширина памятника по крайним точкам"
                                                            : key === "Стела"
                                                                ? "Размеры стелы памятника"
                                                                : undefined
                                                }
                                            />
                                        ))}
                                        <Tooltip
                                            isOpen={tooltipOpen}
                                            image={tooltipContent.image}
                                            description={tooltipContent.description}
                                            position={tooltipPosition}
                                            ref={tooltipRef}
                                            absolutePosition={tooltipAbsolutePosition}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-[#2D4266]">Характеристики не указаны.</p>
                                )}
                            </div>
                        )}

                        {activeTab === "description" && (
                            <div>
                                <p className="text-[#2D4266]">
                                    {product.name} — это качественный памятник, изготовленный из
                                    натурального гранита. Он отличается прочностью, долговечностью
                                    и эстетической привлекательностью. Памятник подойдет для
                                    обустройства могилы близкого человека и станет символом памяти
                                    и уважения.
                                </p>
                                {/* Добавьте больше текста по необходимости */}
                            </div>
                        )}

                        {activeTab === "granite" && (
                            <div>
                                <p className="text-[#2D4266] mb-5">
                                    Данный памятник можно изготовить более чем из 20 видов
                                    гранита.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
                                    {graniteTypes.map((type, index) => (
                                        <div
                                            key={type.id}
                                            className="flex flex-col space-y-2 cursor-pointer px-2.5 hover:opacity-80 duration-500"
                                            onClick={() => openGraniteModal(index)}
                                        >
                                            <img
                                                src={type.image}
                                                alt={type.name}
                                                className="w-full h-auto object-cover rounded-lg"
                                            />
                                            <p className="text-[14px] text-[#6B809E]">{type.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Готовые работы с этим товаром */}
                    <div className="mb-7.5">
                        <h2 className="text-[28px] font-[600] text-[#2D4266] mb-5">
                            Готовые работы с этим товаром
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            {/* Пример: 2 фото готовых работ */}
                            {[1, 2].map((id) => (
                                <div
                                    key={id}
                                    className="cursor-pointer group overflow-hidden rounded-lg"
                                    onClick={() => openImageModal(id - 1, "work")} // Передаем индекс (0-based) и тип "work"
                                >
                                    <img
                                        src={`/single/work${id}.webp`} // Замените на реальные пути
                                        alt={`Готовая работа ${id}`}
                                        className="w-full h-auto object-cover rounded-lg group-hover:brightness-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Примеры оформления */}
                    <div className="mb-7.5">
                        <h2 className="text-[28px] font-[600] text-[#2D4266] mb-5">
                            Примеры оформления
                        </h2>
                        <p className="text-[#2D4266] mb-5">
                            На фото представлены классические варианты оформления памятников.
                            При оформлении договора можно выбрать любой из вариантов нанесения
                            портрета и текста (в том числе размер портрета, размер текста, тип
                            шрифта, дополнительные рисунки и т.д.).
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {/* Пример: 4 варианта оформления */}
                            {[1, 2, 3, 4].map((id) => (
                                <div
                                    key={id}
                                    className="cursor-pointer group overflow-hidden rounded-lg"
                                    onClick={() => openImageModal(id - 1, "example")} // Передаем индекс (0-based) и тип "example"
                                >
                                    <img
                                        src={`/single/example${id}.webp`} // Замените на реальные пути
                                        alt={`Пример оформления ${id}`}
                                        className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <p className="text-[12px] text-[#2D4266] mt-2 text-center">
                                        {imageSlides[currentImageSlide]?.caption || // Отображение подписи, если модалка открыта
                                            (id === 1
                                                ? "Гравировка портрета A4, текста (ФИО, даты, памятная надпись), крестика"
                                                : id === 2
                                                    ? "Гравировка портрета, текст (ФИО, даты, памятная надпись), крест - сусальное золото или золотая краска+ бронзовые буквы"
                                                    : id === 3
                                                        ? "Медальон в нише, текст (ФИО, даты, памятная надпись), крест - сусальное золото или золотая краска"
                                                        : "Медальон в рамке, текст (ФИО, даты), крест - итальянская бронза Caggiati")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Похожие товары */}
                    <div className="mb-7.5">
                        <h2 className="text-[28px] font-[600] text-[#2D4266] mb-5">
                            Похожие товары
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3">
                            {similarProducts.map((similarProduct) => (
                                <ProductCard
                                    key={similarProduct.id}
                                    product={similarProduct}
                                    isTablet={isTablet}
                                    isMobile={isMobile}
                                    isNarrowMobile={isNarrowMobile}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* OurWorksSlider внизу страницы */}
            <div className="mb-22.5">
                <OurWorksSlider />
            </div>

            {/* Модальное окно */}
            <ModalCommunication
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
            />

            {/* Модальное окно для видов гранита */}
            {isGraniteModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                    onClick={closeGraniteModal}
                >
                    <div
                        className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Индикатор текущего слайда */}
                        <div className="fixed top-4 left-4 text-white text-sm bg-black bg-opacity-70 px-2 py-1 rounded z-10">
                            {currentGraniteSlide + 1} / {graniteTypes.length}
                        </div>

                        {/* Стрелка влево */}
                        <button
                            onClick={prevGraniteSlide}
                            className="absolute left-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white text-lg sm:text-xl rounded-full hover:bg-opacity-70 transition cursor-pointer"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            {"<"}
                        </button>

                        {/* Стрелка вправо */}
                        <button
                            onClick={nextGraniteSlide}
                            className="absolute right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white text-lg sm:text-xl rounded-full hover:bg-opacity-70 transition cursor-pointer"
                            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            {">"}
                        </button>

                        {/* Изображение */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={graniteTypes[currentGraniteSlide].image}
                                alt={graniteTypes[currentGraniteSlide].name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Подпись под изображением */}
                        <div className="text-center text-white text-lg font-medium mt-2">
                            {graniteTypes[currentGraniteSlide].name}
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно для готовых работ и примеров оформления */}
            {isImageModalOpen &&
                imageSlides.length > 0 && ( // Убедитесь, что массив не пуст
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                        onClick={closeImageModal}
                    >
                        <div
                            className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Индикатор текущего слайда */}
                            <div className="fixed top-4 left-4 text-white text-sm bg-black bg-opacity-70 px-2 py-1 rounded z-10">
                                {currentImageSlide + 1} / {imageSlides.length}
                            </div>

                            {/* Стрелка влево */}
                            <button
                                onClick={prevImageSlide}
                                className="absolute left-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white text-lg sm:text-xl rounded-full hover:bg-opacity-70 transition cursor-pointer"
                                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                            >
                                {"<"}
                            </button>

                            {/* Стрелка вправо */}
                            <button
                                onClick={nextImageSlide}
                                className="absolute right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white text-lg sm:text-xl rounded-full hover:bg-opacity-70 transition cursor-pointer"
                                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                            >
                                {">"}
                            </button>

                            {/* Изображение */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={imageSlides[currentImageSlide].src}
                                    alt={imageSlides[currentImageSlide].alt}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>

                            {/* Подпись под изображением (если есть) */}
                            {imageSlides[currentImageSlide].caption && (
                                <div className="text-center text-white text-lg font-medium mt-2">
                                    {imageSlides[currentImageSlide].caption}
                                </div>
                            )}
                        </div>
                    </div>
                )}
        </>
    );
};

export default ProductPage;
