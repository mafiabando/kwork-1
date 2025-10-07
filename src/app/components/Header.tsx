"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { menuCategories } from "../mock/menuCategories";
import { additionalMenuItems } from "../mock/menuCategories";
import PhoneDropdown from "./PhoneDropdown";
import { useDropdown } from "../context/DropDownContext";

const PHONE_MTS = "+375 29 600-00-00";
const PHONE_A1 = "+375 33 300-00-01";

const Header = () => {
  // Состояния открытия dropdown-меню
  const [isPhoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });

  const phoneButtonRef = useRef<HTMLButtonElement>(null);
  const burgerButtonRef = useRef<HTMLButtonElement>(null);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);

  const { isBurgerDropdownOpen, toggleBurgerDropdown, closeBurgerDropdown } =
    useDropdown();

  // Рефы для каждого пункта меню
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Обработчики для каждой категории
  const handleCategoryMouseEnter = useCallback((index: number) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    setActiveCategory(menuCategories[index].name);
  }, []);

  const handleCategoryMouseLeave = useCallback(
    (index: number) => {
      timeoutIdRef.current = setTimeout(() => {
        if (activeCategory === menuCategories[index].name) {
          setActiveCategory(null);
        }
      }, 100);
    },
    [activeCategory]
  );

  // Для выпадающего меню onMouseEnter/onMouseLeave
  const handleDropdownMouseEnter = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    timeoutIdRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 100);
  }, []);

  // При изменении activeCategory — обновляем позицию
  useLayoutEffect(() => {
    if (!activeCategory) return;

    const categoryIndex = menuCategories.findIndex(
      (cat) => cat.name === activeCategory
    );
    if (categoryIndex === -1) return;

    const categoryElement = categoryRefs.current[categoryIndex];
    if (!categoryElement) return;

    const rect = categoryElement.getBoundingClientRect();
    const containerRect = headerContainerRef.current?.getBoundingClientRect();
    const containerStyle = window.getComputedStyle(headerContainerRef.current!);
    const paddingBottom = parseInt(containerStyle.paddingBottom, 10);

    // Ширина выпадающего меню (фиксированная, как в CSS)
    const dropdownWidth = 232 * 2 + 32; // grid-cols-[repeat(2,232px)] gap-4

    // Рассчитываем left так, чтобы не выходить за правый край экрана
    let left = rect.left;

    if (window.innerWidth < left + dropdownWidth) {
      left = Math.max(0, window.innerWidth - dropdownWidth - 16); // 16px отступ от края
    }

    setDropdownPosition({
      left,
      top: rect.bottom - containerRect!.top + paddingBottom,
    });
  }, [activeCategory]);

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPhoneDropdownOpen]);

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (isPhoneDropdownOpen || isBurgerDropdownOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [isPhoneDropdownOpen]);

  useEffect(() => {
  if (isBurgerDropdownOpen) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }
}, [isBurgerDropdownOpen]);

  // Обработчики кликов по кнопкам
  const PhoneDropdownClick = () => {
    setPhoneDropdownOpen((prev) => !prev);
    if (isBurgerDropdownOpen) closeBurgerDropdown(); // закрываем бургер, если открыт
  };

  const BurgerDropdownClick = () => {
    toggleBurgerDropdown();
    if (isPhoneDropdownOpen) setPhoneDropdownOpen(false); // закрываем телефон, если открыт
  };

  // По условию при ширине >=1000px выводим старую шапку
  if (windowWidth >= 1024) {
    return (
      <header className="w-full">
        {/* Верхняя строка — темно-синяя */}
        <div className="w-full bg-[#2c3a54]">
          <div className="max-w-[1300px] relative mx-auto flex justify-between items-center px-6 xl:px-8 text-white">
            <nav className="flex space-x-4 xl:space-x-6 font-[600] text-4 leading-[24px]">
              {additionalMenuItems.map((item, index) =>
                item.subcategories && item.subcategories.length > 0 ? (
                  <div key={index} className="group inline-block">
                    <button
                      className="flex items-center text-white py-1.5 hover:underline transition cursor-pointer"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {item.name}
                      <Image
                        src={"/arrow-white.svg"}
                        width={17}
                        height={17}
                        alt="arrow"
                        className="group-hover:rotate-180 transition-transform"
                      />
                    </button>

                    {/* Dropdown */}
                    <div className="absolute left-1.25 top-full mt-0 w-48 bg-[#2c3a54] border border-transparent rounded-b-md shadow-lg z-50 hidden group-hover:block focus-within:block">
                      {item.subcategories.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-[#42516c]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    href={item.href!}
                    className="py-1.5 hover:underline transition"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
            <button className="bg-[#cd5554] hover:bg-transparent font-[600] hover:text-[#cd5554] border-1 border-[#cd5554] text-white px-[19px] py-[4px] rounded-full text-sm transition">
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
                      className="group-hover:rotate-180 transition-transform"
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
        <div className="relative">
          <div className="w-full bg-white">
            <div
              ref={headerContainerRef}
              className="relative h-10 box-content max-w-[1300px] mx-auto flex justify-between items-center px-6 py-2 xl:px-8"
            >
              <div className="flex space-x-5 xl:space-x-10 text-[16px] xl:text-[18px]">
                {menuCategories.map((category, index) => (
                  <div
                    key={index}
                    className="relative group no-wrap flex items-center"
                    ref={(el) => {
                      categoryRefs.current[index] = el;
                    }} // динамический ref
                    onMouseEnter={() => handleCategoryMouseEnter(index)}
                    onMouseLeave={() => handleCategoryMouseLeave(index)}
                  >
                    {category.name === "Акции" ? (
                      <Link
                        href={category.href!}
                        className="text-[#cd5554] font-bold flex items-center hover:text-[#2c3a5499] no-wrap"
                      >
                        <Image
                          width={22}
                          height={22}
                          src={category.icon}
                          alt="Акции"
                          className="mr-2"
                        />
                        {category.name}
                      </Link>
                    ) : (
                      <>
                        <span className="font-bold text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                          {category.name}
                        </span>
                        <Image
                          src="/arrow.svg"
                          width={17}
                          height={17}
                          alt="arrow"
                          className={`transition-transform ${
                            activeCategory === category.name ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <Link
                  href="#"
                  className="hidden lg:block items-center justify-center"
                >
                  <Image
                    width={24}
                    height={24}
                    src={"/ig.svg"}
                    alt="Instagram"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Dropdowns */}
          {activeCategory &&
            (() => {
              const category = menuCategories.find(
                (cat) => cat.name === activeCategory
              );
              if (!category || !category.subcategories.length) return null;

              return (
                <div
                  className="absolute mt-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-2"
                  style={{
                    left: `${dropdownPosition.left}px`,
                    top: `${dropdownPosition.top}px`,
                    boxShadow: `0 0 30px 0 #2c3A5426`,
                  }}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <div className="grid grid-cols-[repeat(2,232px)] gap-4">
                    {category.subcategories.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        className="flex items-center space-x-2 px-2.25 py-2 hover:bg-[#f5f6fa] rounded-md"
                      >
                        <Image
                          src={sub.img}
                          alt={sub.name}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                        <span className="text-[#2c3a54]">{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })()}
        </div>
      </header>
    );
  }
  // === Ниже адаптив для < 1000px ===

  return (
    <header className="w-full select-none">
      {/* Верхняя строка (первая) */}
      <div
        className="flex justify-between items-center max-w-[1300px] mx-auto px-6 py-[10px] border-b-[1px] border-[#e3e5ef]"
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
            onClick={PhoneDropdownClick}
            className=" rounded focus:outline-none"
            title="Контакты по телефону"
          >
            <Image src="/phone.svg" alt="Телефон" width={24} height={24} />
          </button>

          {/* Кнопка бургер-меню */}
          <button
            ref={burgerButtonRef}
            aria-haspopup="true"
            aria-expanded={isBurgerDropdownOpen}
            onClick={BurgerDropdownClick}
            type="button"
            className="rounded focus:outline-none"
            title="Меню"
          >
            <Image
              src={isBurgerDropdownOpen ? "/close.svg" : "/burger.svg"}
              alt={isBurgerDropdownOpen ? "Закрыть меню" : "Меню"}
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Затемнение экрана */}
        {isPhoneDropdownOpen && (
          <div
            className="fixed inset-0 bg-black opacity-15 z-40 pointer-events-auto"
            style={{ top: "160px" }} // Высота Header
            onClick={() => {
              setPhoneDropdownOpen(false);
              closeBurgerDropdown();
            }}
          ></div>
        )}

        {/* Dropdown меню кнопки телефона */}
        <PhoneDropdown
          ref={phoneDropdownRef}
          isPhoneDropdownOpen={isPhoneDropdownOpen}
          PHONE_MTS={PHONE_MTS}
          PHONE_A1={PHONE_A1}
        />
      </div>

      {/* Нижняя строка (вторая белая строка) */}
      <div
        className="flex justify-between items-center max-w-[1300px] mx-auto px-4 py-2.5"
        style={{ height: "40-50px" }}
      >
        {/* Слева - МТС */}
        <a
          href={`tel:${PHONE_MTS.replace(/[\s-]/g, "")}`}
          className="flex items-center space-x-1 text-[#2c3a54] hover:underline"
          aria-label={`Позвонить на номер ${PHONE_MTS}`}
        >
          <div className="relative">
            <Image
              width={20}
              height={20}
              src="/mts.svg"
              alt="MTS"
              objectFit="contain"
            />
          </div>
          <span className="text-sm font-medium">{PHONE_MTS}</span>
        </a>

        {/* Справа - A1 */}
        <a
          href={`tel:${PHONE_A1.replace(/[\s-]/g, "")}`}
          className="flex items-center space-x-1 text-[#2c3a54] font-normal text-center hover:underline"
          aria-label={`Позвонить на номер ${PHONE_A1}`}
        >
          <div className="relative">
            <Image
              width={20}
              height={20}
              src="/a1.webp"
              alt="A1"
              objectFit="contain"
            />
          </div>
          <span className="text-sm font-medium">{PHONE_A1}</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
