"use client";
import Link from "next/link";
import Image from "next/image";

const FooterMenu = () => {
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#e6e8ed] shadow-lg z-50">
            <div className="flex">
                {/* Главная — ссылка */}
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center w-1/4 py-2 px-2 text-center"
                >
                    <Image
                        src="/menu/home.svg"
                        alt="Главная"
                        width={25}
                        height={24}
                        className="mx-auto"
                    />
                    <span className="text-xs mt-1 text-[#2c3a54]">Главная</span>
                </Link>

                {/* Каталог — кнопка */}
                <button
                    className="flex flex-col items-center justify-center w-1/4 py-2 px-2 text-center"
                >
                    <Image
                        src="/menu/catalog.svg"
                        alt="Каталог"
                        width={25}
                        height={24}
                        className="mx-auto"
                    />
                    <span className="text-xs mt-1 text-[#2c3a54]">Каталог</span>
                </button>

                {/* Портфолио — ссылка */}
                <Link
                    href="/works"
                    className="flex flex-col items-center justify-center w-1/4 py-2 px-2 text-center"
                >
                    <Image
                        src="/menu/portfolio.svg"
                        alt="Портфолио"
                        width={25}
                        height={24}
                        className="mx-auto"
                    />
                    <span className="text-xs mt-1 text-[#2c3a54]">Портфолио</span>
                </Link>

                {/* Контакты — кнопка */}
                <button
                    className="flex flex-col items-center justify-center w-1/4 py-2 px-2 text-center"
                >
                    <Image
                        src="/menu/contacts.svg"
                        alt="Контакты"
                        width={25}
                        height={24}
                        className="mx-auto"
                    />
                    <span className="text-xs mt-1 text-[#2c3a54]">Контакты</span>
                </button>
            </div>
        </div>
    );
};

export default FooterMenu;