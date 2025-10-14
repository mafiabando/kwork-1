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

const ProductPage = () => {
    const params = useParams();
    const productId = parseInt(params?.id as string);
    // const categorySlug = params?.category as string;

    // Находим продукт по ID
    const product = productsMonuments.find(p => p.id === productId);

    // Если продукт не найден
    if (!product) {
        return (
            <section className="container-centered mt-5 max-w-[1300px]">
                <div className="w-full lg:ml-5 lg:max-w-[75%]">
                    <PathPage />
                    <h1 className="text-black text-[28px] mt-2.5 mb-5">Товар не найден</h1>
                </div>
            </section>
        );
    }

    // Состояния
    const [isClient, setIsClient] = useState(false);
    const [selectedColor, setSelectedColor] = useState<{ name: string; image: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'characteristics' | 'description' | 'granite'>('characteristics'); // Активная вкладка
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipContent, setTooltipContent] = useState({ image: '', description: '' });
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

    // Компонент для отображения одной характеристики с тултипом
    const CharacteristicItem = ({ label, value, tooltipImage, tooltipDescription }: { label: string; value: string; tooltipImage?: string; tooltipDescription?: string }) => {
        const tooltipRef = useRef<HTMLDivElement>(null); // Реф для элемента тултипа

        // Внутри ProductPage, в определении CharacteristicItem

        const handleMouseEnter = (e: React.MouseEvent) => {
            if (tooltipImage && tooltipDescription) {
                const element = tooltipRef.current; // Получаем DOM-элемент ?
                if (!element) return;

                // Получаем родительский элемент с position: relative
                const parentContainer = element.closest('.space-y-1.relative') as HTMLElement | null;
                if (!parentContainer) return;

                // Получаем координаты элемента ? относительно вьюпорта
                const elementRect = element.getBoundingClientRect();
                // Получаем координаты родительского контейнера относительно вьюпорта
                const parentRect = parentContainer.getBoundingClientRect();

                // Рассчитываем координаты элемента ? относительно родительского контейнера
                const relativeTop = elementRect.top - parentRect.top;
                const relativeLeft = elementRect.left - parentRect.left;

                // Устанавливаем позицию тултипа относительно родительского контейнера
                // Верхняя граница элемента ? (relativeTop) минус небольшой отступ сверху
                // Центр элемента ? по горизонтали (relativeLeft + elementRect.width / 2)
                setTooltipPosition({
                    top: relativeTop - 10, // Немного выше элемента
                    left: relativeLeft + elementRect.width / 2, // Центр элемента
                });
                setTooltipContent({ image: tooltipImage, description: tooltipDescription });
                setTooltipOpen(true);
            }
        };

        const handleMouseLeave = () => {
            setTooltipOpen(false);
        };

        return (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <span className="text-[#2D4266]">{label}</span>
                    {tooltipImage && tooltipDescription && (
                        <span
                            className="text-[#2D4266] text-xs font-bold bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center cursor-default"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            ref={tooltipRef} // Привязываем ref к элементу ?
                        >
                            ?
                        </span>
                    )}
                </div>
                <span className="text-[#2D4266] font-medium">{value}</span>
            </div>
        );
    };

    // Для адаптивности и гидратации
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Выбираем изображение для отображения
    const displayImage = selectedColor ? selectedColor.image : product.image;

    // Получаем список похожих товаров (6 рандомных из той же категории)
    const similarProducts = productsMonuments
        .filter(p => p.category === product.category && p.id !== product.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);

    // Модальное окно для видов гранита (как на странице /granite)
    const [isGraniteModalOpen, setIsGraniteModalOpen] = useState(false);
    const [currentGraniteSlide, setCurrentGraniteSlide] = useState(0);

    const openGraniteModal = (index: number) => {
        setCurrentGraniteSlide(index);
        setIsGraniteModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeGraniteModal = () => {
        setIsGraniteModalOpen(false);
        document.body.style.overflow = "auto";
    };

    const nextGraniteSlide = () => {
        setCurrentGraniteSlide((prev) => (prev + 1) % graniteTypes.length);
    };

    const prevGraniteSlide = () => {
        setCurrentGraniteSlide((prev) => (prev - 1 + graniteTypes.length) % graniteTypes.length);
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

    return (
        <>
            <section className="container-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <div className="ml-2.5 lg:ml-0"><PathPage /></div>
                    <h1 className="text-black text-[28px] mt-2.5 mb-5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">{product.name}</h1>

                    {/* Основной контент карточки */}
                    <div className="flex mb-7.5 font-[600] p-5">
                        {/* Изображение */}
                        <div className="relative w-7/12">
                            <img
                                src={displayImage}
                                alt={product.name}
                                className="w-full h-auto object-contain rounded-lg"
                            />
                        </div>

                        {/* Блок с информацией о товаре */}
                        <div className="flex flex-col w-5/12">
                            <div className="bg-[#f5f6fa] p-5 rounded-lg mb-5">
                                {/* Блок выбора цвета */}
                                {product.colors && (
                                    <div className="mb-5">
                                        <h3 className="text-[16px] text-[#222222]">Выберите материал:</h3>

                                        {/* Название выбранного цвета */}
                                        <p className="text-[14px] text-[#969ead]">
                                            {selectedColor
                                                ? selectedColor.name
                                                : "Габбро Карелия"}
                                        </p>

                                        <div className="flex flex-wrap mt-3 gap-2">
                                            {/* Дефолтный цвет (базовое изображение) */}
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

                                            {/* Цвета из массива */}
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
                                    </div>
                                )}

                                {/* Цена */}
                                <div className="mb-5">
                                    <span className="text-[#2c3a54]">Цена</span>
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
                                    <button className="w-full py-3 bg-[#2c3a54] text-white rounded-lg font-bold hover:bg-[#1a273b] transition">
                                        Заказать
                                    </button>
                                    {/* Кнопка "Написать в Вайбер" не нужна, поэтому её нет */}
                                </div>
                            </div>
                            {/* Блок с иконками и текстом */}
                            <div className="flex flex-wrap gap-y-5">
                                <div className="flex w-1/2 items-center space-x-2">
                                    <Image src='/guarantee.svg' width={24} height={24} alt='Гарантия 10 лет' />
                                    <span className="text-[12px] text-[#2D4266]">Гарантия 10 лет</span>
                                </div>
                                <div className="flex w-1/2 items-center space-x-2">
                                    <Image src='/3d.svg' width={24} height={24} alt='Бесплатный 3D эскиз' />
                                    <span className="text-[12px] text-[#2D4266]">Бесплатный 3D эскиз</span>
                                </div>
                                <div className="flex w-1/2 items-center space-x-2">
                                    <Image src='/credit.svg' width={24} height={24} alt='Рассрочка платежа' />
                                    <span className="text-[12px] text-[#2D4266]">Рассрочка платежа</span>
                                </div>
                                <div className="flex w-1/2 items-center space-x-2">
                                    <Image src='/safe.svg' width={24} height={24} alt='Бесплатное хранение' />
                                    <span className="text-[12px] text-[#2D4266]">Бесплатное хранение</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Вкладки: Характеристики, Описание, Варианты гранита */}
                    <div className="border-b border-gray-200 mb-5">
                        <div className="flex space-x-6">
                            <button
                                onClick={() => setActiveTab('characteristics')}
                                className={`pb-2 font-bold text-[16px] ${activeTab === 'characteristics' ? 'border-b-2 border-[#2c3a54] text-[#2c3a54]' : 'text-[#6B809E] hover:text-[#2c3a54]'}`}
                            >
                                Характеристики
                            </button>
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`pb-2 font-bold text-[16px] ${activeTab === 'description' ? 'border-b-2 border-[#2c3a54] text-[#2c3a54]' : 'text-[#6B809E] hover:text-[#2c3a54]'}`}
                            >
                                Описание
                            </button>
                            <button
                                onClick={() => setActiveTab('granite')}
                                className={`pb-2 font-boldF text-[16px] ${activeTab === 'granite' ? 'border-b-2 border-[#2c3a54] text-[#2c3a54]' : 'text-[#6B809E] hover:text-[#2c3a54]'}`}
                            >
                                Варианты гранита
                            </button>
                        </div>
                    </div>

                    {/* Контент вкладок */}
                    <div className="mb-7.5 font-[600]">
                        {activeTab === 'characteristics' && (
                            <div>
                                {product.options && Object.keys(product.options).length > 0 ? (
                                    <div className="space-y-1 relative">
                                        {Object.entries(product.options).map(([key, value]) => (
                                            <CharacteristicItem
                                                key={key}
                                                label={key}
                                                value={value}
                                                tooltipImage={
                                                    key === "Общая высота" ? "/info/height.webp" :
                                                        key === "Общая ширина" ? "/info/width.webp" :
                                                            key === "Стела" ? "/info/stela.webp" :
                                                                undefined
                                                }
                                                tooltipDescription={
                                                    key === "Общая высота" ? "Высота от нижней до верхней точки памятника" :
                                                        key === "Общая ширина" ? "Ширина памятника по крайним точкам" :
                                                            key === "Стела" ? "Размеры стелы памятника" :
                                                                undefined
                                                }
                                            />
                                        ))}
                                        <Tooltip
                                            isOpen={tooltipOpen}
                                            image={tooltipContent.image}
                                            description={tooltipContent.description}
                                            position={tooltipPosition}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-[#2D4266]">Характеристики не указаны.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'description' && (
                            <div>
                                <p className="text-[#2D4266]">
                                    {product.name} — это качественный памятник, изготовленный из натурального гранита. Он отличается прочностью, долговечностью и эстетической привлекательностью. Памятник подойдет для обустройства могилы близкого человека и станет символом памяти и уважения.
                                </p>
                                {/* Добавьте больше текста по необходимости */}
                            </div>
                        )}

                        {activeTab === 'granite' && (
                            <div>
                                <p className="text-[#2D4266] mb-5">
                                    Данный памятник можно изготовить более чем из 20 видов гранита.
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
                        <h2 className="text-[28px] font-[600] text-[#2D4266] mb-5">Готовые работы с этим товаром</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            {/* Пример: 2 фото готовых работ */}
                            {[1, 2].map((id) => (
                                <div
                                    key={id}
                                    className="cursor-pointer group overflow-hidden rounded-lg"
                                    onClick={() => openGraniteModal(id)} // Используем ту же модалку для демонстрации
                                >
                                    <img
                                        src={`/works/work-${id}.webp`} // Замените на реальные пути
                                        alt={`Готовая работа ${id}`}
                                        className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Примеры оформления */}
                    <div className="mb-7.5">
                        <h2 className="text-[28px] font-[600] text-[#2D4266] mb-5">Примеры оформления</h2>
                        <p className="text-[#2D4266] mb-5">
                            На фото представлены классические варианты оформления памятников. При оформлении договора можно выбрать любой из вариантов нанесения портрета и текста (в том числе размер портрета, размер текста, тип шрифта, дополнительные рисунки и т.д.).
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {/* Пример: 4 варианта оформления */}
                            {[1, 2, 3, 4].map((id) => (
                                <div
                                    key={id}
                                    className="cursor-pointer group overflow-hidden rounded-lg"
                                    onClick={() => openGraniteModal(id)} // Используем ту же модалку для демонстрации
                                >
                                    <img
                                        src={`/examples/example-${id}.webp`} // Замените на реальные пути
                                        alt={`Пример оформления ${id}`}
                                        className="w-full h-auto object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <p className="text-[12px] text-[#2D4266] mt-2 text-center">
                                        {id === 1 ? "Гравировка портрета A4, текста (ФИО, даты, памятная надпись), крестика" :
                                            id === 2 ? "Гравировка портрета, текст (ФИО, даты, памятная надпись), крест - сусальное золото или золотая краска+ бронзовые буквы" :
                                                id === 3 ? "Медальон в нише, текст (ФИО, даты, памятная надпись), крест - сусальное золото или золотая краска" :
                                                    "Медальон в рамке, текст (ФИО, даты), крест - итальянская бронза Caggiati"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Похожие товары */}
                    <div className="mb-7.5">
                        <h2 className="text-[28px] font-[600] text-[#2D4266] mb-5">Похожие товары</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                            {similarProducts.map((similarProduct) => (
                                <ProductCard
                                    key={similarProduct.id}
                                    product={similarProduct}
                                    isTablet={false}
                                    isMobile={false}
                                    isNarrowMobile={false}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* OurWorksSlider внизу страницы */}
            < div className="mb-22.5" >
                <OurWorksSlider />
            </div >

            {/* Модальное окно для видов гранита */}
            {
                isGraniteModalOpen && (
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
                )
            }


        </>
    );
};

export default ProductPage;