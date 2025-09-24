import React from "react";

type Category = {
  title: string;
  price: string;
  img: string;
  link: string;
};

const categories: Category[] = [
  {
    title: "Недорогие",
    price: "от 610 руб.",
    img: "/section/cheap.webp",
    link: "/",
  },
  {
    title: "Одиночные",
    price: "от 900 руб.",
    img: "/section/single.webp",
    link: "/",
  },
  {
    title: "Двойные",
    price: "от 815 руб.",
    img: "/section/double.webp",
    link: "/",
  },
  {
    title: "Эксклюзивные",
    price: "от 1 685 руб.",
    img: "/section/exclusive.webp",
    link: "/",
  },
  {
    title: "Мемориальные комплексы",
    price: "",
    img: "/section/complex.webp",
    link: "/",
  },
  {
    title: "Гранитные ограды",
    price: "от 515 руб.",
    img: "/section/granite.webp",
    link: "/",
  },
  {
    title: "Благоустройство могил",
    price: "",
    img: "/section/landscape.webp",
    link: "/",
  },
  {
    title: "Памятники",
    price: "от 610 руб.",
    img: "/section/monuments.webp",
    link: "/",
  },
];

function CategoryCard({ title, price, img, link }: Category) {
  return (
   <div className="mt-5 px-2.5"> 
    <a
      href={link}
      className="block bg-[#f5f6fa] rounded-2xl px-2.5 pb-5 pt-0.75 text-[20px] text-center transition-shadow hover:shadow-md"
    >
      <img
        src={img}
        alt={title}
        className="mx-auto mb-4.5 object-contain"
        loading="lazy"
        width={198}
        height={198}
      />
       <h3 className="font-semibold text-gray-800">{title}</h3>

      {/* Спейсер для равной высоты карточек */}
      <div className="flex-grow" />

      {/* Цена */}
      <p className="text-[#cd5554] leading-6 min-h-[1.25rem]">
        {price && price.trim() !== "" ? price : "\u00A0" /* неразрывный пробел */}
      </p>
    </a>
    </div>
  );
}

export default function PopularCategories() {
  return (
    <section className="max-w-[1300px] mx-auto mt-30">
      <h2 className="text-4xl font-semibold text-gray-800 mb-7.5">Популярные категории</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.title} {...cat} />
        ))}
      </div>
    </section>
  );
}