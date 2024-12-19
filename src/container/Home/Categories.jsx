"use client";

import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Skeleton } from "../../components/ui/skeleton";
import Head from "next/head";

const Categories2 = () => {
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

  // Static category images
  const categoryImages = [
    "/hair.jpg",
    "/food.jpg",

    "/electronics.jpg",
    "/food.jpg",        
    "/clothing.jpg",
    "/cosmetics.jpg",

    "/footwear.jpg",


  ];

  // Map through categories and assign images
  const categories = allCategories?.data.slice(0, 6).map((category, index) => ({
    ...category,
    image: categoryImages[index % categoryImages.length],
  }));

  return (
    <>
      {/* Preloading critical images */}
      <Head>
        {categoryImages.map((image) => (
          <link key={image} rel="preload" as="image" href={image} />
        ))}
      </Head>

      <div className="sm:w-[100%] w-full mt-10">
        <h1 className="text-[15px] lg:text-[25px] font-[600]">
          Shop by categories
        </h1>
        <div
          className="flex overflow-x-auto space-x-6 px-6 py-4 scroll-smooth"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {categories.map((category) => {
            const isActive = pathname === `/${category.slug}`;
            return (
              <Link key={category._id} href={`/${category.slug}`}>
                <div className="group relative flex-shrink-0 p-4 rounded-md transition-all duration-300 ease-in-out">
                  {/* Using Base64 placeholder for seamless display */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-2 group-hover:opacity-80 transition-opacity"
                    style={{
                      backgroundImage: `url('data:image/png;base64,PLACEHOLDER_BASE64')`,
                      backgroundSize: "cover",
                    }}
                  />
                  <h3 className="text-center text-sm sm:text-lg font-medium capitalize">
                    {category.name.split("&")[0].trim()}{" "}
                    {/* Handle '&' and show the first part */}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export { Categories2 };
