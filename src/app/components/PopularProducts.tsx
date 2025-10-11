"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { ColorOption, Product } from "../types/types";
import { products } from "../mock/products";

const PopularProducts = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false); 

  // Для адаптивности
  useEffect(() => {
  const checkScreenSize = () => {
    const width = window.innerWidth;
    setIsTablet(width < 1024);
    setIsMobile(width <= 420);
  };

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  return () => window.removeEventListener("resize", checkScreenSize);
}, []);

  // Фильтруем товары по категории
  const filteredProducts =
    activeCategory === "Все"
      ? products
      : products.filter((product) => product.category === activeCategory);

  // Компонент карточки товара
  const ProductCard = ({ product }: { product: Product }) => {
    const [hoveredColorIndex, setHoveredColorIndex] = useState(0); // 0 = дефолт
    const [showIndicators, setShowIndicators] = useState(false); // Для показа только при активном hover
    const [selectedColorIndex, setSelectedColorIndex] = useState(0); // 0 = дефолт
    const sliderRef = useRef<HTMLDivElement>(null);
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

    // Обработчик свайпа по изображению (для моб+десктоп)
    const handleTouchStartImage = (e: React.TouchEvent) => {
      if (isTablet) {
        // На мобиле: свайп меняет selectedColorIndex
        const startX = e.touches[0].clientX;
        const startY = e.touches[0].clientY;
        const onTouchMoveImg = (e: TouchEvent) => {
          const deltaX = e.touches[0].clientX - startX;
          const deltaY = e.touches[0].clientY - startY;
          if (Math.abs(deltaY) > Math.abs(deltaX)) return; // Только horizontal
          e.preventDefault();
        };
        const onTouchEndImg = (e: TouchEvent) => {
          document.removeEventListener("touchmove", onTouchMoveImg);
          document.removeEventListener("touchend", onTouchEndImg);
          const deltaX = e.changedTouches[0].clientX - startX;
          if (Math.abs(deltaX) > 50) {
            // Threshold
            const direction = deltaX > 0 ? -1 : 1; // Вправо: назад (предыдущий), влево: следующий
            const newIndex =
              (selectedColorIndex + direction + expandedColors.length) %
              expandedColors.length;
            setSelectedColorIndex(newIndex);
          }
        };
        document.addEventListener("touchmove", onTouchMoveImg);
        document.addEventListener("touchend", onTouchEndImg);
      } else {
        // На десктопе: свайп симулирует mouseMove (по delta в сегменты, но упрощённо: лево/право index)
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
      if (!imageRef.current || expandedColors.length === 1) return; // Только дефолт — нет сегментов
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;

      setShowIndicators(true); // Показываем при любом движении

      // Область индикаторов: 10%-90% ширины
      const indicatorStart = 0.1 * width;
      const indicatorEnd = 0.9 * width;
      const indicatorWidth = indicatorEnd - indicatorStart;
      const totalSegments = expandedColors.length; // Включая дефолт

      let newIndex;
      if (x < indicatorStart) {
        // Левый край: дефолт (первый)
        newIndex = 0;
      } else if (x > indicatorEnd) {
        // Правый край: последний (для плавности)
        newIndex = totalSegments - 1;
      } else {
        // Внутри: ratio 0-1 → index 0 to total-1
        const ratio = (x - indicatorStart) / indicatorWidth;
        newIndex = Math.floor(ratio * totalSegments);
      }

      if (newIndex !== hoveredColorIndex) {
        setHoveredColorIndex(newIndex);
      }
    };

    return (
  <div className="relative bg-white shadow-sm overflow-hidden group cursor-pointer">
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
      onMouseMove={handleMouseMove} // для расчета hovered index по позиции
      onMouseLeave={() => {
        setHoveredColorIndex(0); // возврат к дефолту
        setShowIndicators(false); // скрыть индикаторы
      }}
      onTouchStart={handleTouchStartImage}
    >
      <img
        src={displayImage}
        alt={product.name}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
      {/* Индикаторы цветов для десктопа — на фото, при hover */}
      {!isTablet &&
        expandedColors.length > 1 && ( // >1, чтобы был смысл
          <div
            className={`absolute bottom-3 left-[10%] right-[10%] flex space-x-0.5 transition-all duration-300 z-10 ${
              showIndicators ? "opacity-100" : "opacity-0"
            }`}
          >
            {expandedColors.map(
              (
                color,
                index // map по всем: index 0 = дефолт
              ) => (
                <button
                  key={index}
                  className={`w-6 h-1 rounded-full transition-all duration-300 flex-1 ${
                    index === hoveredColorIndex
                      ? "opacity-100 bg-[#2c3a54]"
                      : "opacity-0 bg-transparent"
                  }`}
                />
              )
            )}
          </div>
        )}
      {isTablet && expandedColors.length > 1 && (
        <div className="absolute bottom-0 right-3 flex flex-col items-end z-10">
          {/* Серая полоса + кружочки */}
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
    {/* Нижняя часть карточки */}
    <div className="p-3 flex flex-col">
      {/* Title: Адаптив шрифт */}
      <h3
        className={`font-bold text-gray-800 mb-1 ${
          isTablet ? "text-base" : "text-lg"
        }`}
      >
        {product.name}
      </h3>
      {/* Высота: Адаптив отступ */}
      <p className={`text-sm text-gray-600 ${isTablet ? "mb-4" : "mb-3"}`}>
        Общая высота: {product.height}
      </p>
      {/* Цены: Адаптив layout (убрали mb-1, чтобы mt-auto управлял пространством) */}
      {hasDiscount ? (
        // Скидка: flex-row на мобиле (актуальная слева, зачёркнутая справа); на деск — col слева
        <div
  className={`${
    isTablet && !isMobile 
      ? "flex items-center mb-2" 
      : "flex flex-col mb-2"
  }`}
>
          <span
            className={`font-bold text-xl text-[#cd5554]`}
          >
            {product.price} руб.
          </span>
          <span
            className={`text-[12px] text-gray-500 line-through ${
              isTablet && isMobile ? "ml-2" : ""
            }`}
          >
            {product.oldPrice} руб.
          </span>
        </div>
      ) : (
        // Без скидки
        <div className="mb-2 flex flex-col">
          <span className="text-xl font-bold text-[#2c3a54]">
            {product.price} руб.
          </span>
          {!isTablet && <span className="h-[18px]" />}
        </div>
      )}
      {/* Кнопка: mt-auto для выравнивания по низу, адаптив на мобиле */}
      <div className="mt-auto hidden md:block">
        <button
          className={`py-[9px] px-[15px] bg-white border border-[#2c3a54] text-[#2c3a54] rounded-full font-bold hover:bg-[#2c3a54] hover:text-white transition w-full sm:w-auto sm:ml-auto ${
            isTablet ? "max-w-[200px]" : ""
          }`}
        >
          Подробнее
        </button>
      </div>
    </div>
  </div>
);
  };

  return (
    <section className="max-w-[1300px] mt-17 lg:mt-30 container-centered">
      <h2 className="text-4xl font-bold text-[#2c3a54] mb-3.5 md:mb-7.5">
        Популярные товары
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
            className={`px-4 py-2 border-1 border-gray-300 rounded-full text-[16px] font-medium transition ${
              activeCategory === category
                ? "bg-[#2c3a54] text-white"
                : "text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Грид товаров */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {/* Кнопки внизу */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 font-bold">
        <button className="md:min-w-[330px] px-7.5 py-3 bg-white border border-[#2c3a54] text-[#2c3a54] rounded-full hover:bg-[#2c3a54] hover:text-white transition">
          <Link href="/">Показать все</Link>
        </button>
        <button className="md:min-w-[330px] px-7.5 py-3 bg-[#2c3a54] text-white rounded-full hover:bg-white hover:border-1 hover:border-[#2c3a54] hover:text-[#2c3a54] transition">
          <Link href="/">Перейти в каталог</Link>
        </button>
      </div>
    </section>
  );
};

export default PopularProducts;
