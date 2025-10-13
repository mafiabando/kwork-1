"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Cards = () => {
    return (
        <section className="max-w-[1300px]">
            {/* Родительский контейнер для карточек */}
            <div className="flex flex-col md:flex-row lg:-mx-2.5 flex-wrap space-y-5 md:space-y-0 font-[600]">
                {/* Карточка 1: Контакты */}
                <div className="w-full lg:px-2.5 md:w-1/3 text-[#2c3a54] shadow-sm lg:shadow-none overflow-hidden flex flex-col">
                    <div className="p-5 border-r-1 border-r-gray-100 lg:border-r-0 lg:shadow-sm flex-grow flex flex-col">
                        <span className="text-sm text-[#969ead]">Контакты</span>
                        <div className="flex flex-col mt-2.5">
                            <div className="flex space-x-2.5">
                                <a href="tel+375333226652" className="text-xl lg:text-[16px]">+375 33 322-66-52</a>
                                <span className="text-sm self-center">МТС</span>
                            </div>
                            <div className="flex space-x-2.5 ">
                                <a href="tel+375296226645" className="text-xl lg:text-[16px]">+375 29 622-66-45</a>
                                <span className="text-sm self-center">А1</span>
                            </div>
                        </div>
                        <a className="mt-0.75  hover:underline"
                            href="mailto:stonerose@gmail.com"
                        >
                            stonerose@gmail.com
                        </a>
                        <div className="flex space-x-1.25 mt-2.5">
                            <Link
                                href="#"
                                className="rounded-full flex items-center justify-center"
                            >
                                <Image
                                    width={28}
                                    height={28}
                                    src={"/viber.svg"}
                                    alt="Viber"
                                />
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full flex items-center justify-center"
                            >
                                <Image
                                    width={28}
                                    height={28}
                                    src={"/tm.svg"}
                                    alt="Telegram"
                                />
                            </Link>
                            <Link
                                href="#"
                                className="rounded-full flex items-center justify-center"
                            >
                                <Image
                                    width={28}
                                    height={28}
                                    src={"/wa.svg"}
                                    alt="WhatsApp"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Карточка 2: Адрес */}
                <div className="w-full lg:px-2.5 md:w-1/3 text-[#2c3a54] shadow-sm lg:shadow-none overflow-hidden flex flex-col">
                    <div className="p-5 border-r-1 border-r-gray-100 lg:border-r-0 lg:shadow-sm bg-white flex-grow flex flex-col">
                        <span className="text-sm text-[#969ead]">Адрес</span>
                        <div className="mt-2.5">
                            <p>220117, Республика Беларусь, г. Витебск, ул. Терешковой 9Б</p>
                        </div>
                    </div>
                </div>

                {/* Карточка 3: Время работы */}
                <div className="w-full lg:px-2.5 md:w-1/3 text-[#2c3a54] shadow-sm lg:shadow-none overflow-hidden flex flex-col"> 
                    <div className="p-5 lg:shadow-sm bg-white flex-grow flex flex-col">
                        <span className="text-sm text-[#969ead]">Время работы</span>
                        <div className="mt-2.5">
                            <p>Пн-пт с 10:00 до 19:00</p>
                            <p>Сб с 10:00 до 15:00</p>
                            <p>Вскр выходной</p>
                        </div>
                        <span className="mt-2.5 text-sm text-[#969ead] ">
                            Прием заявок через сайт осуществляется круглосуточно
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cards;