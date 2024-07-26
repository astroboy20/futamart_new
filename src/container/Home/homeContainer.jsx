import React from "react";
import { Categories } from "../../components/categories";
import { BestProducts } from "./products/BestProducts";
import { ExploreProducts } from "./products/ExploreProducts";
import { PopularBrand } from "./popularBrand";
import { Promotion } from "@/components/promotion";

const HomeContainer = () => {
  return (
    <>
      <Categories />
      <PopularBrand />
      <div className="px-[6%]">
        <BestProducts />
        <ExploreProducts />
      </div>
      <Promotion />
    </>
  );
};

export { HomeContainer };
