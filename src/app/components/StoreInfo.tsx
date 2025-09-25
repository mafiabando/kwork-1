"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRef } from "react";

const StoreInfo = () => {
  const now = new Date();
  const day = now.getDay(); // 0=вс, 1=пн, ..., 6=сб
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour * 60 + minute;
  const isOpen =
    (day >= 1 && day <= 5 && currentTime >= 600 && currentTime < 1140) ||
    (day === 6 && currentTime >= 600 && currentTime < 900);

  const storeStatus = isOpen ? "Открыто до 19:00" : "Закрыто до 10:00";
  const statusColor = isOpen ? "bg-green-500" : "bg-red-500";

  const slides = [
    { id: 1, src: "/shop-slider/1.webp", alt: "Слайд 1" },
    { id: 2, src: "/shop-slider/2.webp", alt: "Слайд 2" },
    { id: 3, src: "/shop-slider/3.webp", alt: "Слайд 3" },
    { id: 4, src: "/shop-slider/4.webp", alt: "Слайд 4" },
    { id: 5, src: "/shop-slider/5.webp", alt: "Слайд 5" },
  ];

  // Состояние для каждого breakpoint'а — чтобы не было конфликтов
  const [currentSlideDesktop, setCurrentSlideDesktop] = useState(0);
  const [currentSlideTablet, setCurrentSlideTablet] = useState(0);
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);

  // Функция для отображения слайдов и индикаторов
  const renderSlides = (
    count: number,
    className = "",
    isSmallScreen = false,
    currentSlide: number,
    setCurrentSlide: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const maxSlide = Math.max(0, slides.length - count);
    const safeCurrentSlide = Math.min(currentSlide, maxSlide);

    // Ширина одного слайда в процентах — относительно ширины слайдера
    const slideWidthPercent = 100 / count;

    // Для свайпа
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const isDraggingRef = useRef(false);

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
      isDraggingRef.current = true;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - startXRef.current;
      const deltaY = e.clientY - startYRef.current;

      // Только горизонтальный свайп
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;

      // Не блокируем скролл
      e.preventDefault();

      const movePercent = (deltaX / window.innerWidth) * 100;
      const newTransform = safeCurrentSlide * slideWidthPercent + movePercent;

      // Анимацию не делаем — просто показываем сдвиг
      const slider =
        e.currentTarget.parentElement?.parentElement?.querySelector(".flex");
      if (slider) {
        (
          slider as HTMLElement
        ).style.transform = `translateX(-${newTransform}%)`;
      }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - startXRef.current;
      const deltaY = e.clientY - startYRef.current;

      // Только горизонтальный свайп
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isDraggingRef.current = false;
        return;
      }

      // Определяем направление
      if (Math.abs(deltaX) < 50) {
        // Слабый свайп — не переключаем
        isDraggingRef.current = false;
        return;
      }

      let newSlide = safeCurrentSlide;
      if (deltaX > 0) {
        // Вправо — предыдущий слайд
        newSlide = Math.max(0, safeCurrentSlide - 1);
      } else {
        // Влево — следующий слайд
        newSlide = Math.min(maxSlide, safeCurrentSlide + 1);
      }

      setCurrentSlide(newSlide);
      isDraggingRef.current = false;
    };

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => (isDraggingRef.current = false)}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${safeCurrentSlide * slideWidthPercent}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="flex-shrink-0 px-2.5"
              style={{ width: `${slideWidthPercent}%` }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className={
                  isSmallScreen
                    ? "w-full h-[240px] rounded-lg object-cover"
                    : "w-full h-full rounded-lg object-cover"
                }
              />
            </div>
          ))}
        </div>

        {/* Индикаторы — по количеству позиций */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {Array.from({ length: maxSlide + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 border-1 border-black rounded-full ${
                index === safeCurrentSlide ? "bg-[#2c3a54]" : "bg-white"
              }`}
            ></button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 mt-17 md:mt-30">
      <h2 className="text-4xl font-bold text-[#2c3a54] mb-3.5 md:mb-7.5">
        Наш магазин
      </h2>

      <div className="bg-gray-50 rounded-xl p-4 md:p-6 shadow-sm">
        {/* Десктоп: >=1200px (3 слайда) */}
        <div className="hidden lg:flex gap-6">
          <div className="flex-1 content-center">
            {renderSlides(
              3,
              "",
              false,
              currentSlideDesktop,
              setCurrentSlideDesktop
            )}
          </div>
          <div className="w-1/3 flex flex-col justify-between text-[#2c3a54]">
            <div>
              <p className="font-bold mb-6 text-xl">
                Витебск, ул. Терешковой 9В
              </p>

              <div className="relative group mb-6 no-wrap">
                <button className="relative flex items-center text-[16px] font-medium">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${statusColor} mr-2`}
                  ></span>
                  {storeStatus}
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <div className="absolute left-0 transform -translate-x-0 top-full mt-0 w-max bg-[#f5f6fa] border border-gray-200 rounded-md shadow-lg z-50 hidden group-hover:block focus-within:block">
                    <div className="py-1 text-sm">
                      <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                        <span>Пн—Пт</span>
                        <span className="flex-1 text-center text-gray-400 mx-2">
                          …………
                        </span>
                        <span>с 10:00 до 19:00</span>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                        <span>Суббота</span>
                        <span className="flex-1 text-center text-gray-400 mx-2">
                          …………
                        </span>
                        <span>с 10:00 до 15:00</span>
                      </div>
                      <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                        <span>Воскресенье</span>
                        <span className="flex-1 text-center text-gray-400 mx-2">
                          …………
                        </span>
                        <span>выходной</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex items-start mb-7 translate-x-[-2px]">
                <Image
                  width={20}
                  height={20}
                  alt="Телефоны"
                  className="mr-2 self-center"
                  src={"/phone.svg"}
                />
                <div className="flex flex-col font-bold">
                  <a href="tel:+375296000000">
                    <span className="text-gray-600 text-[16px]">
                      +375 29 600-00-00
                    </span>
                  </a>
                  <a href="tel:+375333000001">
                  <span className="text-gray-600 text-[16px]">
                    +375 33 300-00-01
                  </span>
                  </a>
                </div>
              </div>
            </div>

            <button className="w-max px-6 py-2 font-bold border-1 border-[#2c3a54] rounded-full text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white transition-colors">
              Подробнее
            </button>
          </div>
        </div>

        {/* Таблет: 768px - 1199px (2 слайда) */}
        <div className="hidden md:flex lg:hidden flex-col gap-4">
          <div className="flex-1">
            {renderSlides(
              2,
              "flex-nowrap",
              false,
              currentSlideTablet,
              setCurrentSlideTablet
            )}
          </div>
          <div className="w-1/2 flex flex-col justify-between text-[#2c3a54]">
            <div>
              <p className="text-gray-800 font-bold mb-2">
                Витебск, ул. Терешковой 9В
              </p>

              <div className="relative group mb-3 whitespace-nowrap">
                <button className="flex items-center text-[16px] font-medium">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${statusColor} mr-2`}
                  ></span>
                  {storeStatus}
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute left-0 transform -translate-x-0 top-full mt-0 w-max bg-[#f5f6fa] border border-gray-200 rounded-md shadow-lg z-50 hidden group-hover:block focus-within:block">
                  <div className="py-1 text-sm">
                    <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                      <span>Пн—Пт</span>
                      <span className="flex-1 text-center text-gray-400 mx-2">
                        …………
                      </span>
                      <span>с 10:00 до 19:00</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                      <span>Суббота</span>
                      <span className="flex-1 text-center text-gray-400 mx-2">
                        …………
                      </span>
                      <span>с 10:00 до 15:00</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                      <span>Воскресенье</span>
                      <span className="flex-1 text-center text-gray-400 mx-2">
                        …………
                      </span>
                      <span>выходной</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start mb-3 translate-x-[-2px]">
                <Image
                  width={20}
                  height={20}
                  alt="Телефоны"
                  className="mr-2 self-center"
                  src={"/phone.svg"}
                />
                <div className="flex flex-col font-bold">
                  <span className="text-gray-600 text-[16px]">
                    +375 29 600-00-00
                  </span>
                  <span className="text-gray-600 text-[16px]">
                    +375 33 300-00-01
                  </span>
                </div>
              </div>
            </div>

            <button className="w-max mt-4 px-6 py-2 font-bold border-1 border-[#2c3a54] rounded-full text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white transition-colors">
              Подробнее
            </button>
          </div>
        </div>

        {/* Мобильный: 425px - 767px (2 слайда) */}
        <div className="hidden sm:flex md:hidden flex-col gap-4">
          <div className="flex-1">
            {renderSlides(
              2,
              "flex-nowrap",
              false,
              currentSlideMobile,
              setCurrentSlideMobile
            )}
          </div>

          <div>
            <p className="text-[#2c3a54] font-bold mb-2">
              Витебск, ул. Терешковой 9В
            </p>

            <div className="relative group mb-3 text-[#2c3a54]">
              <button className="flex items-center text-[16px] font-medium">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${statusColor} mr-2`}
                ></span>
                {storeStatus}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="absolute left-0 transform -translate-x-0 top-full mt-0 w-max bg-[#f5f6fa] border border-gray-200 rounded-md shadow-lg z-50 hidden group-hover:block focus-within:block">
                <div className="py-1 text-sm">
                  <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                    <span>Пн—Пт</span>
                    <span className="flex-1 text-center text-gray-400 mx-2">
                      …………
                    </span>
                    <span>с 10:00 до 19:00</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                    <span>Суббота</span>
                    <span className="flex-1 text-center text-gray-400 mx-2">
                      …………
                    </span>
                    <span>с 10:00 до 15:00</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                    <span>Воскресенье</span>
                    <span className="flex-1 text-center text-gray-400 mx-2">
                      …………
                    </span>
                    <span>выходной</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start mb-3 translate-x-[-2px]">
              <Image
                width={20}
                height={20}
                alt="Телефоны"
                className="mr-2 self-center"
                src={"/phone.svg"}
              />
              <div className="flex flex-col font-bold">
                <a href="tel:+375296000000">
                    <span className="text-gray-600 text-[16px]">
                      +375 29 600-00-00
                    </span>
                  </a>
                <a href="tel:+375333000001">
                  <span className="text-gray-600 text-[16px]">
                    +375 33 300-00-01
                  </span>
                  </a>
              </div>
            </div>
          </div>

          <button className="w-max mt-4 px-6 py-2 font-bold border-1 border-[#2c3a54] rounded-full text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white transition-colors">
            Подробнее
          </button>
        </div>

        {/* Очень маленький экран: < 425px (1 слайд) */}
        <div className="flex flex-col sm:hidden gap-4">
          <div className="flex-1">
            {renderSlides(
              1,
              "flex-nowrap",
              true,
              currentSlideMobile,
              setCurrentSlideMobile
            )}
          </div>

          <div>
            <p className="text-gray-800 font-bold mb-2">
              Витебск, ул. Терешковой 9В
            </p>

            <div className="relative group mb-3">
              <button className="flex items-center text-[#2c3a54] text-[16px] font-medium">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${statusColor} mr-2`}
                ></span>
                {storeStatus}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="absolute left-0 transform -translate-x-0 top-full mt-0 w-max bg-[#f5f6fa] border border-gray-200 rounded-md shadow-lg z-50 hidden group-hover:block focus-within:block">
                <div className="py-1 text-sm">
                  <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                    <span>Пн—Пт</span>
                    <span className="flex-1 text-center text-gray-400 mx-2">
                      …………
                    </span>
                    <span>с 10:00 до 19:00</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                    <span>Суббота</span>
                    <span className="flex-1 text-center text-gray-400 mx-2">
                      …………
                    </span>
                    <span>с 10:00 до 15:00</span>
                  </div>
                  <div className="flex justify-between items-center px-4 py-2 text-gray-700">
                    <span>Воскресенье</span>
                    <span className="flex-1 text-center text-gray-400 mx-2">
                      …………
                    </span>
                    <span>выходной</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start mb-3 translate-x-[-2px]">
              <Image
                width={20}
                height={20}
                alt="Телефоны"
                className="mr-2 self-center"
                src={"/phone.svg"}
              />
              <div className="flex flex-col font-bold">
                <a href="tel:+375296000000">
                    <span className="text-gray-600 text-[16px]">
                      +375 29 600-00-00
                    </span>
                  </a>
                <a href="tel:+375333000001">
                  <span className="text-gray-600 text-[16px]">
                    +375 33 300-00-01
                  </span>
                  </a>
              </div>
            </div>
          </div>

          <button className="w-max mt-4 px-6 py-2 font-bold border-1 border-[#2c3a54] rounded-full text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white transition-colors">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
