"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./PopularBrand.module.css"; // Import custom CSS module
import { useRouter } from "next/navigation";
const PopularBrand = () => {
  const scrollRef = useRef(null);
  const router = useRouter()
  // Auto-scroll function
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        // Check if scrolled to the end, reset to start if necessary
        if (
          scrollRef.current.scrollLeft + scrollRef.current.offsetWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: "smooth" }); 
        }
      }
    }, 3000); // Adjust interval duration as needed

    return () => clearInterval(interval);
  }, []);

  const handleOnClick = () => {
    router.push("/seller");
};

  return (
    <div className="pt-10 flex flex-col gap-6">
      {/* <header className="text-[20px] lg:text-[35px] font-[600]">
        Popular Brands
      </header> */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto no-scrollbar gap-[20px]"
      >
        {/* Card 1 */}
        <div
          style={{ "--animation-order": 1 }}
          className={`flex justify-between p-[3%] flex-shrink-0 bg-[#FFF0B6] rounded-[4px] h-fit w-[300px] lg:overflow-y-hidden lg:w-[720px] lg:p-[1.5%] lg:h-[250px] ${styles.slideIn}`}
        >
          <div className="flex flex-col gap-[15px] h-full">
            <div className="flex flex-col gap-[5px] h-full justify-between">
              <h1 className="text-[18px] lg:text-[36px] font-[600]">
              Boost Your Business
              </h1>
              <p className="text-[10px] mr-5 lg:text-[16px] text-[#564F65] font-[400]">
              Reach more customers with our platform, designed to help business owners thrive with ease and enjoy increased visibility.
              </p>
            </div>
            <button onClick={handleOnClick} className="mt-auto w-fit text-[8px] px-[20px] lg:text-[16px] font-[400] text-[#FFFFFF] lg:px-[40px] py-[8px] rounded-[4px] bg-black">
            Start Selling Today
            </button>
          </div>
          <div className="flex justify-center items-center lg:w-[230px] lg:h-[240px]">
            <Image
              src="/images/card1.png"
              objectFit="cover"
              width={230}
              height={240}
              alt="good-image"
            />
          </div>
        </div>

        {/* Card 2 */}
        <div
          style={{ "--animation-order": 2 }}
          className={`flex justify-between p-[3%] flex-shrink-0 bg-[#DBDBDB] rounded-[4px] h-fit w-[300px] lg:w-[720px] lg:p-[1.5%] lg:h-[250px] ${styles.slideIn}`}
        >
          <div className="flex flex-col gap-[20px] h-full">
            <div className="flex flex-col gap-[5px] h-full justify-between">
              <h1 className="text-[18px] lg:text-[36px] font-[600]">
              Support Local, Buy Local
              </h1>
              <p className="text-[10px] mr-5 lg:text-[16px] font-[400]">
              Find exactly what you need without the hassle of searching far and wide. futamart brings products from verified local divers sellers to your fingertips.
              </p>
            </div>
            <button className="mt-auto w-fit text-[8px] px-[20px] lg:text-[16px] font-[400] text-[#FFFFFF] lg:px-[40px] py-[8px] rounded-[4px] bg-black">
            Start Shopping
            </button>
          </div>
          {/* <div className="flex justify-center items-center lg:w-[230px] lg:h-[240px]">
            <Image
              src="https://s3-alpha-sig.figma.com/img/a311/92c6/d2d7fb16bd4bb3e5b326715224791d7d?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UC1AzmK9obnvWfWl8mcAvNxDVmFIG8cXKblcYvo0-hqIK-fPEtQ2pocV1ASgSEZbnqaFtGCPzGSLAwzrzNWHbn5G19hdhOxRK9RYibF8dFo7d3B2vtlUt0l1fJRG1-6iQPSJdzWh0XpUJmdApBdJN-kGOZlz-xQWsAvI1fmxeWcwW9~ZOHGrzu~iO7vHAmUhEIEvcKZiP-qmwt-UqDAjTxdS1mKUreL01EQwd3qzEhpqEzTpbgCH-GO1e6v9nshPCut35eWjhQmulDHgJg~h2xwPaXcOStsCQlFsd0l38Sey6UMILOXx4l60-mkP7H-XwGETdrOZqF-OmUYQXXo~nw__"
              objectFit="cover"
              width={230}
              height={240}
              alt="good-image"
            />
          </div> */}
        </div>

        <div
          style={{ "--animation-order": 2 }}
          className={`flex justify-between p-[3%] flex-shrink-0 bg-black rounded-[4px] h-fit w-[300px] lg:w-[720px] lg:p-[1.5%] lg:h-[250px] ${styles.slideIn}`}
        >
          <div className="flex flex-col gap-[20px] h-full">
            <div className="flex flex-col gap-[5px] h-full justify-between">
              <h1 className="text-[18px] lg:text-[36px] text-white font-[600]">
             New Products Weekly
              </h1>
              <p className="text-[10px] mr-5 lg:text-[16px] text-white font-[400]">
              Our inventory is refreshed weekly with exciting new products to meet your needs and preferences. Always something new for you at futamart.
              </p>
            </div>
            <button className="mt-auto w-fit text-[8px] px-[20px] lg:text-[16px] font-[400] lg:px-[40px] py-[8px] rounded-[4px] bg-[#DBDBDB]">
            See What's New
            </button>
          </div>
          {/* <div className="flex justify-center items-center lg:w-[230px] lg:h-[240px]">
            <Image
              src="/images/food.png"
              objectFit="cover"
              width={230}
              height={240}
              alt="good-image"
            />
          </div> */}
        </div>
        {/* Additional Cards can be added similarly */}
      </div>
    </div>
  );
};

export { PopularBrand };
