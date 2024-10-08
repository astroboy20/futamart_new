import React, { useState, useRef, useEffect } from "react";
import { Fav } from "@/assets";
import { AddToCart } from "@/components/addToCart";
import { StarRating } from "@/components/rating";
import { BASE_URL } from "@/hooks/useFetchItems";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { X } from "lucide-react";

const SingleProduct = ({ getSingleProduct }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleModalClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setSelectedImage(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (selectedImage) {
      document.addEventListener("mousedown", handleModalClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleModalClickOutside);
    };
  }, [selectedImage]);

  const handleClick = (userId, name, price, featuredImage) => {
    const url = `/user/chat/${userId}?name=${encodeURIComponent(
      name
    )}&price=${encodeURIComponent(price)}&featuredImage=${encodeURIComponent(
      featuredImage
    )}`;
    router.push(url);
  };

  const handleTrackViews = (userId) => {
    axios
      .post(
        `${BASE_URL}/view/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("View tracked successfully", response.data);
      })
      .catch((error) => {
        console.error("Error tracking views", error);
      });
  };

  const reviews = getSingleProduct?.data?.reviews?.reviews || [];

  const ImageModal = ({ image, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="relative max-w-3xl max-h-[90vh] mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300"
        >
          <X size={24} />
        </button>
        <img
          src={image}
          alt="Enlarged product image"
          className="max-h-[90vh] max-w-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <div className="px-3 flex gap-6 flex-col lg:flex-row lg:items-center h-full py-5">
      <div className="flex flex-col gap-4 lg:w-1/2 w-full">
        <img
          className="object-contain bg-white min-w-[70%] mx-auto cursor-pointer hover:opacity-80 transition-opacity"
          src={getSingleProduct?.data?.product?.featuredImage}
          alt=""
          onClick={() =>
            setSelectedImage(getSingleProduct?.data?.product?.featuredImage)
          }
        />
        <div className="flex flex-row gap-1 h-[100px] max-w-[70%] mx-auto overflow-scroll items-center justify-center">
          {getSingleProduct?.data?.product?.additionalImages?.map(
            (image, index) => (
              <img
                key={index}
                className="bg-white w-[80px] cursor-pointer hover:opacity-80 transition-opacity"
                src={image}
                alt=""
                onClick={() => setSelectedImage(image)}
              />
            )
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <div className="flex flex-col lg:w-1/2 gap-4 lg:gap-8 flex-grow">
        <div className="flex items-center gap-2">
          <p className="w-[95%] text-balance text-lg leading-[21.9px] font-semibold lg:text-[32px] lg:leading-[39.01px]">
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
              src={getSingleProduct?.data?.business?.business_logo}
              alt=""
            />
            <p className="text-[16px] font-semibold leading-[19.5px] capitalize sm:text-[20px] lg:leading-[23.38px]">
              {getSingleProduct?.data?.business?.businessName}
            </p>
          </div>
          <Link href={`/seller/${getSingleProduct?.data?.business?.slug}`}>
            <span
              onClick={() =>
                handleTrackViews(getSingleProduct?.data?.business?._id)
              }
              className="underline text-[10px] leading-[12.19px] font-medium sm:text-[12px] lg:leading-[14.63px]"
            >
              View Profile
            </span>
          </Link>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className="text-[10px] leading-[12.19px] font-medium sm:text-[18px] sm:leading-[21.94px]">
            {getSingleProduct?.data?.product?.description}
          </p>
          <p className="text-[12px] leading-[14.63px] font-semibold text-[#888282] sm:text-[16px] sm:leading-[19.5px]">
            {getSingleProduct?.data?.product?.attributes?.map((attribute) => (
              <div key={attribute._id} className="flex flex-col gap-2 sm:gap-4">
                <p className="text-[12px] leading-[14.63px] font-semibold text-[#888282] sm:text-[16px] sm:leading-[19.5px]">
                  {attribute.name}: {attribute.variants.join(", ")}
                </p>
              </div>
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className="text-[16px] font-semibold leading-[19.5px] sm:text-[18px] sm:leading-[21.94px]">
            &#8358;{getSingleProduct?.data?.product?.price.toLocaleString()}
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
          <button
            onClick={() =>
              handleClick(
                getSingleProduct?.data?.product?.user,
                getSingleProduct?.data?.product?.name,
                getSingleProduct?.data?.product?.price,
                getSingleProduct?.data?.product?.featuredImage
              )
            }
            className="bg-[#000000] text-[#FFFFFF] border border-[#000000] py-[10px] px-[24px] font-semibold text-[12px] leading-[14.63px] rounded-[4px] flex-grow sm:p-[24px] sm:text-[24px] sm:leading-[29.26px] sm:w-full"
          >
            Chat with seller
          </button>
        </div>
      </div>
    </div>
  );
};

export { SingleProduct };
