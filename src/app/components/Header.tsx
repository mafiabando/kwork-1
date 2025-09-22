import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full">
      {/* Верхняя строка — темно-синяя */}
      <div className="w-full bg-[#2c3a54]">
        <div className="max-w-[1300px] mx-auto flex justify-between items-center px-6 py-2 text-white">
          <nav className="flex space-x-6 text-[16px] leading-8 font-normal">
            <div className="relative group inline-block">
              <button
                className="flex items-center text-white hover:underline transition cursor-pointer"
                aria-haspopup="true"
                aria-expanded="false"
              >
                О компании
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 inline ml-1 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
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
            <Link href="/granite-types" className="hover:underline transition">
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
        <div className="max-w-[1300px] mx-auto flex justify-between h-[80px] items-center px-6">
          <div className="flex justify-between items-center w-full">
            <Image
              width={232}
              height={48}
              src={"/logo_kamenaya_roza.svg"}
              alt="logo"
            />

            {/* Рассрочка */}
            <div className="hidden md:flex items-center">
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
              <span>
                Минск, пр-т Любимова 26, <br /> корпус 3
              </span>
            </div>

            {/* Работаем до 19:00 + телефоны */}
            <div className="flex flex-col items-start text-sm text-[#2c3a54]">
              <div className="relative group mx-auto inline-block">
                <button
                  className="flex items-center text-[#2c3a54] hover:text-[#1a2a4a] transition"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="w-2 h-2 bg-[#0bc048] mr-3 rounded-full"></span>
                  <span>Работаем до 19:00</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
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
              <div className="flex space-x-3 mt-1 font-bold text-[16px]">
                <span>+375 33 677-01-66</span>
                <span>+375 29 182-01-66</span>
              </div>
            </div>

            {/* Есть вопросы? Задайте Online */}
            <div className="flex items-center justify-between text-sm gap-3 text-[#2c3a54]">
              <div>
                <div>Есть вопросы?</div>
                <div className="font-bold">Задайте Online</div>
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
        <div className="max-w-[1300px] mx-auto flex justify-between items-center px-6 py-2">
          <div className="flex space-x-10 text-[18px]">
            <Link
              href="/sales"
              className="text-[#cd5554] font-semibold flex items-center hover:text-[#2c3a5499]"
            >
              <Image
                    width={22}
                    height={22}
                    src={"/percent.svg"}
                    alt="Telegram"
                    className="mr-2"
                  /> Акции
            </Link>
            <div className="relative group">
              <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                Памятники
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline ml-1 text-[#2c3a54]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative group">
              <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                Ограды
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline ml-1 text-[#2c3a54]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative group">
              <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                Аксессуары
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline ml-1 text-[#2c3a54]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative group">
              <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                Благоустройство
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline ml-1 text-[#2c3a54]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative group">
              <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                Услуги
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline ml-1 text-[#2c3a54]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="relative group">
              <span className="font-medium text-[#2c3a54] hover:text-[#2c3a5499] cursor-pointer">
                Оформление памятников
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline ml-1 text-[#2c3a54]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="rounded-full flex items-center justify-center text-white"
            >
              <Image width={24} height={24} src={"/ig.svg"} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
