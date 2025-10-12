export type ColorOption = {
  name: string;
  color: string;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  height?: string;
  price?: number;
  oldPrice?: number;
  discount?: number;
  textPrice?: string;
  category: string;
  image: string;
  colors: ColorOption[];
};

export type Category = {
  title: string;
  price: string;
  img: string;
  link: string;
};

export type Review = {
  id: number,
  name: string,
  date: string,
  rating: number,
  text: string,
}