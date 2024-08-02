"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();
  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
      );
      const apiCategories = await categoriesData.json();
      setCategories([
        { _id: 1, name: "All category", slug: "" },
        ...apiCategories.data,
      ]);
    };
    getCategories();
  }, []);
  return (
    <div className="sm:w-[100%] w-full">
      <ul className="flex gap-[30px] sm:px-0 no-scrollbar overflow-x-scroll">
        {categories.map((category) => {
          return (
            <Link key={category._id} href={`/${category.slug}`}>
              <li
                style={{
                  minWidth: "fit-content",
                }}
                className={
                  pathname !== `/${category.slug}`
                    ? "py-2 px-4 w-max font-semibold capitalize rounded-md border text-[12px] leading-[15.06px] sm:leading-[25.1px] border-black sm:text-[20px] hover:cursor-pointer hover:bg-black hover:text-white"
                    : "py-2 px-4 w-max font-semibold capitalize rounded-md border text-[12px] leading-[15.06px] sm:leading-[25.1px] border-black sm:text-[20px] hover:cursor-pointer bg-black text-white"
                }
              >
                {category.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export { Categories };
