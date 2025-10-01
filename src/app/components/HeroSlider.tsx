"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Адаптивная высота
  const getSliderHeight = () => {
    if (windowWidth >= 768) {
      return "clamp(226px, 29.5vw, 400px)";
    } else if (windowWidth >= 601) {
      return "70vw";
    } else if (windowWidth >= 500) {
      return "85vw";
    } else if (windowWidth >= 425) {
      return "100vw";
    } else if (windowWidth >= 375) {
      return "112vw";
    } else if (windowWidth >= 320) {
      return "120vw";
    } else {
      return "138vw";
    }
  };

  // Определение размеров шрифтов
  const getFontSize = () => {
    if (windowWidth > 1280) {
      return {
        title: "36px",
        subtitle: "18px",
        button: "18px",
      };
    } else if (windowWidth > 1000) {
      return {
        title: "24px",
        subtitle: "18px",
        button: "18px",
      };
    } else if (windowWidth > 768) {
      return {
        title: "20px",
        subtitle: "16px",
        button: "18px",
      };
    } else {
      return {
        title: "20px",
        subtitle: "16px",
        button: "18px",
      };
    }
  };

  // Определение padding для контейнера
  const getPadding = () => {
    if (windowWidth > 1000) {
      return {
        x: "80px",
        y: "60px",
      };
    } else {
      return {
        x: "40px",
        y: "26px",
      };
    }
  };

  // Отслеживаем ширину окна
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slides = [
    {
      id: 1,
      image:
        windowWidth >= 768
          ? "/sliders/slider-monuments.webp"
          : "/sliders/slider-monuments-m.webp",
      title: "500+ уникальных и классических моделей памятников",
      subtitle:
        "Одиночные и двойные памятники из лучших пород гранита России, Финляндии, Норвегии, Индии и др.",
      button: {
        text: "Смотреть каталог",
        href: "/",
      },
      color: "#2c3a54",
    },
    {
      id: 2,
      image:
        windowWidth >= 768
          ? "/sliders/slider-card.webp"
          : "/sliders/slider-card-m.webp",
      title: "Отсрочка платежа и рассрочка",
      subtitle: "Без процентов - без походов банк - собственная рассрочка",
      button: {
        text: "Подробнее о рассрочке",
        href: "/",
      },
      color: "#2c3a54",
    },
    {
      id: 3,
      image:
        windowWidth >= 768
          ? "/sliders/slider-ig.webp"
          : "/sliders/slider-ig-m.webp",
      title: "Полезная информация - в Instagram!",
      subtitle:
        "Полезные обзоры, фото готовых работ и подборки памятников - в нашем инстаграм",
      button: {
        text: "Перейти",
        href: "https://instagram.com/",
      },
      color: "white",
    },
    {
      id: 4,
      image:
        windowWidth >= 768
          ? "/sliders/slider-pamyatniki.webp"
          : "/sliders/slider-pamyatniki-m.webp",
      title: "Готовые памятники с оформлением у нас в офисе",
      subtitle:
        "Десятки вариантов гранита, материалов для благоустройства, вариантов оформления и аксессуаров",
      button: {
        text: "Подробнее",
        href: "/",
      },
      color: "white",
    },
    {
      id: 5,
      image:
        windowWidth >= 768
          ? "/sliders/slider-3d.webp"
          : "/sliders/slider-3d-m.webp",
      title: "Профессиональное 3d-моделирование",
      subtitle:
        "Объёмный макет будущего участка с детальной проработкой размеров",
      button: {
        text: "Подробнее",
        href: "/",
      },
      color: "#2c3a54",
    },
  ];

  const totalSlides = slides.length;
  const slide = slides[currentSlide]
  const color = slide.color

  // Автоплей
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // 5 секунд
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const fontSize = getFontSize();
  const padding = getPadding();

  return (
    <section
      className="relative container-centered"
      style={{ height: getSliderHeight() }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Слайды */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute rounded-xl inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: windowWidth >= 768 ? `url(${slide.image})` : "",
              backgroundSize: "cover",
              backgroundPosition: windowWidth >= 768 ? "center" : "",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Контент слайда */}
            {windowWidth >= 768 ? (
              // Десктопная версия - текст слева, изображение справа
              <div
                className=""
                style={{
                  paddingLeft: padding.x,
                  paddingRight: padding.x,
                  paddingTop: padding.y,
                  paddingBottom: padding.y,
                  minWidth: "45vw",
                  maxWidth: "54vw",
                  color: color,
                }}
              >
                <h2
                  className="font-bold mb-2"
                  style={{ fontSize: fontSize.title }}
                >
                  {slide.title}
                </h2>
                <p
                  style={{
                    fontSize: fontSize.subtitle,
                    marginBottom: windowWidth > 1200 ? "56px" : "20px",
                  }}
                >
                  {slide.subtitle}
                </p>
                <Link
                  href={slide.button.href}
                  target="_blank"
                  className="bg-transparent px-6 py-3 border-2 rounded-full font-medium hover:bg-[#2c3a54] hover:border-0 transition"
                  style={{
                    fontSize: fontSize.button,
                    padding: windowWidth > 1280 ? "11px 24px" : "10px 20px",
                  }}
                >
                  {slide.button.text}
                </Link>
              </div>
            ) : (
              // Мобильная версия - изображение сверху, текст снизу
              <div className="flex flex-col h-full">
                {/* Верхняя часть - изображение */}
                <div
                  className="w-full mb-5.5 rounded-xl"
                  style={{
                    height: "clamp(200px, 50vh, 300px)",
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                {/* Нижняя часть - текст и кнопка на белом фоне */}
                <div className="bg-white text-[#2c3a54]">
                  <h2
                    className="font-bold mb-4"
                    style={{ fontSize: fontSize.title }}
                  >
                    {slide.title}
                  </h2>
                  <p className="mb-6" style={{ fontSize: fontSize.subtitle }}>
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.button.href}
                    target="_blank"
                    className="border-2 border-[#2c3a54] px-6 py-2.75 rounded-full font-medium transition block text-center w-max"
                    style={{
                      fontSize: fontSize.button,
                    }}
                  >
                    {slide.button.text}
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      {windowWidth >= 768 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-[-16px] border-1 border-[#2c3a54] top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
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
          <button
            onClick={nextSlide}
            className="absolute right-[-16px] border-1 border-[#2c3a54] top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
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

      {/* Индикаторы */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 flex space-x-4 ${
          windowWidth < 768 ? "my-3" : "bottom-4"
        }`}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative w-[14px] h-[14px] rounded-full bg-white border-1 border-[#2c3a54] transition-colors flex items-center justify-center"
            type="button"
            aria-label={`Перейти к слайду ${index + 1}`}
          >
            {/* Активный — большой тёмный кружок внутри */}
            {index === currentSlide ? (
              <span className="w-[8px] h-[8px] rounded-full bg-[#2c3a54]"></span>
            ) : (
              // Неактивный — при hover появляется меньший тёмный кружок
              <span className="absolute w-[6px] h-[6px] rounded-full bg-[#2c3a54] opacity-0 hover:opacity-100 transition-opacity"></span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
