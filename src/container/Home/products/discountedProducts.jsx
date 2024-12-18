"use client";
import Link from "next/link";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { StarRating } from "@/components/rating";
import { AddToCart } from "@/components/addToCart";
import { Fav, Next_Icon } from "@/assets";
import { AddToFavourite } from "@/components/AddToFavourite";
import { Loading } from "@/components/loading";
import { IoIosArrowForward } from "react-icons/io";

const DiscountedProducts = () => {
  const {
    data: discountedProducts,
    isLoading,
    error,
  } = useFetchItems({ url: `${BASE_URL}/discount-products` });

  if (isLoading) {
    return (
      <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-2 lg:gap-[15px] md:grid-cols-2 lg:grid-cols-4 w-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500">Error fetching products: {error.message}</p>
    );
  }

  // Check if discounted products exist in the response
  if (!discountedProducts?.data?.discountProducts?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="flex justify-between items-center bg-[#C40000] text-white p-5 lg:text-[24px]">
        <h1 className="text-[20px]  font-[600]">Flash Sales</h1>
        <p className="hidden lg:flex font-[600px] ">
          Get up to 50% discount on all orders
        </p>
        <Link
          href={"/"}
          className="flex items-center gap-3 font-[400px] text-[20px]"
        >
          View all
          <IoIosArrowForward className="text-white" />
        </Link>
      </div>

      <div className="py-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
        {discountedProducts.data.discountProducts.map((singleProduct) => (
          <div
            key={singleProduct._id}
            className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:max-w-[295px]"
          >
            <div className="relative">
              <img
                className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
                src={singleProduct.featuredImage}
                alt={singleProduct.name}
              />
              <div className="absolute top-2 right-5 text-[#FFAD33] bg-[#FFF5E5] text-[16px] font-[600] p-2">
                <p>{singleProduct?.discount?.discountPercentage} %</p>
              </div>
            </div>
            <div className="px-3 pt-[.5em] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="capitalize font-semibold text-sm lg:text-lg w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
                    {singleProduct.name}
                  </p>
                </div>
                <AddToFavourite productId={singleProduct._id} />
              </div>
              <p className="truncate flex flex-col">
                <span className=" text-[#4A4545]  text-sm sm:text-lg font-semibold ">
                  &#8358;
                  {singleProduct?.discount.discountPrice.toLocaleString()}
                </span>
                <span className="text-[#888282] text-[16px] line-through">
                  &#8358;{singleProduct.price.toLocaleString()}
                </span>
              </p>
              <span className="lg:hidden">
                <StarRating
                  rating={singleProduct.averageRating}
                  width={15}
                  height={15}
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
                className="bg-[#000000] w-1/2 min-w-[70px] p-1 py-2 text-[10px] leading-[9.75px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
              >
                Add to cart
              </AddToCart>

              <p className="text-[14px] font-[600] text-grey">
                Ends in:{" "}
                <span className="text-[#C40000]">
                  {singleProduct?.discount?.discountEndDate &&
                    new Date(
                      singleProduct.discount.discountEndDate
                    ).toLocaleDateString()}
                </span>{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { DiscountedProducts };
