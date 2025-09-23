"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const PHONE_MTS = "+375 29 600-00-00";
const PHONE_A1 = "+375 33 300-00-01";

const Header = () => {
  // Состояния открытия dropdown-меню
  const [isPhoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [isBurgerDropdownOpen, setBurgerDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const burgerDropdownRef = useRef<HTMLDivElement>(null);

  // Отслеживаем ширину окна
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isPhoneDropdownOpen &&
        phoneDropdownRef.current &&
        phoneButtonRef.current &&
        !phoneDropdownRef.current.contains(target) &&
        !phoneButtonRef.current.contains(target)
      ) {
        setPhoneDropdownOpen(false);
      }
      if (
        isBurgerDropdownOpen &&
        burgerDropdownRef.current &&
        burgerButtonRef.current &&
        !burgerDropdownRef.current.contains(target) &&
        !burgerButtonRef.current.contains(target)
      ) {
        setBurgerDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPhoneDropdownOpen, isBurgerDropdownOpen]);

  // Обработчики кликов по кнопкам
  const onPhoneClick = () => {
    setPhoneDropdownOpen((prev) => !prev);
    if (!isPhoneDropdownOpen) setBurgerDropdownOpen(false);
  };
  const onBurgerClick = () => {
    setBurgerDropdownOpen((prev) => !prev);
    if (!isBurgerDropdownOpen) setPhoneDropdownOpen(false);
  };

  // По условию при ширине >=1000px выводим старую шапку
  if (windowWidth >= 1000) {
    return (
      <header className="w-full">
        {/* Верхняя строка — темно-синяя */}
        <div className="w-full bg-[#2c3a54]">
          <div className="max-w-[1300px] mx-auto flex justify-between items-center px-6 py-2 xl:px-8 text-white">
            <nav className="flex space-x-4 xl:space-x-6 text-4 leading-8 font-normal">
              <div className="relative group inline-block">
                <button
                  className="flex items-center text-white hover:underline transition cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  О компании
                  <Image
                    src={"/arrow-white.svg"}
                    width={17}
                    height={17}
                    alt="arrow"
                  />
                </button>

                {/* Dropdown */}
                <div className="absolute left-0 top-full mt-0 w-48 bg-[#2c3a54] border border-transparent rounded-md shadow-lg z-50 hidden group-hover:block focus-within:block">
                  <Link
                    href="/privacy-policy"
                    className="block px-4 py-2 text-sm text-white hover:bg-[#42516c]"
                  >
                    Политика конфиденциальности
                  </Link>
                </div>
              </div>
              <Link href="/works" className="hover:underline transition">
                Наши работы
              </Link>
              <Link href="/payment" className="hover:underline transition">
                Оплата и доставка
              </Link>
              <Link href="/blog" className="hover:underline transition">
                Блог
              </Link>
              <Link
                href="/granite-types"
                className="hover:underline transition"
              >
                Виды гранита
              </Link>
              <Link href="/favorites" className="hover:underline transition">
                Избранное
              </Link>
              <Link href="/contacts" className="hover:underline transition">
                Контакты
              </Link>
            </nav>
            <button className="bg-[#cd5554] hover:bg-transparent hover:text-[#cd5554] border-1 border-[#cd5554] text-white px-[19px] py-[4px] rounded-full text-sm font-medium transition">
              Заказать звонок
            </button>
          </div>
        </div>

        {/* Средняя полоса — фон #f5f6fa */}
        <div className="w-full bg-[#f5f6fa] border-b border-gray-200">
          <div className="max-w-[1300px] mx-auto flex justify-between h-[80px] items-center px-6 xl:px-8">
            <div className="flex justify-between items-center w-full">
              <Link href={"/"}>
                <Image
                  width={200}
                  height={48}
                  src={"/logo_kamenaya_roza.svg"}
                  alt="logo"
                />
              </Link>
              {/* Рассрочка */}
              <div className="hidden xl:flex items-center ">
                <Link
                  href={"/"}
                  className="bg-transparent border-3 border-[#2c3a54] hover:bg-[#2c3a54] hover:text-white rounded-full px-[19px] py-2 text-[14px] leading-7 font-bold text-[#2c3a54]"
                >
                  Рассрочка 0%
                </Link>
              </div>

              {/* Адрес */}
              <div className="flex items-center space-x-2 text-sm text-[#2c3a54]">
                <Image width={28} height={28} src={"/map.svg"} alt="Map" />
                <span>Витебск, ул. Терешковой 9В</span>
              </div>

              {/* Работаем до 19:00 + телефоны */}
              <div className="flex flex-col items-start text-sm text-[#2c3a54]">
                <div className="relative group mx-auto inline-block">
                  <button
                    className="flex items-center text-[#2c3a54] hover:text-[#1a2a4a] transition"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="w-2 h-2 bg-[#0bc048] mr-2 xl:mr-3 rounded-full"></span>
                    <span>Работаем до 19:00</span>
                    <Image
                      src={"/arrow.svg"}
                      width={17}
                      height={17}
                      alt="arrow"
                    />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-0 w-max bg-[#f5f6fa] border border-gray-200 rounded-md shadow-lg z-50 hidden group-hover:block focus-within:block">
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
                <div className="flex space-x-3 mt-1 font-bold text-3.5 xl:text-4">
                  <span>+375 29 600-00-00</span>
                  <span>+375 33 300-00-01</span>
                </div>
              </div>

              {/* Есть вопросы? Задайте Online */}
              <div className="flex items-center justify-between text-sm gap-3 text-[#2c3a54]">
                <div>
                  <div>Есть вопросы?</div>
                  <div className="font-bold leading-3.5">Задайте Online</div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="rounded-full flex items-center justify-center text-white "
                  >
                    <Image
                      width={29}
                      height={29}
                      src={"/viber.svg"}
                      alt="Viber"
                    />
                  </a>
                  <a
                    href="#"
                    className="rounded-full flex items-center justify-center text-white"
                  >
                    <Image
                      width={28}
                      height={28}
                      src={"/tm.svg"}
                      alt="Telegram"
                    />
                  </a>
                  <a
                    href="#"
                    className="rounded-full flex items-center justify-center text-white"
                  >
                    <Image
                      width={28}
                      height={28}
                      src={"/wa.svg"}
                      alt="WhatsApp"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя строка — белая */}
        <div className="w-full bg-white border-b border-gray-200">
          <div className="max-w-[1300px] mx-auto flex justify-between items-center px-6 py-2 xl:px-8">
            <div className="flex space-x-5 xl:space-x-10 text-[16px] xl:text-[18px]">
              <Link
                href="/sales"
                className="text-[#cd5554] font-semibold flex items-center hover:text-[#2c3a5499] no-wrap"
              >
                <Image
                  width={22}
                  height={22}
                  src={"/percent.svg"}
                  alt="Telegram"
                  className="mr-2"
                />{" "}
                Акции
              </Link>
              <div className="relative group no-wrap flex items-center">
                <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer ">
                  Памятники
                </span>
                <Image src={"/arrow.svg"} width={17} height={17} alt="arrow" />
              </div>
              <div className="relative group no-wrap flex items-center">
                <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                  Ограды
                </span>
                <Image src={"/arrow.svg"} width={17} height={17} alt="arrow" />
              </div>
              <div className="relative group no-wrap flex items-center">
                <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                  Аксессуары
                </span>
                <Image src={"/arrow.svg"} width={17} height={17} alt="arrow" />
              </div>
              <div className="relative group no-wrap flex items-center">
                <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                  Благоустройство
                </span>
                <Image src={"/arrow.svg"} width={17} height={17} alt="arrow" />
              </div>
              <div className="relative group no-wrap flex items-center">
                <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                  Услуги
                </span>
                <Image src={"/arrow.svg"} width={17} height={17} alt="arrow" />
              </div>
              <div className="relative group no-wrap flex items-center">
                <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                  Оформление памятников
                </span>
                <Image src={"/arrow.svg"} width={17} height={17} alt="arrow" />
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="#"
                className="hidden lg:block flex items-center justify-center"
              >
                <Image width={24} height={24} src={"/ig.svg"} alt="Instagram" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }
  // === Ниже адаптив для < 1000px ===

  return (
    <header className="w-full bg-white border-b border-gray-200 select-none">
      {/* Верхняя строка (первая) */}
      <div
        className="flex justify-between items-center max-w-[1300px] mx-auto px-6 py-[10px] border-[1px] border-[#e3e5ef]"
        style={{ height: "60-70px" }}
      >
        {/* Логотип слева */}
        <Link aria-label="На главную" className="flex items-center" href="/">
          <Image
            src="/logo_kamenaya_roza.svg"
            alt="logo"
            width={192}
            height={28}
          />
        </Link>

        {/* Кнопки справа */}
        <div className="flex items-center space-x-4">
          {/* Кнопка телефона */}
          <button
            ref={phoneButtonRef}
            aria-haspopup="true"
            aria-expanded={isPhoneDropdownOpen}
            aria-controls="phone-dropdown"
            onClick={onPhoneClick}
            className=" rounded focus:outline-none focus:ring-2 focus:ring-[#cd5554]"
            title="Контакты по телефону"
          >
            <Image src="/phone.svg" alt="Телефон" width={30} height={30} />
          </button>

          {/* Кнопка бургер-меню */}
          <button
            ref={burgerButtonRef}
            aria-haspopup="true"
            aria-expanded={isBurgerDropdownOpen}
            aria-controls="burger-dropdown"
            onClick={onBurgerClick}
            className="rounded focus:outline-none focus:ring-2 focus:ring-[#cd5554]"
            title="Меню"
          >
            <Image
              src={isBurgerDropdownOpen ? "/close.svg" : "/burger.svg"}
              alt={isBurgerDropdownOpen ? "Закрыть меню" : "Меню"}
              width={30}
              height={30}
            />
          </button>
        </div>

        {/* Dropdown меню кнопки телефона */}
        {isPhoneDropdownOpen && (
          <div
            id="phone-dropdown"
            ref={phoneDropdownRef}
            role="menu"
            aria-label="Контактная информация"
            className="
      absolute top-[98px] right-0 left-0 
      z-50 
      bg-white 
      shadow-md 
      max-w-[1300px]
      mx-auto
      font-sans 
      text-sm 
      text-[#2c3a54]
      "
            style={{
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            }}
          >
            {/* Номера */}
            <div className="flex flex-col border-b border-gray-200 text-[20px]">
              <a
                href={`tel:${PHONE_MTS.replace(/[\s-]/g, "")}`}
                className="flex justify-between items-center hover:bg-[#f8faff] px-5 py-3"
                role="menuitem"
              >
                <div className="flex items-center space-x-2">
                  <span>{PHONE_MTS}</span>
                </div>
                <span className="text-gray-500 font-medium">MTS</span>
              </a>
            </div>
            <div className="flex flex-col border-b border-gray-200 text-[20px]">
              <a
                href={`tel:${PHONE_A1.replace(/[\s-]/g, "")}`}
                className="flex justify-between items-center hover:bg-[#f8faff] px-5 py-3"
                role="menuitem"
              >
                <div className="flex items-center space-x-2">
                  <span>{PHONE_A1}</span>
                </div>
                <span className="text-gray-500 font-medium">A1</span>
              </a>
            </div>

            {/* Мессенджеры с подписями */}
            <div className="flex justify-between border-b border-gray-200 items-center px-5 py-3">
              <div className="flex gap-2.5 items-center space-y-1 text-center">
                <a
                  href="viber://chat?number=%2B375336770166"
                  aria-label="Viber"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Image src="/viber.svg" alt="Viber" width={28} height={28} />
                </a>
                <span className="text-xs text-[#2c3a54]">Viber</span>
              </div>
              <div className="flex gap-2.5 items-center space-y-1 text-center">
                <a
                  href="tg://resolve?domain=centrgranit"
                  aria-label="Telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Image src="/tm.svg" alt="Telegram" width={28} height={28} />
                </a>
                <span className="text-xs text-[#2c3a54]">Telegram</span>
              </div>
              <div className="flex gap-2.5 items-center space-y-1 text-center">
                <a
                  href="whatsapp://send?phone=+375336770166"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                >
                  <Image src="/wa.svg" alt="WhatsApp" width={28} height={28} />
                </a>
                <span className="text-xs text-[#2c3a54]">WhatsApp</span>
              </div>
            </div>

            {/* Адрес и график с flex */}
            <div className="flex justify-between items-start text-sm px-5 py-3.75">
              <div>
                <div className="flex items-center space-x-2">
                  <Image src="/map.svg" alt="Адрес" width={20} height={20} />
                  <span className="font-semibold text-[16px] leading-4">
                    Минск, пр-т Любимова 26, корпус 3
                  </span>
                </div>
                <div className="mt-3 mb-1.5 flex space-x-2">
                  <Image
                    src="/timer.svg"
                    alt="Адрес"
                    width={20}
                    height={20}
                    className="self-start pt-0.75"
                  />
                  <div className="leading-4.25 space-y-0.5">
                    <p>
                      <strong>Пн–Пт:</strong> 10:00 – 19:00
                    </p>
                    <p>
                      <strong>Сб:</strong> 10:00 – 15:00
                    </p>
                    <p>
                      <strong>Вс:</strong> выходной
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/contacts"
                className="text-[#c24242] text-sm underline cursor-pointer self-end"
              >
                Все контакты
              </Link>
            </div>

            {/* Нижняя кнопка на всю ширину */}
            <button
              className="w-full bg-[#2c3a54] text-white text-[16px] font-bold px-2.5 py-3.5"
              onClick={() => (window.location.href = "/order-call")}
            >
              Заказать звонок
            </button>
          </div>
        )}
        {/* Dropdown меню бургер */}
        {isBurgerDropdownOpen && (
          <div
            id="burger-dropdown"
            ref={burgerDropdownRef}
            role="menu"
            aria-label="Основное меню"
            className="
      absolute top-[98px] left-0 right-0
      z-50
      bg-white
      rounded-xl
      shadow-md
      max-w-[1300px]
      mx-auto
      font-sans
      text-sm
      text-[#2c3a54]
      overflow-auto
      max-h-[75vh]
      "
            style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)" }}
          >
            <nav>
              <ul className="divide-y divide-gray-200">
                {/* Акции */}
                <li className="border-b border-gray-200">
                  <Link
                    href="/sales"
                    role="menuitem"
                    className="block px-6 py-3 font-semibold text-[#cd5554] hover:underline gap-4 flex"
                  >
                    <Image
                      src="/percent.svg"
                      alt="Процент"
                      width={26}
                      height={26}
                    />{" "}
                    Акции
                  </Link>
                </li>
                {/* Памятники */}

                <li className="border-b border-gray-200">
                  <details>
                    <summary className="flex justify-between items-center cursor-pointer pr-5 pl-2 py-1.25 font-medium text-[#2c3a54] hover:text-[#2c3a5499] select-none">
                      <div className="flex items-center space-x-2.5">
                        <Image
                          src="/monuments.webp"
                          alt="Памятники"
                          width={46}
                          height={46}
                        />

                        <span>Памятники</span>
                      </div>

                      <Image
                        src="/arrow.svg"
                        alt="Раскрыть"
                        width={20}
                        height={20}
                      />
                    </summary>

                    <ul>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-y border-gray-200">
                        <Link
                          href="/monuments/single"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Одиночные
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monuments/double"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Двойные
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monuments/exclusive"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Эксклюзивные
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monuments/cheap"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Недорогие
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monuments/cross"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          В виде креста
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monuments/heart"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          В виде сердца
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monuments/kids"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Детские
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monuments/memorial"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Мемориальные комплексы
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3">
                        <Link
                          href="/monuments/glass"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Со стеклом
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>

                {/* Ограды */}

                <li className="border-b border-gray-200">
                  <details>
                    <summary className="flex justify-between items-center cursor-pointer pr-5 pl-2 py-1.25 font-medium text-[#2c3a54] hover:text-[#2c3a5499] select-none">
                      <div className="flex items-center space-x-2.5">
                        <Image
                          src="/fences.webp"
                          alt="Ограды"
                          width={46}
                          height={46}
                        />

                        <span>Ограды</span>
                      </div>

                      <Image
                        src="/arrow.svg"
                        alt="Раскрыть"
                        width={20}
                        height={20}
                      />
                    </summary>

                    <ul>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-y border-gray-200">
                        <Link
                          href="/fences/granite"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Гранитные ограды
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/fences/forged"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Кованые ограды
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3">
                        <Link
                          href="/fences/metal"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Металлические ограды
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>

                {/* Аксессуары */}

                <li className="border-b border-gray-200">
                  <details>
                    <summary className="flex justify-between items-center cursor-pointer pr-5 pl-2 py-1.25 font-medium text-[#2c3a54] hover:text-[#2c3a5499] select-none">
                      <div className="flex items-center space-x-2.5">
                        <Image
                          src="/accessories.webp"
                          alt="Аксессуары"
                          width={46}
                          height={46}
                        />

                        <span>Аксессуары</span>
                      </div>

                      <Image
                        src="/arrow.svg"
                        alt="Раскрыть"
                        width={20}
                        height={20}
                      />
                    </summary>

                    <ul>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-y border-gray-200">
                        <Link
                          href="/accessories/vases"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Вазы
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/accessories/lamps"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Лампы
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/accessories/sculptures"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Скульптуры
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/accessories/frames"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Рамки
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/accessories/bronze"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Изделия из бронзы
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/accessories/plates"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Надгробные плиты
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3">
                        <Link
                          href="/accessories/tables"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Гранитные таблички
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>

                {/* Благоустройство */}

                <li className="border-b border-gray-200">
                  <details>
                    <summary className="flex justify-between items-center cursor-pointer pr-5 pl-2 py-1.25 font-medium text-[#2c3a54] hover:text-[#2c3a5499] select-none">
                      <div className="flex items-center space-x-2.5">
                        <Image
                          src="/landscape.webp"
                          alt="Благоустройство"
                          width={46}
                          height={46}
                        />

                        <span>Благоустройство</span>
                      </div>

                      <Image
                        src="/arrow.svg"
                        alt="Раскрыть"
                        width={20}
                        height={20}
                      />
                    </summary>

                    <ul>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-y border-gray-200">
                        <Link
                          href="/landscape/graves"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Благоустройство могил
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/landscape/foundation"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Фундамент для памятников
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/landscape/tiles"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Укладка плитки
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/landscape/tables"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Столы и скамейки
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/landscape/gravel"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Щебень декоративный
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3">
                        <Link
                          href="/landscape/lawn"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Искусственный газон
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>

                {/* Услуги */}

                <li className="border-b border-gray-200">
                  <details>
                    <summary className="flex justify-between items-center cursor-pointer pr-5 pl-2 py-1.25 font-medium text-[#2c3a54] hover:text-[#2c3a5499] select-none">
                      <div className="flex items-center space-x-2.5">
                        <Image
                          src="/services.webp"
                          alt="Услуги"
                          width={46}
                          height={46}
                        />

                        <span>Услуги</span>
                      </div>

                      <Image
                        src="/arrow.svg"
                        alt="Раскрыть"
                        width={20}
                        height={20}
                      />
                    </summary>

                    <ul>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-y border-gray-200">
                        <Link
                          href="/services/monument-installation"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Установка памятников
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/services/fence-installation"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Установка оград
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/services/monument-production"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Изготовление памятников
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/services/monument-dismantle"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Демонтаж памятников
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/services/3d-modeling"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          3D-моделирование
                        </Link>
                      </li>

                      <li className="bg-[#f5f6fa] pl-16 py-3">
                        <Link
                          href="/services/monument-design"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Оформление памятников
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                {/* Оформление памятников */}
                <li className="border-b border-gray-200">
                  <details>
                    <summary className="flex justify-between items-center cursor-pointer pr-5 pl-2 py-1.25 font-medium text-[#2c3a54] hover:text-[#2c3a5499] select-none">
                      <div className="flex items-center space-x-2.5">
                        <Image
                          src="/design.webp"
                          alt="Оформление памятников"
                          width={46}
                          height={46}
                        />
                        <span>Оформление памятников</span>
                      </div>
                      <Image
                        src="/arrow.svg"
                        alt="Раскрыть"
                        width={20}
                        height={20}
                      />
                    </summary>
                    <ul>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-y border-gray-200">
                        <Link
                          href="/monument-design/epitaphs"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Эпитафии
                        </Link>
                      </li>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monument-design/portrait-engraving"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Гравировка портрета
                        </Link>
                      </li>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-b border-gray-200">
                        <Link
                          href="/monument-design/medallions"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Медальоны на памятник
                        </Link>
                      </li>
                      <li className="bg-[#f5f6fa] pl-16 py-3">
                        <Link
                          href="/monument-design/text-engraving"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Гравировка текста
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                {/* Избранное */}
                <li className="border-b border-gray-200">
                  <Link
                    href="/favorites"
                    role="menuitem"
                    className="flex items-center space-x-6 px-5 py-3 font-medium text-[#2c3a54] hover:text-[#2c3a5499]"
                  >
                    <Image
                      src="/star.svg"
                      alt="Избранное"
                      width={20}
                      height={20}
                    />
                    <span>Избранное</span>
                  </Link>
                </li>
                {/* О компании с подменю */}
                <li className="border-b border-gray-200">
                  <details>
                    <summary className="flex justify-between items-center cursor-pointer px-5 py-3 font-medium text-[#2c3a54] hover:text-[#2c3a5499] select-none">
                      <div className="flex items-center space-x-6">
                        <Image
                          src="/about.svg"
                          alt="О компании"
                          width={20}
                          height={20}
                        />
                        <span>О компании</span>
                      </div>
                      <Image
                        src="/arrow.svg"
                        alt="Раскрыть"
                        width={20}
                        height={20}
                      />
                    </summary>
                    <ul>
                      <li className="bg-[#f5f6fa] pl-16 py-3 border-t border-gray-200">
                        <Link
                          href="/privacy-policy"
                          role="menuitem"
                          className="block hover:underline text-[#2c3a54]"
                        >
                          Политика конфиденциальности
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                {/* Наши работы */}
                <li className="border-b border-gray-200">
                  <Link
                    href="/works"
                    role="menuitem"
                    className="flex items-center space-x-6 px-5 py-3 font-medium text-[#2c3a54] hover:text-[#2c3a5499]"
                  >
                    <Image
                      src="/works.svg"
                      alt="Наши работы"
                      width={20}
                      height={20}
                    />
                    <span>Наши работы</span>
                  </Link>
                </li>
                {/* Оплата и доставка */}
                <li className="border-b border-gray-200">
                  <Link
                    href="/payment"
                    role="menuitem"
                    className="flex items-center space-x-6 px-5 py-3 font-medium text-[#2c3a54] hover:text-[#2c3a5499]"
                  >
                    <Image
                      src="/payment.svg"
                      alt="Оплата и доставка"
                      width={20}
                      height={20}
                    />
                    <span>Оплата и доставка</span>
                  </Link>
                </li>
                {/* Блог */}
                <li className="border-b border-gray-200">
                  <Link
                    href="/blog"
                    role="menuitem"
                    className="flex items-center space-x-6 px-5 py-3 font-medium text-[#2c3a54] hover:text-[#2c3a5499]"
                  >
                    <Image src="/blog.svg" alt="Блог" width={20} height={20} />
                    <span>Блог</span>
                  </Link>
                </li>
                {/* Виды гранита */}
                <li className="border-b border-gray-200">
                  <Link
                    href="/granite"
                    role="menuitem"
                    className="flex items-center space-x-6 px-5 py-3 font-medium text-[#2c3a54] hover:text-[#2c3a5499]"
                  >
                    <Image
                      src="/granite.svg"
                      alt="Виды гранита"
                      width={20}
                      height={20}
                    />
                    <span>Виды гранита</span>
                  </Link>
                </li>
                {/* Контакты */}
                <li className="border-b border-gray-200">
                  <Link
                    href="/contacts"
                    role="menuitem"
                    className="flex items-center space-x-6 px-5 py-3 font-medium text-[#2c3a54] hover:text-[#2c3a5499]"
                  >
                    <Image
                      src="/contacts.svg"
                      alt="Контакты"
                      width={20}
                      height={20}
                    />
                    <span>Контакты</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Нижняя часть с контактами */}
            <div className="pt-8 px-4.5 pb-4 text-sm text-[#2c3a54]">
              {/* Телефоны */}
              <div className="flex space-x-2.5">
                <a
                  href={`tel:${PHONE_MTS.replace(/[\s-]/g, "")}`}
                  className="flex items-center space-x-2 hover:underline"
                  role="menuitem"
                >
                  <span>{PHONE_MTS}</span>
                </a>
                <span>MTS</span>
              </div>
              <div className="flex space-x-2.5">
                <a
                  href={`tel:${PHONE_A1.replace(/[\s-]/g, "")}`}
                  className="flex items-center space-x-2 hover:underline"
                  role="menuitem"
                >
                  <span>{PHONE_A1}</span>
                </a>
                <span>A1</span>
              </div>

              {/* Мессенджеры */}
              <div className="flex space-x-3 mt-2.5">
                <button
                  className="bg-[#2c3a54] text-white px-3.25 py-1.25 text-sm rounded-[42px]"
                  onClick={() => (window.location.href = "/order-call")}
                >
                  Заказать звонок
                </button>
                <a
                  href="viber://chat?number=%2B375336770166"
                  aria-label="Viber"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/viber.svg" alt="Viber" width={28} height={28} />
                </a>
                <a
                  href="tg://resolve?domain=centrgranit"
                  aria-label="Telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/tm.svg" alt="Telegram" width={28} height={28} />
                </a>
                <a
                  href="whatsapp://send?phone=+375336770166"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/wa.svg" alt="WhatsApp" width={28} height={28} />
                </a>
              </div>

              {/* График */}
              <div className="mt-5 leading-4.5">
                <p>Пн-пт 10:00 до 19:00</p>
                <p>Сб 10:00 до 15:00</p>
                <p>Вскр выходной</p>
              </div>

              {/* Instagram */}
              <Link href="#" className="block mt-3.75 items-center">
                <Image width={24} height={24} src={"/ig.svg"} alt="Instagram" />
              </Link>

              {/* Адрес */}
              <div className="flex items-center mt-5.25 text-[16px] text-[#2c3a54]">
                <span>Минск, пр-т Любимова 26, корпус 3</span>
              </div>

              {/* Кнопка и ссылка внизу */}
              <div className="flex justify-between items-center leading-[23px]">
                <Link
                  href="/contacts"
                  className="text-[#cd5554] underline text-sm"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Нижняя строка (вторая белая строка) */}
      <div
        className="flex justify-between items-center max-w-[1300px] mx-auto px-4 py-2.5"
        style={{ height: "40-50px" }}
      >
        {/* Слева - МТС */}
        <a
          href={`tel:${PHONE_MTS.replace(/[\s-]/g, "")}`}
          className="flex items-center space-x-2 text-[#2c3a54] hover:underline"
          aria-label={`Позвонить на номер ${PHONE_MTS}`}
        >
          <div className="w-6 h-6 relative">
            <Image src="/mts.svg" alt="MTS" layout="fill" objectFit="contain" />
          </div>
          <span className="text-sm font-medium">{PHONE_MTS}</span>
        </a>

        {/* Справа - A1 */}
        <a
          href={`tel:${PHONE_A1.replace(/[\s-]/g, "")}`}
          className="flex items-center space-x-2 text-[#2c3a54] hover:underline"
          aria-label={`Позвонить на номер ${PHONE_A1}`}
        >
          <div className="w-6 h-6 relative">
            <Image src="/a1.webp" alt="A1" layout="fill" objectFit="contain" />
          </div>
          <span className="text-sm font-medium">{PHONE_A1}</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
