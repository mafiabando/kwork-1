"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const WhyTrustUs = () => {
  return (
    <section className="w-[100vw] bg-gray-50">
      <div className="w-full max-w-[1300px] mx-auto mt-17 md:mt-30">
        <div className="pt-[93px] mb-[30px]">
          <h2 className="text-4xl font-bold text-[#2c3a54] mb-6">
            Почему нам доверяют
          </h2>
        </div>

        {/* Верхний ряд */}
        <div className="flex flex-wrap -mx-2.5 mb-5" style={{ display: 'flex', alignItems: 'stretch' }}>
          {/* Карточка 1: широкая */}
          <div className="w-[50%] px-2.5 mb-6">
            <div
              className="relative p-6 min-h-[250px] mx-2.5 rounded-lg bg-white flex flex-col justify-between"
              style={{ padding: "22px 22px 60px 23px", height: '100%' }}
            >
              <div className="flex items-start gap-4">
                <div className="max-w-[62%]">
                  <h3 className="font-bold text-xl text-[#2c3a54]">
                    Работаем более чем с 30 породами гранита
                  </h3>
                  <p className="text-md text-[#2c3a54] mt-1 lg:max-w-[74%]">
                    Используем проверенный гранит из лучших месторождений
                    Карелии (Россия), Финляндии, Норвегии, Индии и др
                  </p>
                </div>
              </div>
              <Link
                href="#"
                className="w-full absolute bottom-5.5 left-5.75 text-[#2c3a54] rounded-full font-bold hover:underline transition"
              >
                Подробнее
              </Link>
              <div className="absolute ml-auto top-[12%] right-[18px]">
                <img src="/why/1.webp" alt="Гранит" className="max-w-[125px] lg:max-w-[260px]" />
              </div>
            </div>
          </div>

          {/* Карточка 2: узкая */}
          <div className="w-[25%] px-2.5 mb-6">
            <div
              className="relative p-6 min-h-[250px] mx-2.5 rounded-lg bg-[#B2DBFD] flex flex-col justify-between"
              style={{ padding: "22px 22px 60px 23px", height: '100%' }}
            >
              <div className="lg:max-w-[92%]">
                <h3 className="font-bold text-lg text-[#2c3a54]">
                  Работаем строго по договору
                </h3>
                <p className="text-md text-[#2c3a54] mt-1 lg:max-w-[74%]">
                  После оформления заказа предоставляем договор со списком всех
                  изделий и услуг
                </p>
              </div>
              <Link
                href="#"
                className="w-full absolute bottom-5.5 left-5.75 text-[#2c3a54] rounded-full font-bold hover:underline transition"
              >
                Подробнее
              </Link>
            </div>
          </div>

          {/* Карточка 3: узкая */}
          <div className="w-[25%] px-2.5 mb-6">
            <div
              className="relative p-6 min-h-[250px] mx-2.5 rounded-lg bg-[#F6D1AA] flex flex-col justify-between"
              style={{ padding: "22px 22px 60px 23px", height: '100%' }}
            >
              <div className="lg:max-w-[92%]">
                <h3 className="font-bold text-lg text-[#2c3a54]">
                  Предоставляем разные варианты оплаты
                </h3>
                <p className="text-md text-[#2c3a54] mt-1 lg:max-w-[74%]">
                  Предоплатная система, наша рассрочка, рассрочка или кредит
                  через банк
                </p>
              </div>
              <Link
                href="#"
                className="w-full absolute bottom-5.5 left-5.75 text-[#2c3a54] rounded-full font-bold hover:underline transition"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>

        {/* Нижний ряд */}
        <div className="flex flex-wrap -mx-2.5" style={{ display: 'flex', alignItems: 'stretch' }}>
          {/* Карточка 4: узкая */}
          <div className="w-[25%] px-2.5 mb-6">
            <div
              className="relative p-6 min-h-[250px] mx-2.5 rounded-lg bg-[#4F6BD5] flex flex-col justify-between"
              style={{ padding: "22px 22px 60px 23px", height: '100%' }}
            >
              <div className="lg:max-w-[92%]">
                <h3 className="font-bold text-lg text-white">
                  Предоставляем фото и видео отчёт
                </h3>
                <p className="text-md text-white mt-1 lg:max-w-[74%]">
                  Делаем фото на всех ключевых этапах установки
                </p>
              </div>
              <Link
                href="#"
                className="w-full absolute bottom-5.5 left-5.75 text-white rounded-full font-bold hover:underline transition"
              >
                Подробнее
              </Link>
            </div>
          </div>

          {/* Карточка 5: узкая */}
          <div className="w-[25%] px-2.5 mb-6">
            <div
              className="relative p-6 min-h-[250px] mx-2.5 rounded-lg bg-[#fff] flex flex-col justify-between"
              style={{ padding: "22px 22px 60px 23px", height: '100%' }}
            >
              <div className="lg:max-w-[92%]">
                <h3 className="font-bold text-lg text-[#2c3a54]">
                  Бесплатно рисуем 3D-проект памятника
                </h3>
                <p className="text-md text-[#2c3a54] mt-1 lg:max-w-[74%]">
                  Увидите, как будет выглядеть памятник до установки
                </p>
              </div>
              <Link
                href="#"
                className="w-full absolute bottom-5.5 left-5.75 text-[#2c3a54] rounded-full font-bold hover:underline transition"
              >
                Подробнее
              </Link>
            </div>
          </div>

          {/* Карточка 6: широкая */}
          <div className="w-[50%] px-2.5 mb-6">
            <div
              className="relative p-6 min-h-[250px] mx-2.5 rounded-lg bg-[#EAE0D5] flex flex-col justify-between"
              style={{ padding: "22px 22px 60px 23px", height: '100%' }}
            >
              <div className="flex items-start gap-4">
                <div className="max-w-[62%]">
                  <h3 className="font-bold text-lg text-[#2c3a54]">
                    Бесплатно храним готовые изделия
                  </h3>
                  <p className="text-md text-[#2c3a54] mt-1 lg:max-w-[74%]">
                    До установки или самовывоза бесплатно храним памятники на
                    складе
                  </p>
                </div>
              </div>
              <Link
                href="#"
                className="w-full absolute bottom-5.5 left-5.75 text-[#2c3a54] rounded-full font-bold hover:underline transition"
              >
                Подробнее
              </Link>
              <div className="absolute ml-auto top-[12%] right-[18px]">
                <img
                  src="/why/2.webp"
                  alt="Памятники"
                  className="max-w-[125px] lg:max-w-[260px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;