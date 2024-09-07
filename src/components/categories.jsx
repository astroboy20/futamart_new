"use client";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
const Categories = () => {
  const pathname = usePathname();
  const {
    data: allCategories,
    isLoading,
    error,
  } = useFetchItems({ url: `${BASE_URL}/categories` });

  if (isLoading) {
    return (
      <div>
        <Skeleton className="w-full h-4" />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const categories = [
    { _id: 1, name: "All category", slug: "" },
    ...allCategories?.data,
  ];
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
                    ? "py-4 px-6 w-max font-medium capitalize rounded-md border text-[12px] leading-[15.06px] sm:leading-[25.1px] border-black sm:text-[20px] hover:cursor-pointer hover:bg-black hover:text-white"
                    : "py-4 px-6 w-max font-medium capitalize rounded-md border text-[12px] leading-[15.06px] sm:leading-[25.1px] border-black sm:text-[20px] hover:cursor-pointer bg-black text-white"
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
