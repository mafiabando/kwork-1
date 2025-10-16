'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Импортируем массивы товаров по категориям
import { productsMonuments } from '../mock/products';
import { productsFences } from '../mock/products';
import { productsAccessories } from '../mock/products';
import { productsLandscape } from '../mock/products';
import { Product } from '../types/types';


// Маппинг пути → название страницы
const pageTitles: Record<string, string> = {
  '/policy': 'Политика конфиденциальности',
  '/granite': 'Виды гранита',
  '/sales': 'Акции',
  '/works': 'Готовые работы',
  '/payment': 'Оплата и доставка',
  '/contacts': 'Контакты',
  '/services': 'Услуги',
  '/monuments': 'Памятники',
  '/fences': 'Ограждения',
  '/landscape': 'Ландшафтный дизайн',
  '/design': 'Дизайн',
  '/blog': 'Блог',
  '/accessories': 'Аксессуары',
  '/monuments/single': 'Одиночные',
  '/monuments/double': 'Двойные',
  '/monuments/exclusive': 'Эксклюзивные',
  '/monuments/cheap': 'Недорогие',
  '/monuments/cross': 'В виде креста',
  '/monuments/heart': 'В виде сердца',
  '/monuments/composite': 'Составные',
  '/monuments/europe': 'Европейские',
  '/monuments/artistic': 'Художественная резка',
  '/monuments/tree': 'В виде деревьев',
  '/monuments/complex': 'Мемориальные комплексы',
  '/monuments/glass': 'Со стеклом',
  '/fences/granite': 'Гранитные ограды',
  '/fences/forged': 'Кованые ограды',
  '/fences/metal': 'Металлические ограды',
  '/accessories/vases': 'Вазы',
  '/accessories/lamps': 'Лампы',
  '/accessories/sculptures': 'Скульптуры',
  '/accessories/frames': 'Рамки',
  '/accessories/bronze': 'Изделия из бронзы',
  '/accessories/plates': 'Надгробные плиты',
  '/accessories/tables': 'Гранитные таблички',
  '/landscape/graves': 'Благоустройство могил',
  '/landscape/foundation': 'Фундамент для памятников',
  '/landscape/tiles': 'Укладка плитки',
  '/landscape/tables': 'Столы и скамейки',
  '/landscape/gravel': 'Щебень декоративный',
  '/landscape/lawn': 'Искусственный газон',
  '/services/monument-installation': 'Установка памятников',
  '/services/fence-installation': 'Установка оград',
  '/services/monument-production': 'Изготовление памятников',
  '/services/monument-dismantle': 'Демонтаж памятников',
  '/services/3d-modeling': '3D-моделирование',
  '/design/epitaphs': 'Эпитафии',
  '/design/portrait': 'Гравировка портрета',
  '/design/medallions': 'Медальоны на памятник',
  '/design/text-engraving': 'Гравировка текста',
};

// Маппинг подкатегорий → основная категория
const subcategoryToCategory: Record<string, string> = {
  '/monuments/single': '/monuments',
  '/monuments/double': '/monuments',
  '/monuments/exclusive': '/monuments',
  '/monuments/cheap': '/monuments',
  '/monuments/cross': '/monuments',
  '/monuments/heart': '/monuments',
  '/monuments/composite': '/monuments',
  '/monuments/europe': '/monuments',
  '/monuments/artistic': '/monuments',
  '/monuments/tree': '/monuments',
  '/monuments/complex': '/monuments',
  '/monuments/glass': '/monuments',
  '/fences/granite': '/fences',
  '/fences/forged': '/fences',
  '/fences/metal': '/fences',
  '/accessories/vases': '/accessories',
  '/accessories/lamps': '/accessories',
  '/accessories/sculptures': '/accessories',
  '/accessories/frames': '/accessories',
  '/accessories/bronze': '/accessories',
  '/accessories/plates': '/accessories',
  '/accessories/tables': '/accessories',
  '/landscape/graves': '/landscape',
  '/landscape/foundation': '/landscape',
  '/landscape/tiles': '/landscape',
  '/landscape/tables': '/landscape',
  '/landscape/gravel': '/landscape',
  '/landscape/lawn': '/landscape',
  '/services/monument-installation': '/services',
  '/services/fence-installation': '/services',
  '/services/monument-production': '/services',
  '/services/monument-dismantle': '/services',
  '/services/3d-modeling': '/services',
  '/design/epitaphs': '/design',
  '/design/portrait': '/design',
  '/design/medallions': '/design',
  '/design/text-engraving': '/design',
};

