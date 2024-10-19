"use client";
import Link from "next/link";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { StarRating } from "@/components/rating";
import { AddToCart } from "@/components/addToCart";
import { Fav, Next_Icon } from "@/assets";
import { Loading } from "@/components/loading";
import { AddToFavourite } from "@/components/AddToFavourite";

const BestProducts = () => {
  const {
    data: bestProducts,
    isLoading,
    error,
  } = useFetchItems({ url: `${BASE_URL}/top-rated-products` });

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
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] lg:text-[35px] font-[600]">
          Best Selling Products
        </h1>
        <Link
          href={"/best-products"}
          className="flex items-center gap-3 text-xs lg:text-[20px]"
        >
          View all
          <Next_Icon />
        </Link>
      </div>

      <div className="py-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
        {bestProducts?.data?.map((singleProduct) => (
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
            <div className="px-3 pt-[.5em] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Link href={`/products/${singleProduct.slug}`}>
                  <p className="capitalize font-semibold text-sm lg:text-lg w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
                    {singleProduct.name}
                  </p>
                </Link>
                <AddToFavourite productId={singleProduct._id} />
              </div>
              <p className="text-[#888282] text-[10px] lg:text-base leading-[9.75px] w-[70px] h-[10px] sm:w-[105px] sm:h-[20px] sm:text-[16px] sm:leading-[19.5px] truncate font-semibold">
                &#8358;{singleProduct.price.toLocaleString()}
              </p>
              <span className="lg:hidden">
                <StarRating
                  rating={singleProduct.averageRating || 5}
                  width={10}
                  height={10}
                />
              </span>
              <span className="hidden lg:flex">
                <StarRating
                  rating={singleProduct.averageRating || 5}
                  width={20}
                  height={20}
                />
              </span>
              <AddToCart
                id={singleProduct._id}
                className="bg-[#000000] w-1/2 min-w-[70px] p-1 py-2 text-[10px] leading-[9.75px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
              >
                Add to cart
              </AddToCart>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { BestProducts };
