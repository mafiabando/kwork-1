"use client"
import { Metadata } from "next"
import OurWorksSlider from "../components/OurWorksSlider"
import PathPage from "../components/PathPage"
import SidebarCatalogMenu from "../components/Sidebar/SidebarCatalogMenu"
import SidebarStickyHelp from "../components/Sidebar/SidebarStickyHelp"
import Pagination from "../components/Pagination"
import { useState } from "react"

// export const metadata: Metadata = {
//     title: "Статьи",
//     description: "Статьи",
// };

// Пример данных для статей. В реальном проекте эти данные будут приходить из API или CMS.
const blogPosts = [
    {
        id: 1,
        title: "Выбор памятника для мужчины и женщины: на что обратить внимание?",
        date: "30.10.2023",
        image: "/blog/1.webp",
        slug: "/blog/post-1"
    },
    {
        id: 2,
        title: "Выбор памятника для мужчины: строгость и надежность в камне",
        date: "30.10.2023",
        image: "/blog/2.webp",
        slug: "/blog/post-2"
    },
    {
        id: 3,
        title: "Выбор памятника для ребенка: любовь и скорбь в камне",
        date: "30.10.2023",
        image: "/blog/3.webp",
        slug: "/blog/post-3"
    },
    {
        id: 4,
        title: "Гравировка или медальон на памятник: что лучше?",
        date: "30.10.2023",
        image: "/blog/4.webp",
        slug: "/blog/post-4"
    },
    {
        id: 5,
        title: "Гравировка портрета или медальон: что выбрать?",
        date: "30.10.2023",
        image: "/blog/5.webp",
        slug: "/blog/post-5"
    },
    {
        id: 6,
        title: "Декоративный щебень для благоустройства могил: преимущества и виды",
        date: "30.10.2023",
        image: "/blog/6.webp",
        slug: "/blog/post-6"
    },
    {
        id: 7,
        title: "Дизайнерское надгробие: памятник по индивидуальному эскизу",
        date: "30.10.2023",
        image: "/blog/7.webp",
        slug: "/blog/post-7"
    },
    {
        id: 8,
        title: "Забеливание портретов на памятнике",
        date: "30.10.2023",
        image: "/blog/8.webp",
        slug: "/blog/post-8"
    },
    {
        id: 9,
        title: "Зачем нужны памятники?",
        date: "30.10.2023",
        image: "/blog/9.webp",
        slug: "/blog/post-9"
    },
    {
        id: 10,
        title: "Из какого камня делают памятники на могилу?",
        date: "30.10.2023",
        image: "/blog/10.webp",
        slug: "/blog/post-10"
    },
    {
        id: 11,
        title: "Изготовление фотографий на памятник на стекле",
        date: "30.10.2023",
        image: "/blog/11.webp",
        slug: "/blog/post-11"
    },
    {
        id: 12,
        title: "Аксессуары из полимербетона для памятников",
        date: "30.10.2023",
        image: "/blog/12.webp",
        slug: "/blog/post-12"
    },
    {
        id: 13,
        title: "Выбор памятника для мужчины и женщины: на что обратить внимание?",
        date: "30.10.2023",
        image: "/blog/12.webp",
        slug: "/blog/post-1"
    },
    {
        id: 14,
        title: "Выбор памятника для мужчины: строгость и надежность в камне",
        date: "30.10.2023",
        image: "/blog/11.webp",
        slug: "/blog/post-2"
    },
    {
        id: 15,
        title: "Выбор памятника для ребенка: любовь и скорбь в камне",
        date: "30.10.2023",
        image: "/blog/10.webp",
        slug: "/blog/post-3"
    },
    {
        id: 16,
        title: "Гравировка или медальон на памятник: что лучше?",
        date: "30.10.2023",
        image: "/blog/9.webp",
        slug: "/blog/post-4"
    },
    {
        id: 17,
        title: "Гравировка портрета или медальон: что выбрать?",
        date: "30.10.2023",
        image: "/blog/8.webp",
        slug: "/blog/post-5"
    },
    {
        id: 18,
        title: "Декоративный щебень для благоустройства могил: преимущества и виды",
        date: "30.10.2023",
        image: "/blog/7.webp",
        slug: "/blog/post-6"
    },
    {
        id: 19,
        title: "Дизайнерское надгробие: памятник по индивидуальному эскизу",
        date: "30.10.2023",
        image: "/blog/6.webp",
        slug: "/blog/post-7"
    },
    {
        id: 20,
        title: "Забеливание портретов на памятнике",
        date: "30.10.2023",
        image: "/blog/5.webp",
        slug: "/blog/post-8"
    },
    {
        id: 21,
        title: "Зачем нужны памятники?",
        date: "30.10.2023",
        image: "/blog/4.webp",
        slug: "/blog/post-9"
    },
    {
        id: 22,
        title: "Из какого камня делают памятники на могилу?",
        date: "30.10.2023",
        image: "/blog/3.webp",
        slug: "/blog/post-10"
    },
    {
        id: 23,
        title: "Изготовление фотографий на памятник на стекле",
        date: "30.10.2023",
        image: "/blog/2.webp",
        slug: "/blog/post-11"
    },
    {
        id: 24,
        title: "Аксессуары из полимербетона для памятников",
        date: "30.10.2023",
        image: "/blog/1.webp",
        slug: "/blog/post-12"
    },
];

// Функция для получения статей для конкретной страницы
const getPostsForPage = (posts: typeof blogPosts, page: number, postsPerPage = 12) => {
    const startIndex = (page - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
};

const BlogPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(blogPosts.length / 12); // Рассчитываем общее количество страниц

    // Получаем статьи для текущей страницы
    const currentPosts = getPostsForPage(blogPosts, currentPage);

    return (
        <>
            <section className="page-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <div className="pl-2.5">
                        <PathPage />
                        <h1 className="text-black text-[28px] mt-2.5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">Статьи</h1>
                    </div>
                    {/* Сетка статей */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {currentPosts.map((post) => (
                            <a
                                key={post.id}
                                href={post.slug}
                                className="block group overflow-hidden rounded-lg"
                            >
                                {/* Контейнер для изображения и текста */}
                                <div className="flex lg:flex-col h-full px-2.5 mt-7.5">
                                    {/* Изображение */}
                                    <div className="relative mr-5 lg:mr-0 max-w-1/2 lg:max-w-full overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-auto object-cover rounded-lg group-hover:opacity-80 duration-500"
                                        />
                                    </div>

                                    {/* Текстовый блок */}
                                    <div className="lg:mt-2.5 flex flex-col">
                                        <h2 className="text-[16px] font-bold text-[#222222] mb-1.25 leading-4.5 group-hover:underline">{post.title}</h2>
                                        <p className="text-[12px] text-[#969ead]">{post.date}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Пагинация с активной страницей */}
                    <Pagination
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        initialPage={1}
                    />
                </div>
            </section>

            {/* OurWorksSlider внизу страницы */}
            <div className="mb-22.5">
                <OurWorksSlider />
            </div>
        </>
    );
};


export default BlogPage;