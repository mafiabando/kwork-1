"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { ColorOption, Product } from "../types/types";
import { products  } from "../mock/products";

const RelatedProductsSlider = () => {
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Все");

  // Для адаптивности
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsTablet(width < 1200);
      setIsMobile(width < 768);
      setIsNarrowMobile(width < 420)
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Функции для навигации слайдера (скролл на ширину 4 карточек на десктопе)
  const getVisibleCards = () => (isTablet ? 1 : 4); // На десктопе 4, на мобиле 1 (адаптируем позже)
  const getSlideWidth = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const visibleCards = getVisibleCards();
    return containerWidth / visibleCards; // Ширина одной карточки = контейнер / visible
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const slideWidth = getSlideWidth();
      const scrollAmount = slideWidth * getVisibleCards(); // По 4 карточки (или по visible на мобиле)
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

  // Компонент карточки товара
  const ProductCard = ({ product }: { product: Product }) => {
    const [hoveredColorIndex, setHoveredColorIndex] = useState(0); // 0 = дефолт
    const [showIndicators, setShowIndicators] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0); // 0 = дефолт
    const imageRef = useRef<HTMLDivElement>(null);

    // Расширенный массив — 0 = дефолт, 1+ = цвета
    const expandedColors: ColorOption[] = [
      { name: "Дефолт", color: "#808080", image: product.image },
      ...product.colors,
    ];

    // Изображение для отображения
    const displayImage = isTablet
      ? expandedColors[selectedColorIndex]?.image
      : expandedColors[hoveredColorIndex]?.image;

    // Есть ли скидка
    const hasDiscount = product.oldPrice !== undefined;

    // Обработчик свайпа по изображению (адаптирован из вашего кода)
    const handleTouchStartImage = (e: React.TouchEvent) => {
      if (isTablet) {
        const startX = e.touches[0].clientX;
        const startY = e.touches[0].clientY;
        const onTouchMoveImg = (e: TouchEvent) => {
          const deltaX = e.touches[0].clientX - startX;
          const deltaY = e.touches[0].clientY - startY;
          if (Math.abs(deltaY) > Math.abs(deltaX)) return;
          e.preventDefault();
        };
        const onTouchEndImg = (e: TouchEvent) => {
          document.removeEventListener("touchmove", onTouchMoveImg);
          document.removeEventListener("touchend", onTouchEndImg);
          const deltaX = e.changedTouches[0].clientX - startX;
          if (Math.abs(deltaX) > 50) {
            const direction = deltaX > 0 ? -1 : 1;
            const newIndex =
              (selectedColorIndex + direction + expandedColors.length) %
              expandedColors.length;
            setSelectedColorIndex(newIndex);
          }
        };
        document.addEventListener("touchmove", onTouchMoveImg);
        document.addEventListener("touchend", onTouchEndImg);
      } else {
        const startX = e.touches[0].clientX;
        const onTouchEndDesktop = (e: TouchEvent) => {
          document.removeEventListener("touchend", onTouchEndDesktop);
          const deltaX = e.changedTouches[0].clientX - startX;
          if (Math.abs(deltaX) > 50) {
            const direction = deltaX > 0 ? -1 : 1;
            const newIndex = Math.max(
              0,
              Math.min(expandedColors.length - 1, hoveredColorIndex + direction)
            );
            setHoveredColorIndex(newIndex);
            setShowIndicators(true);
          }
        };
        document.addEventListener("touchend", onTouchEndDesktop);
      }
    };

    // Обработчик движения мыши для расчета сегмента
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imageRef.current || expandedColors.length === 1) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      setShowIndicators(true);
      const indicatorStart = 0.1 * width;
      const indicatorEnd = 0.9 * width;
      const indicatorWidth = indicatorEnd - indicatorStart;
      const totalSegments = expandedColors.length;
      let newIndex;
      if (x < indicatorStart) {
        newIndex = 0;
      } else if (x > indicatorEnd) {
        newIndex = totalSegments - 1;
      } else {
        const ratio = (x - indicatorStart) / indicatorWidth;
        newIndex = Math.floor(ratio * totalSegments);
      }
      if (newIndex !== hoveredColorIndex) {
        setHoveredColorIndex(newIndex);
      }
    };

    return (
      <div
        className={`relative bg-white shadow-sm overflow-hidden group cursor-pointer flex-shrink-0 h-full ${
          isTablet ? "basis-[calc(100%_/_3)]" : "basis-[calc(100%_/_4)]"
        }`}
      >
        {/* Динамическая ширина: на десктопе ~ container/4, на мобиле 100% (адаптируем позже) */}
        {/* Бейдж скидки */}
        {product.discount !== undefined && (
          <div className="absolute top-2 left-2 z-10 bg-[#cd5554] text-white text-xs font-bold px-2.5 py-0.75 rounded-xl">
            Сегодня -{product.discount}%
          </div>
        )}
        {/* Звезда (избранное) */}
        <div className="absolute top-2 right-2 z-10 text-gray-400 text-2xl hover:text-[#2c3a54] transition">
          ★
        </div>
        {/* Изображение товара */}
        <div
          className="relative w-full h-64 overflow-hidden"
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setHoveredColorIndex(0);
            setShowIndicators(false);
          }}
          onTouchStart={handleTouchStartImage}
        >
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {/* Индикаторы цветов для десктопа */}
          {!isTablet && expandedColors.length > 1 && (
            <div
              className={`absolute bottom-3 left-[10%] right-[10%] flex space-x-0.5 transition-all duration-300 z-10 ${
                showIndicators ? "opacity-100" : "opacity-0"
              }`}
            >
              {expandedColors.map((color, index) => (
                <button
                  key={index}
                  className={`w-6 h-1 rounded-full transition-all duration-300 flex-1 ${
                    index === hoveredColorIndex
                      ? "opacity-100 bg-[#2c3a54]"
                      : "opacity-0 bg-transparent"
                  }`}
                />
              ))}
            </div>
          )}
          {isTablet && expandedColors.length > 1 && (
            <div className="absolute bottom-0 right-3 flex flex-col items-end z-10">
              <div className="bg-gray-300 h-2 rounded-full px-1.5 flex space-x-1 justify-end">
                {expandedColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColorIndex(index)}
                    className={`w-[5px] h-[5px] rounded-full self-center bg-white transition-all duration-200 ${
                      index === selectedColorIndex
                        ? "ring-1 ring-[#2c3a54]"
                        : "opacity-70"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Нижняя часть карточки (убрали fixed height, чтобы контент определял) */}
        <div className="p-3 flex flex-col">
          {/* Title */}
          <h3
            className={`font-bold text-gray-800 mb-1 ${
              isTablet ? "text-base" : "text-lg"
            }`}
          >
            {product.name}
          </h3>
          {/* Высота */}
          <p className={`text-sm text-gray-600 ${isTablet ? "mb-4" : "mb-3"}`}>
            Общая высота: {product.height}
          </p>
          {/* Блок с ценой и кнопкой: flex-row на десктопе (цена слева, кнопка справа), на мобиле - как раньше (col) */}
          <div className="flex-1 flex flex-col xl:flex-row xl:justify-between">
            {/* Цены в одну строку */}
            <div
              className={`flex items-center xl:flex-col xl:items-start ${
                isNarrowMobile ? "flex-col gap-0 items-start" : "gap-2"
              }`}
            >
              {hasDiscount ? (
                <>
                  <span className="font-bold text-xl text-[#cd5554]">
                    {product.price} руб.
                  </span>
                  <span className="text-[12px] text-gray-500 line-through">
                    {product.oldPrice} руб.
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-[#2c3a54]">
                  {product.price} руб.
                </span>
              )}
            </div>

            {/* Кнопка "Подробнее" — только если tablet, но не mobile */}
            {!isMobile && (
              <button className="w-max mt-2 py-[9px] px-[15px] bg-white border border-[#2c3a54] text-[#2c3a54] rounded-full font-bold hover:bg-[#2c3a54] hover:text-white transition whitespace-nowrap">
                Подробнее
              </button>
            )}

            {/* На мобильном (isMobile) кнопка не отображается */}
          </div>
        </div>
      </div>
    );
  };

  // Фильтр только товары со скидкой (discount !== undefined)
  const discountedProducts = products
    .filter((p) => p.discount !== undefined)
    .filter(
      (product) =>
        activeCategory === "Все" || product.category === activeCategory
    );

  return (
    <section className="max-w-[1300px]  mt-17 lg:mt-30 container-centered">
      <h2 className="text-4xl font-bold text-[#2c3a54] mb-6">
        Товары со скидкой
      </h2>

      {/* Панель категорий */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          "Все",
          "Одиночные",
          "Двойные",
          "Эксклюзивные",
          "Гранитные ограды",
        ].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 border border-gray-300 rounded-full text-[16px] font-medium transition ${
              activeCategory === category
                ? "bg-[#2c3a54] text-white"
                : "text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="relative">
        {!isMobile && (
          <>
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
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
          </>
        )}

        {isMobile && (
          <div className="grid grid-cols-2 ">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Кнопка внизу */}
      <div className="mt-10 flex">
        <button className="font-bold md:min-w-[330px] px-7.5 py-3 bg-[#2c3a54] border border-[#2c3a54] text-white rounded-full hover:bg-white hover:text-[#2c3a54] transition">
          <Link href="/">Смотреть все</Link>
        </button>
      </div>
    </section>
  );  
};

export default RelatedProductsSlider;
