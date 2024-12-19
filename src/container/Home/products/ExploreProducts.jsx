"use client";
import Link from "next/link";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { StarRating } from "@/components/rating";
import { AddToCart } from "@/components/addToCart";
import { Fav, Next_Icon } from "@/assets";
import { Loading } from "@/components/loading";
import { AddToFavourite } from "@/components/AddToFavourite";
import { useState, useEffect } from "react";

const ExploreProducts = () => {
  const {
    data: exploreProducts,
    isLoading,
    error,
  } = useFetchItems({ url: `${BASE_URL}/products` });

  if (isLoading) {
    return (
      <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-2 lg:gap-[15px] md:grid-cols-2 lg:grid-cols-4 w-full">
        <Loading />
      </div>
    );
  }

  if (!exploreProducts?.data?.products?.length) {
    return (
      <div className="flex flex-col gap-10 pb-10">
        <h1 className="text-[20px] lg:text-[35px] font-[600]">
          Explore Products
        </h1>
        <p className="text-center text-xl font-semibold">Launching Soon...</p>
      </div>
    );
  }

  const limitedProducts = exploreProducts.data.products.slice(0, 20);

  const getTimeRemaining = (endDate) => {
    const countdownDate = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, distance };
  };

  const CountdownTimer = ({ discountEndDate}) => {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(discountEndDate));

    useEffect(() => {
      const interval = setInterval(() => {
        const time = getTimeRemaining(discountEndDate);
        if (time.distance < 0) {
          clearInterval(interval); // Stop the interval once the countdown is over
        } else {
          setTimeRemaining(time);
        }
      }, 1000);

      return () => clearInterval(interval); // Clean up on unmount
    }, [discountEndDate]);

    return (
      <span className="text-[#C40000]">
        {timeRemaining.distance < 0
          ? "Expired"
          : `${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s`}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] lg:text-[35px] font-[600]">
          Explore Products
        </h1>
        <Link
          href={"/explore-products"}
          className="flex items-center gap-3 text-[15px] lg:text-[20px]"
        >
          View all
          <Next_Icon />
        </Link>
      </div>

      <div className="py-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
        {limitedProducts.map((singleProduct) => (
          <div
            key={singleProduct._id}
            className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:max-w-[295px]"
          >
            <Link href={`/products/${singleProduct.slug}`} className="relative">
              <img
                className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
                src={singleProduct.featuredImage}
                alt={singleProduct.name}
              />
              {singleProduct?.discount?.isOnDiscount &&
                singleProduct?.discount?.discountStartDate && (
                  <div className="absolute top-2 right-5 text-[#FFAD33] bg-[#FFF5E5] text-[16px] font-[600] p-2">
                    <p>-{singleProduct?.discount?.discountPercentage}%</p>
                  </div>
                )}
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

              {singleProduct?.discount?.isOnDiscount ? (
                <div className="flex items-center">
                  <span className="text-[20px] text-[#4A4545] font-[600]">
                    &#8358;
                    {singleProduct?.discount?.discountPrice.toLocaleString()}
                  </span>
                  <span className="line-through text-[#A3AA9E] ml-2">
                    &#8358;
                    {singleProduct?.price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <p className="text-[#888282] text-sm sm:text-lg font-semibold truncate">
                  &#8358;{singleProduct.price.toLocaleString()}
                </p>
              )}

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
                className="bg-black w-1/2 min-w-[70px] h-[20px] text-[8px] leading-[9.75px] sm:w-[132px] sm:h-[36px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
              >
                Add to cart
              </AddToCart>

              {singleProduct?.discount?.isOnDiscount && (
                <p className="text-[14px] font-[600] text-grey">
                  Ends in:{" "}
                  <CountdownTimer discountEndDate={singleProduct?.discount?.discountEndDate} />
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ExploreProducts };