// Маппинг основных категорий → название категории
const categoryTitles: Record<string, string> = {
  '/monuments': 'Памятники',
  '/fences': 'Ограждения',
  '/accessories': 'Аксессуары',
  '/landscape': 'Благоустройство',
  '/services': 'Услуги',
  '/design': 'Оформление памятников',
};

// Маппинг подкатегории → соответствующий массив товаров
const subcategoryToProductArray: Record<string, Product[]> = {
  '/monuments/single': productsMonuments,
  '/monuments/double': productsMonuments,
  '/monuments/exclusive': productsMonuments,
  '/monuments/cheap': productsMonuments,
  '/monuments/cross': productsMonuments,
  '/monuments/heart': productsMonuments,
  '/monuments/composite': productsMonuments,
  '/monuments/europe': productsMonuments,
  '/monuments/artistic': productsMonuments,
  '/monuments/tree': productsMonuments,
  '/monuments/complex': productsMonuments,
  '/monuments/glass': productsMonuments,
  '/fences/granite': productsFences,
  '/fences/forged': productsFences,
  '/fences/metal': productsFences,
  '/accessories/vases': productsAccessories,
  '/accessories/lamps': productsAccessories,
  '/accessories/sculptures': productsAccessories,
  '/accessories/frames': productsAccessories,
  '/accessories/bronze': productsAccessories,
  '/accessories/plates': productsAccessories,
  '/accessories/tables': productsAccessories,
  '/landscape/graves': productsLandscape,
  '/landscape/foundation': productsLandscape,
  '/landscape/tiles': productsLandscape,
  '/landscape/tables': productsLandscape,
  '/landscape/gravel': productsLandscape,
  '/landscape/lawn': productsLandscape,
};

// Функция для получения названия товара по ID
const getProductName = (subcategoryPath: string, productId: string) => {
  const productArray = subcategoryToProductArray[subcategoryPath];
  if (!productArray) return `Товар ${productId}`;

  const product = productArray.find(p => p.id.toString() === productId);
  return product ? product.name : `Товар ${productId}`;
};

export default function PathPage() {
  const pathname = usePathname();

  // Проверяем, является ли путь подкатегорией
  const isSubcategory = Object.keys(subcategoryToCategory).some(sub => pathname.startsWith(sub + '/'));
  const isSubcategoryExact = subcategoryToCategory.hasOwnProperty(pathname);

  if (isSubcategoryExact) {
    // Это страница подкатегории (например, /monuments/single)
    const categoryName = categoryTitles[subcategoryToCategory[pathname]];
    const subcategoryName = pageTitles[pathname];

    return (
      <div className="mb-2.5">
        <ul className="flex items-center text-xs text-[#cbcbcb] space-x-2 font-[600]">
          <li>
            <Link href="/" className="text-[#2c3a54] hover:underline transition-colors">
              Главная
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={subcategoryToCategory[pathname]} className="text-[#2c3a54] hover:underline transition-colors">
              {categoryName}
            </Link>
          </li>
          <li>/</li>
          <li>{subcategoryName}</li>
        </ul>
      </div>
    );
  } else if (isSubcategory) {
    // Это страница продукта (например, /monuments/single/2)
    // Извлекаем путь подкатегории
    const subcategoryPath = Object.keys(subcategoryToCategory).find(sub => pathname.startsWith(sub + '/'));
    if (subcategoryPath) {
      const categoryName = categoryTitles[subcategoryToCategory[subcategoryPath]];
      const subcategoryName = pageTitles[subcategoryPath];
      // Извлекаем ID продукта из последней части пути
      const pathParts = pathname.split('/');
      const productId = pathParts[pathParts.length - 1];
      const productName = getProductName(subcategoryPath, productId);

      return (
        <div className="mb-2.5">
          <ul className="flex items-center text-xs text-[#cbcbcb] space-x-2 font-[600]">
            <li>
              <Link href="/" className="text-[#2c3a54] hover:underline transition-colors">
                Главная
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={subcategoryToCategory[subcategoryPath]} className="text-[#2c3a54] hover:underline transition-colors">
                {categoryName}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={subcategoryPath} className="text-[#2c3a54] hover:underline transition-colors">
                {subcategoryName}
              </Link>
            </li>
            <li>/</li>
            <li>{productName}</li>
          </ul>
        </div>
      );
    }
  }

  // Для остальных страниц используем обычную логику
  const pageTitle = pageTitles[pathname] || 'Страница';

  return (
    <div className="mb-2.5">
      <ul className="flex items-center text-xs text-[#cbcbcb] space-x-2 font-[600]">
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