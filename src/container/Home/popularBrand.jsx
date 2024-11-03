"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./PopularBrand.module.css"; // Import custom CSS module

const PopularBrand = () => {
  const scrollRef = useRef(null);

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

  return (
    <div className="pt-10 flex flex-col gap-6">
      <header className="text-[20px] lg:text-[35px] font-[600]">
        Popular Brands
      </header>
      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto no-scrollbar gap-[20px]"
      >
        {/* Card 1 */}
        <div
          style={{ "--animation-order": 1 }}
          className={`flex justify-between p-[3%] flex-shrink-0 bg-[#8B0000] rounded-[4px] h-fit w-[300px] lg:overflow-y-hidden lg:w-[720px] lg:p-[1.5%] lg:h-[250px] ${styles.slideIn}`}
        >
          <div className="flex flex-col gap-[15px] h-full">
            <div className="flex flex-col gap-[5px] h-full justify-between">
              <h1 className="text-[18px] lg:text-[36px] text-[#FFD700] font-[600]">
                La_Spag
              </h1>
              <p className="text-[10px] mr-5 lg:text-[16px] text-white font-[400]">
                Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum.
              </p>
            </div>
            <button className="mt-auto w-fit text-[8px] px-[20px] lg:text-[16px] font-[400] text-[#FFFFFF] lg:px-[40px] py-[8px] rounded-[4px] bg-black">
              View Brand
            </button>
          </div>
          <div className="flex justify-center items-center lg:w-[230px] lg:h-[240px]">
            <Image
              src="/images/food.png"
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
          className={`flex justify-between p-[3%] flex-shrink-0 bg-[#F68B1E] rounded-[4px] h-fit w-[300px] lg:w-[720px] lg:p-[1.5%] lg:h-[250px] ${styles.slideIn}`}
        >
          <div className="flex flex-col gap-[20px] h-full">
            <div className="flex flex-col gap-[5px] h-full justify-between">
              <h1 className="text-[18px] lg:text-[36px] font-[600]">
                Cakes & Pastries
              </h1>
              <p className="text-[10px] mr-5 lg:text-[16px] text-white font-[400]">
                Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum.
              </p>
            </div>
            <button className="mt-auto w-fit text-[8px] px-[20px] lg:text-[16px] font-[400] text-[#FFFFFF] lg:px-[40px] py-[8px] rounded-[4px] bg-black">
              View Brand
            </button>
          </div>
          <div className="flex justify-center items-center lg:w-[230px] lg:h-[240px]">
            <Image
              src="/images/food.png"
              objectFit="cover"
              width={230}
              height={240}
              alt="good-image"
            />
          </div>
        </div>

        <div
          style={{ "--animation-order": 2 }}
          className={`flex justify-between p-[3%] flex-shrink-0 bg-black rounded-[4px] h-fit w-[300px] lg:w-[720px] lg:p-[1.5%] lg:h-[250px] ${styles.slideIn}`}
        >
          <div className="flex flex-col gap-[20px] h-full">
            <div className="flex flex-col gap-[5px] h-full justify-between">
              <h1 className="text-[18px] lg:text-[36px] text-white font-[600]">
                Chikinie Monie
              </h1>
              <p className="text-[10px] mr-5 lg:text-[16px] text-white font-[400]">
                Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum.
              </p>
            </div>
            <button className="mt-auto w-fit text-[8px] px-[20px] lg:text-[16px] font-[400] text-[#FFFFFF] lg:px-[40px] py-[8px] rounded-[4px] bg-[#F68B1E]">
              View Brand
            </button>
          </div>
          <div className="flex justify-center items-center lg:w-[230px] lg:h-[240px]">
            <Image
              src="/images/food.png"
              objectFit="cover"
              width={230}
              height={240}
              alt="good-image"
            />
          </div>
        </div>
        {/* Additional Cards can be added similarly */}
      </div>
    </div>
  );
};

export { PopularBrand };
