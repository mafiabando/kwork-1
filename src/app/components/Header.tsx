import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full">
      {/* Верхняя строка — темно-синяя */}
      <div className="bg-[#2c3a54] text-white flex justify-between items-center px-17.5">
        <nav className="flex space-x-6 text-[16px] leading-[32px] font-medium py-[6px]">
          <Link href="/about" className="hover:text-gray-200 transition">О компании</Link>
          <Link href="/works" className="hover:text-gray-200 transition">Наши работы</Link>
          <Link href="/payment" className="hover:text-gray-200 transition">Оплата и доставка</Link>
          <Link href="/blog" className="hover:text-gray-200 transition">Блог</Link>
          <Link href="/granite-types" className="hover:text-gray-200 transition">Виды гранита</Link>
          <Link href="/favorites" className="hover:text-gray-200 transition">Избранное</Link>
          <Link href="/contacts" className="hover:text-gray-200 transition">Контакты</Link>
        </nav>
        <button className="bg-[#cd5554] hover:bg-[#b84444] text-white px-[19px] py-[4px] rounded-full text-sm font-medium transition">
          Заказать звонок
        </button>
      </div>

      {/* Средняя полоса — фон #f5f6fa */}
      <div className="bg-[#f5f6fa] border-b border-gray-200 px-17.5">
        <div className="flex justify-between items-center">
          {/* Логотип и название */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#2c3a54] text-white flex items-center justify-center font-bold text-xl">
              Ц
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2c3a54]">ЦЕНТРГРАНИТ</h1>
              <p className="text-xs text-[#2c3a54] uppercase tracking-wider">гранитная мастерская</p>
            </div>
          </div>

          {/* Рассрочка */}
          <div className="hidden md:flex items-center">
            <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-[#2c3a54]">
              Рассрочка 0%
            </div>
          </div>

          {/* Адрес */}
          <div className="flex items-center space-x-2 text-sm text-[#2c3a54]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2c3a54]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Минск, пр-т Любимова 26, корпус 3</span>
          </div>

          {/* Работаем до 19:00 + телефоны */}
          <div className="flex flex-col items-start text-sm text-[#2c3a54]">
            <div className="flex items-center space-x-1 mb-1">
              <span className="text-green-500">•</span>
              <span>Работаем до 19:00</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex space-x-3 mt-1">
              <span>+375 33 677-01-66</span>
              <span>+375 29 182-01-66</span>
            </div>
          </div>

          {/* Есть вопросы? Задайте Online */}
          <div className="flex flex-col items-start text-sm text-[#2c3a54]">
            <span>Есть вопросы?</span>
            <span>Задайте Online</span>
            <div className="flex space-x-2 mt-1">
              <a href="#" className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.041 11.041 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C9.716 18 3 11.284 3 6V3z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path d="M10 4a6 6 0 00-6 6 6 6 0 006 6 6 6 0 006-6 6 6 0 00-6-6z" />
                  <path d="M10 6a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.041 11.041 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C9.716 18 3 11.284 3 6V3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя строка — белая */}
      <div className="flex justify-between items-center px-17.5 py-2 bg-white border-b border-gray-200">
        <div className="flex space-x-8">
          <Link href="/sales" className="text-[#cd5554] font-semibold flex items-center">
            <span className="text-lg mr-2">%</span> Акции
          </Link>
          <div className="relative group">
            <span className="font-medium text-[#2c3a54] hover:text-[#1a2a4a] cursor-pointer">Памятники</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-[#2c3a54]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative group">
            <span className="font-medium text-[#2c3a54] hover:text-[#1a2a4a] cursor-pointer">Ограды</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-[#2c3a54]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative group">
            <span className="font-medium text-[#2c3a54] hover:text-[#1a2a4a] cursor-pointer">Аксессуары</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-[#2c3a54]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative group">
            <span className="font-medium text-[#2c3a54] hover:text-[#1a2a4a] cursor-pointer">Благоустройство</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-[#2c3a54]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative group">
            <span className="font-medium text-[#2c3a54] hover:text-[#1a2a4a] cursor-pointer">Услуги</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-[#2c3a54]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative group">
            <span className="font-medium text-[#2c3a54] hover:text-[#1a2a4a] cursor-pointer">Оформление памятников</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1 text-[#2c3a54]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex items-center">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#0F0F0F"></path> <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#0F0F0F"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#0F0F0F"></path> </g></svg>
        </div>
      </div>
    </header>
  );
};

export default Header;