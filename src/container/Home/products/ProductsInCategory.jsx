"use client";
import { Fav } from "@/assets";
import { AddToCart } from "@/components/addToCart";
import { StarRating } from "@/components/rating";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import Link from "next/link";
const ProductsInCategory = ({ slug }) => {
  const {
    data: categoryProduct,
    isLoading,
    error,
  } = useFetchItems({
    url: `${BASE_URL}/category/${slug}`,
  });

  console.log(categoryProduct);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4 ">
      {categoryProduct?.data.map((singleProduct) => {
        return (
          <div
            key={singleProduct._id}
            className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:max-w-[295px]"
          >
            <Link href={`/products/${singleProduct.slug}`}>
              <img
                className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
                src={singleProduct.featuredImage}
                alt=""
              />
            </Link>
            <div className="px-3 pt-[.5em] flex flex-col gap-[.5em]">
              <div className="flex  items-center justify-between">
                <Link href={`/products/${singleProduct.slug}`}>
                  <p className="capitalize font-semibold text-[10px] w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
                    {singleProduct.name}
                  </p>
                </Link>
                <Fav />
              </div>
              <p className="text-[#888282] text-[8px] leading-[9.75px] w-[70px] h-[10px] sm:w-[105px] sm:h-[20px] sm:text-[16px] sm:leading-[19.5px] truncate">
                &#8358;{singleProduct.price}
              </p>
              <StarRating
                rating={singleProduct.averageRating}
                width={10}
                height={10}
              />
              <AddToCart
                id={singleProduct._id}
                className="bg-black w-[64px] h-[20px] text-[8px] leading-[9.75px] sm:w-[132px] sm:h-[36px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
              >
                Add to cart
              </AddToCart>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsInCategory;
