"use client";
import { AddToCart } from "@/components/addToCart";
import { AddToFavourite } from "@/components/AddToFavourite";
import { Loading } from "@/components/loading";
import { StarRating } from "@/components/rating";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";

const Search = ({ search_query }) => {
  const [page, setPage] = useState(1);

  const {
    data: search,
    isLoading,
    error,
  } = useFetchItems({
    url: `${BASE_URL}/search?query=${search_query}&page=${page}`,
  });
  console.log(search);
  const totalPages = search?.data?.totalPages || 1;

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  if (isLoading) {
    return (
      <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-2 lg:gap-[15px] md:grid-cols-2 lg:grid-cols-4 w-full">
        <Loading />
      </div>
    );
  }

  if (error)
    return (
      <div className="w-full h-fit my-[10%] flex flex-col items-center justify-center text-[20px] font-bold">
        <Image
          src={"/images/error.png"}
          width={200}
          height={200}
          objectFit="cover"
          alt=">Web interface icons created by mim_studio - Flaticon"
        />
        {error.message}
      </div>
    );
  return (
    <main>
      <div className="flex flex-col gap-6 py-[3%] px-[6%]">
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] lg:text-[35px] font-[600]">
            Search Result
          </h1>
        </div>

        <div className="py-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
          {search?.data?.products?.map((singleProduct) => (
            <div
              key={singleProduct._id}
              className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:max-w-[295px]"
            >
              <Link href={`/products/${singleProduct.slug}`}>
                <img
                  className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
                  src={singleProduct.featuredImage}
                  alt={singleProduct.name}
                />
              </Link>
              <div className="px-3 pt-[.5em] flex flex-col gap-[.5em]">
                <div className="flex items-center justify-between">
                  <Link href={`/products/${singleProduct.slug}`}>
                    <p className="capitalize font-semibold text-sm lg:text-lg w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
                      {singleProduct.name}
                    </p>
                  </Link>
                  <AddToFavourite productId={singleProduct._id} />
                </div>
                <p className="text-[#888282] text-[10px] lg:text-base font-semibold leading-[9.75px] w-[70px] h-[10px] sm:w-[105px] sm:h-[20px] sm:text-[16px] sm:leading-[19.5px] truncate">
                  &#8358;{singleProduct.price.toLocaleString()}
                </p>
                <span className="lg:hidden">
                  <StarRating
                    rating={singleProduct.averageRating}
                    width={10}
                    height={10}
                  />
                </span>
                <span className="hidden lg:flex">
                  <StarRating
                    rating={singleProduct.averageRating}
                    width={20}
                    height={20}
                  />
                </span>
                <AddToCart
                  id={singleProduct._id}
                  className="bg-black w-1/2 min-w-[70px] h-[20px] text-[8px] leading-[9.75px] sm:w-[132px] sm:h-[36px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
                >
                  Add to cart
                </AddToCart>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 gap-2">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 border rounded-md ${
                page === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FiChevronLeft />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 border rounded-md ${
                  page === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-black"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 border rounded-md ${
                page === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export { Search };
