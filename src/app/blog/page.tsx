"use client"
import { Metadata } from "next"
import OurWorksSlider from "../components/OurWorksSlider"
import PathPage from "../components/PathPage"
import SidebarCatalogMenu from "../components/Sidebar/SidebarCatalogMenu"
import SidebarStickyHelp from "../components/Sidebar/SidebarStickyHelp"
import Pagination from "../components/Pagination"
import { useState } from "react"
import { blogPosts } from "../mock/blogs"

// export const metadata: Metadata = {
//     title: "Статьи",
//     description: "Статьи",
// };


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
                <OurWorksSlider />
        </>
    );
};


export default BlogPage;