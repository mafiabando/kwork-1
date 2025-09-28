import { Product } from "../types/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Одиночный памятник А-3",
    height: "120 см",
    price: 1025,
    oldPrice: 1185,
    discount: 13,
    category: "Одиночные",
    image: "/popular-products/a3.jpg", // базовое изображение
    colors: [
      {
        name: "Красный гранит",
        color: "#a52a2a",
        image: "/popular-products/a3-red.jpg",
      },
      {
        name: "Черный гранит",
        color: "#000000",
        image: "/popular-products/a3-black.jpg",
      },
      {
        name: "Белый мрамор",
        color: "#ffffff",
        image: "/popular-products/a3-white.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Одиночный памятник А-2",
    height: "110 см",
    price: 965,
    oldPrice: 1080,
    discount: 15,
    category: "Одиночные",
    image: "/popular-products/a2.jpg",
    colors: [
      {
        name: "Красный гранит",
        color: "#a52a2a",
        image: "/popular-products/a2-red.jpg",
      },
      {
        name: "Черный гранит",
        color: "#000000",
        image: "/popular-products/a2-black.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Одиночный памятник А-5",
    height: "120 см",
    price: 1060,
    oldPrice: 1215,
    discount: 12,
    category: "Одиночные",
    image: "/popular-products/a5.jpg",
    colors: [
      {
        name: "Зеленый гранит",
        color: "#006400",
        image: "/popular-products/a5-green.jpg",
      },
      {
        name: "Серый гранит",
        color: "#808080",
        image: "/popular-products/a5-gray.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Одиночный памятник А-6",
    height: "130 см",
    price: 1025,
    oldPrice: 1150,
    discount: 10,
    category: "Одиночные",
    image: "/popular-products/a6.jpg",
    colors: [
      {
        name: "Красный гранит",
        color: "#a52a2a",
        image: "/popular-products/a6-red.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Одиночный памятник А-7",
    height: "120 см",
    price: 1025,
    oldPrice: 1185,
    discount: 13,
    category: "Одиночные",
    image: "/popular-products/a7.jpg",
    colors: [
      {
        name: "Черный гранит",
        color: "#000000",
        image: "/popular-products/a7-black.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Одиночный памятник А-11",
    height: "115 см",
    price: 965,
    category: "Одиночные",
    image: "/popular-products/a11.jpg",
    colors: [
      {
        name: "Белый мрамор",
        color: "#000",
        image: "/popular-products/a11-white.jpg",
      },
    ],
  },
  {
    id: 7,
    name: "Одиночный памятник А-21",
    height: "125 см",
    price: 1765,
    oldPrice: 2000,
    discount: 11,
    category: "Двойные",
    image: "/popular-products/a21.jpg",
    colors: [
      {
        name: "Черный гранит",
        color: "#000000",
        image: "/popular-products/a21-black.jpg",
      },
      {
        name: "Черный гранит",
        color: "#000000",
        image: "/popular-products/a21-black.jpg",
      },
      {
        name: "Черный гранит",
        color: "#000000",
        image: "/popular-products/a21-black.jpg",
      },
      {
        name: "Черный гранит",
        color: "#000000",
        image: "/popular-products/a21-black.jpg",
      },
    ],
  },
  {
    id: 8,
    name: "Одиночный памятник А-18",
    height: "120 см",
    price: 1965,
    oldPrice: 2200,
    discount: 10,
    category: "Эксклюзивные",
    image: "/popular-products/a18.jpg",
    colors: [
      {
        name: "Золотой гранит",
        color: "#ffd700",
        image: "/popular-products/a18-gold.jpg",
      },
    ],
  },
];