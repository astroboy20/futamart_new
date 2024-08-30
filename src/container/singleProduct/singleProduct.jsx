import { Fav } from "@/assets";
import { AddToCart } from "@/components/addToCart";
import { StarRating } from "@/components/rating";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const SingleProduct = ({ getSingleProduct }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const reviews = getSingleProduct?.data?.reviews?.reviews || [];

  return (
    <div className="px-3 flex gap-4 flex-col lg:flex-row lg:items-center h-full py-5">
      <img
        className="w-[395px] h-[391px] object-contain bg-white lg:w-[600px] lg:h-[600px]"
        src={getSingleProduct?.data?.product?.featuredImage}
        alt=""
      />
      <div className="flex flex-col gap-4 lg:gap-8 flex-grow">
        <div className="flex items-center gap-2">
          <p className="w-[95%] text-balance text-[18px] leading-[21.9px] font-semibold lg:text-[32px] lg:leading-[39.01px]">
            {getSingleProduct?.data?.product?.name}
          </p>
          <span className="w-[5%]">
            <Fav />
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6">
            <img
              className="w-[48px] h-[48px] object-cover rounded-full lg:h-[80px] lg:w-[80px]"
              src={getSingleProduct?.data?.business?.user_image}
              alt=""
            />
            <p className="text-[16px] font-semibold leading-[19.5px] capitalize sm:text-[20px] lg:leading-[23.38px]">
              {getSingleProduct?.data?.business?.businessName}
            </p>
          </div>
          <Link href={`/seller/${getSingleProduct?.data?.business?.slug}`}>
            <span className="underline text-[10px] leading-[12.19px] font-medium sm:text-[12px] lg:leading-[14.63px]">
              View Profile
            </span>
          </Link>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className="text-[10px] leading-[12.19px] font-medium sm:text-[18px] sm:leading-[21.94px]">
            {getSingleProduct?.data?.product?.description}
          </p>
          <p className="text-[12px] leading-[14.63px] font-semibold text-[#888282] sm:text-[16px] sm:leading-[19.5px]">
            Size: {getSingleProduct?.data.product?.size || "Size"}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className="text-[16px] font-semibold leading-[19.5px] sm:text-[18px] sm:leading-[21.94px]">
            &#8358;{getSingleProduct?.data?.product?.price}
          </p>
          <div className="relative flex items-center gap-2 sm:gap-4">
            <StarRating
              rating={getSingleProduct?.data?.product?.averageRating || 5}
              width={15}
              height={15}
            />
            <button
              onClick={toggleDropdown}
              className="flex items-center underline focus:outline-none"
            >
              View reviews
              <span className="text-orange-500 ml-2">({reviews.length})</span>
              <span className="ml-1">
                {isDropdownOpen ? (
                  <svg
                    className="w-4 h-4 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 inline-block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                )}
              </span>
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute mt-2 w-full max-w-md bg-white border border-gray-300 shadow-lg rounded-lg max-h-60 overflow-auto"
              >
                <div className="p-4 text-gray-700">
                  <p className="text-sm font-semibold mb-2">Reviews:</p>
                  <div className="space-y-2">
                    {reviews.map((review, index) => (
                      <div key={index} className="p-2 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">
                            {review.userId?.firstname || "Anonymous"}
                          </p>
                          <StarRating
                            rating={review.rating || 0}
                            width={15}
                            height={15}
                          />
                        </div>
                        <p className="text-sm">
                          {review.review || "No review text available."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5 sm:flex-col">
          <AddToCart
            id={getSingleProduct?.data?.product?._id}
            quantity={1}
            className="bg-[#FFFFFF] border border-[#000000] py-[10px] px-[24px] font-semibold text-[12px] leading-[14.63px] rounded-[4px] flex-grow sm:p-[24px] sm:text-[24px] sm:leading-[29.26px] sm:w-full"
          >
            Add to cart
          </AddToCart>
          <button className="bg-[#000000] text-[#FFFFFF] border border-[#000000] py-[10px] px-[24px] font-semibold text-[12px] leading-[14.63px] rounded-[4px] flex-grow sm:p-[24px] sm:text-[24px] sm:leading-[29.26px] sm:w-full">
            Chat with seller
          </button>
        </div>
      </div>
    </div>
  );
};

export { SingleProduct };
