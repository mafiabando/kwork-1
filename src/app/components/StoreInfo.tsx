"use client";
import React, { useEffect, useState } from "react";
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

  // Состояние модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalSlide, setCurrentModalSlide] = useState(0);

  // Рефы для свайпа — по одному набору на каждый слайдер
  const desktopRefs = useRef({ startX: 0, startY: 0, isDragging: false });
  const tabletRefs = useRef({ startX: 0, startY: 0, isDragging: false });
  const mobileRefs = useRef({ startX: 0, startY: 0, isDragging: false });

  const nextSlide = () => {
    setCurrentModalSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentModalSlide((prev) => (prev - 1 + slides.length) % slides.length);
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

  const openModal = (index: number) => {
    setCurrentModalSlide(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Блокируем скролл
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Возвращаем скролл
  };

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
    let refs;
    if (isSmallScreen) {
      refs = mobileRefs;
    } else if (className.includes("flex-nowrap")) {
      // Это tablet (2 слайда)
      refs = tabletRefs;
    } else {
      // Это desktop (3 слайда)
      refs = desktopRefs;
    }

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      refs.current.startX = e.clientX;
      refs.current.startY = e.clientY;
      refs.current.isDragging = true;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!refs.current.isDragging) return;

      const deltaX = e.clientX - refs.current.startX;
      const deltaY = e.clientY - refs.current.startY;

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
      if (!refs.current.isDragging) return;

      const deltaX = e.clientX - refs.current.startX;
      const deltaY = e.clientY - refs.current.startY;

      // Только горизонтальный свайп
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        refs.current.isDragging = false;
        return;
      }

      // Определяем направление
      if (Math.abs(deltaX) < 50) {
        // Слабый свайп — не переключаем
        refs.current.isDragging = false;
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
      refs.current.isDragging = false;
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      e.preventDefault();
      refs.current.startX = e.touches[0].clientX;
      refs.current.startY = e.touches[0].clientY;
      refs.current.isDragging = true;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!refs.current.isDragging) return;

      const deltaX = e.touches[0].clientX - refs.current.startX;
      const deltaY = e.touches[0].clientY - refs.current.startY;

      // Только горизонтальный свайп
      if (Math.abs(deltaY) > Math.abs(deltaX)) return;

      e.preventDefault();

      const movePercent = (deltaX / window.innerWidth) * 100;
      const newTransform = safeCurrentSlide * slideWidthPercent + movePercent;

      const slider =
        e.currentTarget.parentElement?.parentElement?.querySelector(".flex");
      if (slider) {
        (
          slider as HTMLElement
        ).style.transform = `translateX(-${newTransform}%)`;
      }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (!refs.current.isDragging) return;

      const deltaX = e.changedTouches[0].clientX - refs.current.startX;
      const deltaY = e.changedTouches[0].clientY - refs.current.startY;

      // Только горизонтальный свайп
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        refs.current.isDragging = false;
        return;
      }

      // Определяем направление
      if (Math.abs(deltaX) < 50) {
        refs.current.isDragging = false;
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
      refs.current.isDragging = false;
    };

    return (
      <div
        className={`relative overflow-hidden ${className}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => (refs.current.isDragging = false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
              className="flex-shrink-0 px-2.5 cursor-pointer"
              style={{ width: `${slideWidthPercent}%` }}
              onClick={() => openModal(index)} // Открываем модалку при клике
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
              className={`w-2.5 h-2.5 border-1 border-black rounded-full ${index === safeCurrentSlide ? "bg-[#2c3a54]" : "bg-white"
                }`}
            ></button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-[1300px]  mt-17 lg:mt-30 container-centered">
      <h2 className="text-4xl font-bold text-[#2c3a54] mb-3.5 md:mb-7.5">
        Наш магазин
      </h2>

      <div className="bg-[#f5f6fa] rounded-xl p-4 md:p-6 shadow-sm">
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
                Витебск, ул. Терешковой 9Б
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
                  <a href="tel:+375333226652">
                    <span className="text-gray-600 text-[16px]">
                      +375 33 322-66-52
                    </span>
                  </a>
                  <a href="tel:+375296226645">
                    <span className="text-gray-600 text-[16px]">
                      +375 29 622-66-45
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
                Витебск, ул. Терешковой 9Б
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
                    +375 33 322-66-52
                  </span>
                  <span className="text-gray-600 text-[16px]">
                    +375 29 622-66-45
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
              Витебск, ул. Терешковой 9Б
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
                <a href="tel:+375333226652">
                  <span className="text-gray-600 text-[16px]">
                    +375 33 322-66-52
                  </span>
                </a>
                <a href="tel:+375296226645">
                  <span className="text-gray-600 text-[16px]">
                    +375 29 622-66-45
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
              Витебск, ул. Терешковой 9Б
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
                <a href="tel:+375333226652">
                  <span className="text-gray-600 text-[16px]">
                    +375 33 322-66-52
                  </span>
                </a>
                <a href="tel:+375296226645">
                  <span className="text-gray-600 text-[16px]">
                    +375 29 622-66-45
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

      {/* Модальное окно */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={closeModal} // Закрытие при клике вне изображения
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()} // Не закрывать при клике на контент
          >
            {/* Индикатор текущего слайда (например, "1 / 5") */}
            <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-70 px-2 py-1 rounded z-10">
              {currentModalSlide + 1} / {slides.length}
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
                src={slides[currentModalSlide].src}
                alt={slides[currentModalSlide].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoreInfo;
