'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Маппинг пути → название страницы
const pageTitles: Record<string, string> = {
  '/policy': 'Политика конфиденциальности',
  '/vidy-granita': 'Виды гранита',
  '/granit-30': 'Работаем более чем с 30 породами гранита',
  '/dogovor': 'Работаем строго по договору',
  '/foto-video': 'Фото и видео-отчёт о работе',
  '/hranenie': 'Хранение памятников',
  '/about': 'О компании',
  '/oplata-dostavka': 'Оплата и доставка',
};

export default function PathPage() {
  const pathname = usePathname();

  // Получаем название страницы из маппинга
  const pageTitle = pageTitles[pathname] || 'Страница';

  return (
    <div className="mb-2.5">
      <ul className="flex items-center text-xs text-[#cbcbcb] space-x-2">
        <li>
          <Link href="/" className="text-[#2c3a54] hover:underline transition-colors">
            Главная
          </Link>
        </li>
        <li>/</li>
        <li>{pageTitle}</li>
      </ul>
    </div>
  );
}