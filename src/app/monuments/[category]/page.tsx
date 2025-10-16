"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import OurWorksSlider from "@/app/components/OurWorksSlider";
import PathPage from "@/app/components/PathPage";
import SidebarCatalogMenu from "@/app/components/Sidebar/SidebarCatalogMenu";
import SidebarStickyHelp from "@/app/components/Sidebar/SidebarStickyHelp";
import ProductCard from "@/app/components/ProductCard";
import Pagination from "@/app/components/Pagination";
import { productsMonuments } from "@/app/mock/products";
import SubcategoryDescription from "@/app/components/SubcategoryDescription";

// Типы
interface CategoryData {
    title: string;
    description?: DescriptionSection[]; // Описание может быть необязательным
    products: typeof productsMonuments; // Массив продуктов для этой категории
    otherCategories: {
        title: string;
        image: string;
        link: string;
    }[];
    sortOptions?: string[]; // Опционально: опции сортировки
}

interface DescriptionSection {
    type: 'paragraph' | 'heading' | 'orderedList' | 'unorderedList';
    content?: string;
    items?: string[];
}

// Данные для подкатегорий
const subcategoryData: Record<string, CategoryData> = {
    "single": {
        title: "Одиночные памятники",
        description: [
            {
                type: 'paragraph',
                content: "Современный вертикальный памятник — это наиболее популярный формат монумента, который заказывают для обустройства одиночных могил. Одиночные памятники — это компактные надгробия, дизайн которых разрабатывается по индивидуальным 3D-эскизам."
            },
            {
                type: 'paragraph',
                content: "Если вам нужен качественный и долговечный одиночный памятник, обратите внимание на модели из гранита — наиболее прочного материала, используемого для производства монументов."
            },
            {
                type: 'heading',
                content: "Гранитный памятник имеет следующие преимущества перед изделиями из других материалов:"
            },
            {
                type: 'unorderedList',
                items: [
                    "привлекательный внешний вид;",
                    "износостойчивость;",
                    "неприхотливость в уходе;",
                    "прочность;",
                    "защита от температурных перепадов и механических повреждений."
                ]
            },
            {
                type: 'heading',
                content: "Гранитный вертикальный памятник может иметь разную форму:"
            },
            {
                type: 'unorderedList',
                items: [
                    "простую (прямоугольную);",
                    "фигурную (овальную, арочную, форму цветка или пламени);",
                    "монумент в полный рост;",
                    "эксклюзивную (к примеру, памятник с барельефом или элементами скульптурами). Монументы из гранита, которые можно заказать на нашем сайте, отличаются долгим сроком службы: на любой одиночный памятник из гранита распространяется гарантия 10 лет."
                ]
            },
            {
                type: 'paragraph',
                content: "Для защиты от преждевременного износа одиночный монумент покрывается специальным составом «Антидождь», который предотвращает негативное влияние влаги на материал."
            },
            {
                type: 'heading',
                content: "Как заказать вертикальный памятник"
            },
            {
                type: 'paragraph',
                content: "Если вы хотите обустроить место захоронения близкого человека, закажите одиночный монумент в нашей компании, которая предлагает своим клиентам широкий ассортимент изделий из гранита по доступным ценам."
            },
            {
                type: 'paragraph',
                content: "В каталоге компании вы сможете выбрать подходящий памятник, дизайн которого будет разработан с учетом 3D эскиза."
            },
            {
                type: 'paragraph',
                content: "Вся продукция отличается безупречным качеством, а также разнообразием форм и дизайнов."
            },
            {
                type: 'paragraph',
                content: "В нашем каталоге вы сможете выбрать подходящий одиночный монумент, который прослужит не один десяток лет и сохранит свой безупречный внешний вид."
            },
        ],
        products: productsMonuments.filter(p => p.category.toLowerCase() === "одиночные"),
        otherCategories: [
            { title: "Недорогие", image: "/section/cheap.webp", link: "/monuments/недорогие" },
            { title: "Памятники", image: "/section/single.webp", link: "/monuments" },
            { title: "Двойные", image: "/section/double.webp", link: "/monuments/двойные" },
        ],
        sortOptions: ["Со скидкой", "Строгие", "Фигурные", "С крестом"],
    },
    "double": {
        title: "Двойные памятники на могилу",
        description: [
            {
                type: 'paragraph',
                content: "Двойной памятник — разновидность надгробного камня (также называемого \"стелой\"), который обычно устанавливается при захоронении двоих близких человек. Это могут быть супруги или родственники первой линии — родители, дети, внуки, бабушки или дедушки, а также кровные братья или сестры. Нередко парный монумент ставят на одиночную могилу, например, если муж умер раньше, а жена хочет, чтобы после смерти ее подзахоронили к супругу. Компания «Каменная роза» производит сдвоенные надгробия, которые можно купить с доставкой по Минску."
            },
            {
                type: 'heading',
                content: "Каким может быть памятник на двоих"
            },
            {
                type: 'paragraph',
                content: "Классификация двойных монументов возможна по нескольким параметрам:"
            },
            {
                type: 'orderedList',
                items: [
                    "Ориентация композиции. Двойные памятники с общей стелой также называют горизонтальными памятниками, так как ширина могильной плиты обычно больше, чем высота. Стандартный двойной памятник имеет габариты 100x60 см (высота, ширина). Такие размеры позволяют проще разместить надписи, портреты успоших, эпитафии и элементы декора. Вертикальные модели более компактны, лучше заметны визуально в общем ландшафте кладбища (высота больше, чем ширина). Обычно портреты располагаются отдельно друг от друга, по краям стелы. Однако целая горизонтальная плита позволяет нанести общий портрет.",
                    "Форма. Плита может быть прямоугольной или асимметричной, в виде сердца, розы, птицы, раскрытой книги. Большим успехом пользуются надгробия, разделенные на две части, например, воздушным крестом или стелой.",
                    "Цвет. Двойные памятники на могилу из гранита могут иметь не только классический черный или серый оттенок: можно изготовить надгробие из розового, зеленого, терракотового или красного камня. Все зависит от сорта и места добычи породы."
                ]
            },
            {
                type: 'heading',
                content: "Причины купить двойной памятник из гранита"
            },
            {
                type: 'paragraph',
                content: "Заказывать такое надгробие во многом выгоднее, чем устанавливать две отдельные плиты. Преимущества этого решения:"
            },
            {
                type: 'unorderedList',
                items: [
                    "монумент занимает меньше места;",
                    "более низкая цена изготовления;",
                    "сокращаются траты времени на монтаж;",
                    "большой выбор дизайнерских решений, возможностей оформления;",
                    "уход за одним двойным памятником проще, чем за двумя отдельными;",
                    "возможность нанесения общего портрета."
                ]
            },

        ],
        products: productsMonuments.filter(p => p.category.toLowerCase() === "двойные"),
        otherCategories: [
            { title: "Недорогие", image: "/section/cheap.webp", link: "/monuments/недорогие" },
            { title: "Памятники", image: "/section/single.webp", link: "/monuments" },
            { title: "Одиночные", image: "/section/single.webp", link: "/monuments/одиночные" },
        ],
        sortOptions: ["Со скидкой", "Классические", "С крестом", "Составные"],
    },
};

