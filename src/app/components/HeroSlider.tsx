'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      image: '/slider-ig.webp', // ваше изображение
      title: 'Полезная информация - в Instagram!',
      subtitle: 'Полезные обзоры, фото готовых работ и подборки памятников - в нашем инстаграм',
      button: {
        text: 'Перейти',
        href: 'https://instagram.com/yourprofile',
      },
    },
    {
      id: 2,
      image: '/slider-ig.webp', // ваше изображение
      title: 'Полезная информация - в Instagram!',
      subtitle: 'Полезные обзоры, фото готовых работ и подборки памятников - в нашем инстаграм',
      button: {
        text: 'Перейти',
        href: 'https://instagram.com/yourprofile',
      },
    },
    // Добавьте больше слайдов по необходимости
  ];

  const totalSlides = slides.length;

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

  return (
    <section
      className="relative w-full h-[500px] overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Слайды */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Слайд ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white max-w-lg">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg mb-6">{slide.subtitle}</p>
              <Link
                href={slide.button.href}
                target="_blank"
                className="bg-white text-[#2c3a54] px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
              >
                {slide.button.text}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c3a54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2c3a54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;