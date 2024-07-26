"use client";

import { Footer } from "@/components/footer";
import { Promotion } from "@/components/promotion";
import { OtherProducts } from "@/container/singleProduct/otherProducts";
import { SingleProduct } from "@/container/singleProduct/singleProduct";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import data from "@/providers/fakeJsonData";
import React from "react";

const Page = ({ params }) => {
  const { id } = params;
  const getSeller = data.find((product) => product._id === 1);
  const { data: getSingleProduct } = useFetchItems({
    url: `${BASE_URL}/${id}`,
  });

  return (
    <main>
      <SingleProduct seller={getSeller} getSingleProduct={getSingleProduct} />
      <OtherProducts />
      <Promotion />
      <Footer />
    </main>
  );
};

export default Page;