const MonumentsSubcategoryPage = () => {
    const params = useParams();
    const categorySlug = params?.category as string;

    const [isClient, setIsClient] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(60);
    const [isTablet, setIsTablet] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isNarrowMobile, setIsNarrowMobile] = useState(false);

    // Получаем данные для текущей подкатегории
    const currentCategoryData = subcategoryData[categorySlug.toLowerCase()] || null;

    // Обработчик сортировки (если есть опции)
    const [sortOption, setSortOption] = useState(currentCategoryData.sortOptions ? currentCategoryData.sortOptions[0] : "");

    useEffect(() => {
        setIsClient(true);
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsTablet(width < 1024);
            setIsMobile(width < 768);
            setIsNarrowMobile(width < 420);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    if (!currentCategoryData) {
        // Если подкатегория не найдена, можно показать 404 или заглушку
        return (
            <div className="container-centered mt-5 max-w-[1300px]">
                <h1>Подкатегория не найдена</h1>
            </div>
        );
    }

    // Получаем продукты для текущей страницы
    const currentProducts = currentCategoryData.products.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(currentCategoryData.products.length / productsPerPage);

    // Обработчик изменения количества товаров на странице
    const handleProductsPerPageChange = (count: number) => {
        setProductsPerPage(count);
        setCurrentPage(1);
    };

    // Функция для сортировки (пример: по скидке, по цене и т.д.)
    const sortedProducts = [...currentCategoryData.products].sort((a, b) => {
        if (sortOption === "Со скидкой") {
            return (b.discount || 0) - (a.discount || 0);
        }
        // Добавьте другие условия сортировки по необходимости
        return 0;
    });

    // Пересчитываем products и pages при изменении сортировки
    const sortedCurrentProducts = sortedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );
    const sortedTotalPages = Math.ceil(sortedProducts.length / productsPerPage);

    // Для простоты используем отфильтрованные продукты, а не отсортированные, если сортировка не активна
    const finalProducts = sortOption && currentCategoryData.sortOptions ? sortedCurrentProducts : currentProducts;
    const finalTotalPages = sortOption && currentCategoryData.sortOptions ? sortedTotalPages : totalPages;

    return (
        <>
            <section className="page-centered mt-5 max-w-[1300px] flex">
                <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 ml-5">
                    <SidebarCatalogMenu />
                    <SidebarStickyHelp />
                </div>
                <div className="w-[100%] lg:ml-5 lg:max-w-[75%]">
                    <div className={`${isTablet ? 'container-centered' : ''}`}>
                        <PathPage />
                        <h1 className="text-black text-[28px] mt-2.5 mb-5 leading-8 lg:text-[40px] lg:leading-12 font-[600]">{currentCategoryData.title}</h1>

                        {/* Блок сортировки (если есть) */}
                        {currentCategoryData.sortOptions && (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {currentCategoryData.sortOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => setSortOption(option)}
                                        className={`px-4 py-2 border border-gray-300 rounded-full text-[16px] font-medium transition ${sortOption === option
                                            ? "bg-[#2c3a54] text-white"
                                            : "text-[#2c3a54] hover:bg-[#2c3a54] hover:text-white"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Выбор количества товаров на страницу */}
                        <div hidden={isTablet} className="flex justify-end mb-5">
                            <span className="text-[14px] text-[#6B809E] mr-2 self-center">Выводить по:</span>
                            {[60, 120].map((count) => (
                                <button
                                    key={count}
                                    onClick={() => handleProductsPerPageChange(count)}
                                    className={`px-2 py-1 mx-1 text-[14px] font-medium rounded text-[#2c3a54] ${productsPerPage === count
                                        ? ""
                                        : "cursor-pointer underline underline-offset-3 hover:no-underline"
                                        }`}
                                >
                                    {count}
                                </button>
                            ))}
                            <button
                                onClick={() => handleProductsPerPageChange(currentCategoryData.products.length)}
                                className={`px-2 py-1 mx-1 text-[14px] font-medium rounded text-[#2c3a54] ${productsPerPage === currentCategoryData.products.length
                                    ? ""
                                    : "cursor-pointer underline underline-offset-3 hover:no-underline"
                                    }`}
                            >
                                Все
                            </button>
                        </div>

                        {/* Сетка продуктов */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 mb-7.5">
                            {isClient ? (
                                finalProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        isTablet={isTablet}
                                        isMobile={isMobile}
                                        isNarrowMobile={isNarrowMobile}
                                    />
                                ))
                            ) : (
                                finalProducts.map((product) => (
                                    <div key={product.id} className="invisible h-0" />
                                ))
                            )}
                        </div>

                        {/* Пагинация */}
                        <Pagination
                            totalPages={finalTotalPages}
                            onPageChange={setCurrentPage}
                            initialPage={1}
                        />

                        {/* Описание страницы (если есть) */}
                        {currentCategoryData.description && (
                            <SubcategoryDescription sections={currentCategoryData.description} />
                        )}

                        {/* Блок "Другие категории" */}
                        <div className={`mt-17 lg:mt-30 ${isTablet ? 'container-centered' : ''}`}>
                            <h2 className="text-[28px] font-bold text-[#2c3a54] ml-2.5 mb-3.5 lg:mb-5">Другие категории</h2>
                            <div className={`flex flex-wrap ${isMobile ? 'flex-col space-y-2.5' : ''}`}>
                                {currentCategoryData.otherCategories.map((cat) => (
                                    <div
                                        key={cat.title}
                                        className={`px-1.25 md:px-2.5 max-w-1/3 flex-1/3 min-h-[60px] lg:min-h-[140px] ${isMobile ? 'max-w-full' : ''}`}
                                    >
                                        <a
                                            href={cat.link}
                                            className="block overflow-hidden rounded-lg hover:border-2 border-[#2c3a54] bg-[#f5f6fa] relative h-full items-center p-7.5"
                                        >
                                            <h2 className="text-[16px] font-bold text-[#222222] self-start">{cat.title}</h2>
                                            <img
                                                src={cat.image}
                                                alt={cat.title}
                                                className="w-[75px] lg:w-[130px] h-auto object-cover rounded-lg"
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    right: '10px',
                                                    transform: 'translateY(-50%)',
                                                }}
                                            />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* OurWorksSlider внизу страницы */}
            <div className="mb-12.5 lg:mb-15">
                <OurWorksSlider />
            </div>
        </>
    );
};

export default MonumentsSubcategoryPage;