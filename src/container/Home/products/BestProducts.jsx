"use client";

import Link from "next/link";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";

const BestProducts = () => {
  const {
    data: bestProducts,
    isLoading,
    error,
  } = useFetchItems({ url: `${BASE_URL}?limit=4` });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-10 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] lg:text-[35px] font-[600]">
          Best Selling Products
        </h1>
        <p className="flex items-center gap-3 text-[10px] lg:text-[20px]">
          View all
          {/* <Next_Icon /> */}
        </p>
      </div>

      <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
        {bestProducts?.map((singleProduct) => (
          <div
            key={singleProduct.id}
            className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:max-w-[295px]"
          >
            <Link href={`/products/${singleProduct.id}`}>
              <img
                className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
                src={singleProduct.image}
                alt={singleProduct.title}
              />
            </Link>
            <div className="px-3 pt-[.5em] flex flex-col gap-[.5em]">
              <div className="flex items-center justify-between">
                <Link href={`/products/${singleProduct.id}`}>
                  <p className="capitalize font-semibold text-[10px] w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
                    {singleProduct.title}
                  </p>
                </Link>
                {/* <Fav /> */}
              </div>
              <p className="text-[#888282] text-[8px] leading-[9.75px] w-[70px] h-[10px] sm:w-[105px] sm:h-[20px] sm:text-[16px] sm:leading-[19.5px] truncate">
                &#8358;{singleProduct.price}
              </p>
              {/* <Rating
                rating={singleProduct.rating.rate}
                width={10}
                height={10}
              /> */}
              {/* <AddToCart
                id={singleProduct.id}
                className="bg-black w-[64px] h-[20px] text-[8px] leading-[9.75px] sm:w-[132px] sm:h-[36px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
              >
                Add to cart
              </AddToCart> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { BestProducts };
