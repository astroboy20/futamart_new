"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Categories } from "../../components/categories";
import { BestProducts } from "./products/BestProducts";
import { ExploreProducts } from "./products/ExploreProducts";
import { PopularBrand } from "./popularBrand";
// import { Promotion } from "@/components/promotion";
import { RecentProducts } from "./products/recentlyAddedProduct";
import CustomCarousel from "@/components/CustomCarousel";
import { Categories2 } from "./Categories";
import { DiscountedProducts } from "./products/discountedProducts";

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
      <div className="px-[6%]">
        <Categories />
        <PopularBrand />
        <BestProducts />
        <DiscountedProducts />
        <Categories2 />
        <RecentProducts />
        <CustomCarousel />
        <ExploreProducts />
      </div>
    </>
  );
};

export { HomeContainer };
