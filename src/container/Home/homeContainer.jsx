"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Categories } from "../../components/categories";
import { BestProducts } from "./products/BestProducts";
import { ExploreProducts } from "./products/ExploreProducts";
import { PopularBrand } from "./popularBrand";
import { Promotion } from "@/components/promotion";
import { RecentProducts } from "./products/recentlyAddedProduct";

const HomeContainer = () => {
  const [showPopup, setShowPopup] = useState(true);

  // Hide popup after 3 seconds or on click
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 10000); // Hide after 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-md text-center max-w-[300px] w-full">
            {/* Image inside the popup */}
            <Image
              src="/images/card1.png"
              objectFit="cover"
              width={230}
              height={240}
              alt="good-image"
              className="rounded-lg mb-4" // Added border-radius and margin
            />
            <h2 className="text-xl font-semibold mb-4">Launching Soon...</h2>
            <button
              className="mt-4 px-6 py-2 bg-black text-white rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="px-[6%]">
        <Categories />
        <PopularBrand />
        <BestProducts />
        <RecentProducts />
        <ExploreProducts />
      </div>
      {/* <Promotion /> */}
    </>
  );
};

export { HomeContainer };
