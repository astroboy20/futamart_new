"use client";
import Link from "next/link";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { StarRating } from "@/components/rating";
import { AddToCart } from "@/components/addToCart";
import { Loading } from "@/components/loading";
import { AddToFavourite } from "@/components/AddToFavourite";

const RecentProducts = () => {
  const {
    data: recentProducts,
    isLoading,
    error,
  } = useFetchItems({ url: `${BASE_URL}/recently-added` });

  if (isLoading) {
    return (
      <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-2 lg:gap-[15px] md:grid-cols-2 lg:grid-cols-4 w-full">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="flex bg-black justify-center items-center">
        <h1 className="text-[15px] text-white lg:text-[25px] font-[600]">
          Recently Added
        </h1>
      </div>
      <div className="flex gap-[15px] no-scrollbar overflow-x-auto scrollbar-hide py-3">
  {recentProducts?.data?.map((singleProduct) => (
    <div
      key={singleProduct._id}
      className="flex-none w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:w-[295px] transition-transform duration-300 hover:scale-105"
    >
      <Link href={`/products/${singleProduct.slug}`}>
        <img
          className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
          src={singleProduct.featuredImage}
          alt={singleProduct.name}
        />
      </Link>
      <div className="px-3 pt-[.5em] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Link href={`/products/${singleProduct.slug}`}>
            <p className="capitalize font-semibold text-sm lg:text-lg w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
              {singleProduct.name}
            </p>
          </Link>
        </div>
        <p className="text-[#888282] text-[10px] lg:text-base leading-[9.75px] truncate font-semibold">
          &#8358;{singleProduct.price.toLocaleString()}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export { RecentProducts };
