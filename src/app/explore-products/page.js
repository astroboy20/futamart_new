"use client"
import { AddToCart } from "@/components/addToCart";
import { AddToFavourite } from "@/components/AddToFavourite";
import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { Loading } from "@/components/loading";
import { StarRating } from "@/components/rating";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { Link } from "next/link";

export default function Page() {
  const {
    data: explore,
    isLoading,
    error,
  } = useFetchItems({
    url: `${BASE_URL}/products_by_query?query=explore&page=1`,
  });

  if (isLoading) {
    return (
      <div className="p-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-2 lg:gap-[15px] md:grid-cols-2 lg:grid-cols-4 w-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div> {error.message}</div>;
  }
  return (
    <main>
      <Header />
      <div className="flex flex-col gap-6 py-[3%] px-[6%]">
        <div className="flex justify-between items-center">
          <h1 className="text-[20px] lg:text-[35px] font-[600]">
            Explore Products
          </h1>
        </div>

        <div className="py-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
          {explore?.data?.products?.map((singleProduct) => (
            <div
              key={singleProduct._id}
              className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:max-w-[295px]"
            >
              <Link href={`/products/${singleProduct.slug}`}>
                <img
                  className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
                  src={singleProduct.featuredImage}
                  alt={singleProduct.name}
                />
              </Link>
              <div className="px-3 pt-[.5em] flex flex-col gap-[.5em]">
                <div className="flex items-center justify-between">
                  <Link href={`/products/${singleProduct.slug}`}>
                    <p className="capitalize font-semibold text-sm lg:text-lg w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
                      {singleProduct.name}
                    </p>
                  </Link>
                  <AddToFavourite productId={singleProduct._id} />
                </div>
                <p className="text-[#888282] text-[10px] lg:text-base font-semibold leading-[9.75px] w-[70px] h-[10px] sm:w-[105px] sm:h-[20px] sm:text-[16px] sm:leading-[19.5px] truncate">
                  &#8358;{singleProduct.price.toLocaleString()}
                </p>
                <span className="lg:hidden">
                  <StarRating
                    rating={singleProduct.averageRating}
                    width={10}
                    height={10}
                  />
                </span>
                <span className="hidden lg:flex">
                  <StarRating
                    rating={singleProduct.averageRating}
                    width={20}
                    height={20}
                  />
                </span>
                <AddToCart
                  id={singleProduct._id}
                  className="bg-black w-1/2 min-w-[70px] h-[20px] text-[8px] leading-[9.75px] sm:w-[132px] sm:h-[36px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
                >
                  Add to cart
                </AddToCart>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
