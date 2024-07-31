import { Fav } from "@/assets";
import Link from "next/link";
import { StarRating } from "@/components/rating";
import { AddToCart } from "@/components/addToCart";

const OtherProducts = ({ relatedProducts }) => {
  return (
    <div className="my-10 lg:py-3 lg:px-[4%]">
      <div>
        <p className="text-[24px] pl-3 mb-5 leading-[29.26px] font-semibold sm:text-[40px] sm:leading-[48.76px]">
          Other Products
        </p>
        <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4 ">
          {relatedProducts?.map((singleProduct) => {
            return (
              <div
                key={singleProduct._id}
                className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#F2F3F4] sm:max-w-[295px]"
              >
                <Link href={`/products/${singleProduct.slug}`}>
                  <img
                    className="h-[175px] w-[180px] object-contain bg-white sm:h-[290px] sm:w-[295px]"
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
                    rating={singleProduct.averageRating || 5}
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
      </div>
    </div>
  );
};

export { OtherProducts };
