"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { Promotion } from "@/components/promotion";
import { OtherProducts } from "@/container/singleProduct/otherProducts";
import { SingleProduct } from "@/container/singleProduct/singleProduct";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Logo_Black } from "@/assets";

const Page = ({ params }) => {
  const { slug } = params;
  const {
    data: getSingleProduct,
    isLoading,
    error,
  } = useFetchItems({
    url: `${BASE_URL}/product/${slug}`,
  });

  if (isLoading)
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center">
        <div className="flex flex-col text-center">
          <Logo_Black />
          <h1 className="text-[32px] font-[600]">
            {" "}
            <Typewriter
              words={["futamart"]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            {/* futamart */}
          </h1>
        </div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <Header />
      <div className="px-[6%]">
        <SingleProduct getSingleProduct={getSingleProduct} />
        <OtherProducts
          relatedProducts={getSingleProduct?.data?.relatedProducts}
        />
      </div>

      <Promotion />
      <Footer />
    </main>
  );
};

export default Page;
