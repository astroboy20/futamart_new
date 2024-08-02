"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { Promotion } from "@/components/promotion";
import { OtherProducts } from "@/container/singleProduct/otherProducts";
import { SingleProduct } from "@/container/singleProduct/singleProduct";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import React from "react";

const Page = ({ params }) => {
  const { slug } = params;
  const {
    data: getSingleProduct,
    isLoading,
    error,
  } = useFetchItems({
    url: `${BASE_URL}/product/${slug}`,
  });

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <Header />
      <SingleProduct getSingleProduct={getSingleProduct} />
      <OtherProducts
        relatedProducts={getSingleProduct?.data?.relatedProducts}
      />
      <Promotion />
      <Footer />
    </main>
  );
};

export default Page;
