import Image from "next/image";

const PopularBrand = () => {
  return (
    <div className="pt-10 pl-[6%] flex flex-col gap-4">
      <header className="text-[24px] lg:text-[35px] font-[600]">Popular Brands</header>
      <div className="flex w-full overflow-x-scroll no-scrollbar gap-[20px]">
        <div className="flex justify-between p-[3%] flex-shrink-0 bg-[#DBDBDB] rounded-[4px] h-fit w-[300px] lg:overflow-y-hidden lg:w-[720px] lg:p-[1.5%] lg:h-[250px]">
          <div className="flex flex-col  gap-[15px] h-full">
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-[18px] lg:text-[24px] font-[600]">La_Spag</h1>
              <p className="text-[8px] mr-5 lg:text-[16px] font-[400]">
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
        <div className="flex justify-between p-[3%] flex-shrink-0 bg-[#DBDBDB] rounded-[4px] h-fit w-[300px] overflow-hidden lg:w-[720px] lg:p-[1.5%]  lg:h-[250px] ">
          <div className="flex flex-col  gap-[20px] h-full">
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-[18px] lg:text-[24px] font-[600]">La_Spag</h1>
              <p className="text-[8px] mr-5 lg:text-[16px] font-[400]">
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
      </div>
    </div>
  );
};

export { PopularBrand };
