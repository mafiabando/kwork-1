'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Данные для меню "Информация"
const infoLinks = [
  { name: 'Виды гранита', href: '/vidy-granita' },
  { name: 'Работаем более чем с 30 породами гранита', href: '/granit-30' },
  { name: 'Работаем строго по договору', href: '/dogovor' },
  { name: 'Фото и видео-отчёт о работе', href: '/foto-video' },
  { name: 'Хранение памятников', href: '/hranenie' },
  { name: 'О компании', href: '/about' },
  { name: 'Оплата и доставка', href: '/oplata-dostavka' },
  { name: 'Политика конфиденциальности', href: '/policy' },
];

export default function SidebarInfoMenu() {
  const pathname = usePathname(); // Получаем текущий путь

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm py-5 px-4.5">
      {/* Заголовок */}
      <h3 className="text-[#2c3a54] text-[20px] font-bold mb-2.5">Информация</h3>

      {/* Список ссылок */}
      <ul className="space-y-1.25">
        {infoLinks.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <li key={index}>
              {isActive ? (
                // Активная ссылка — не кликабельна, стилизуется иначе
                <span className="block text-[#2c3a54] cursor-default">
                  {link.name}
                </span>
              ) : (
                // Обычная ссылка
                <Link
                  href={link.href}
                  className="block text-[#2c3a54] hover:underline"
                >
                  {link.name}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}