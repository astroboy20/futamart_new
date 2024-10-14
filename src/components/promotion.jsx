import { promotionData } from "@/providers/data";

const Promotion = () => {
  return (
    <div className="px-[6%]">

 
    <div className="relative rounded-[4px] sm:rounded-none bg-black my-5 text-[#FFFFFF] py-4 px-8">
      <p className=" my-1 text-center sm:text-right text-[18px] sm:text-[24px] text-[#FFAD33] font-semibold">
        Combo deal
      </p>
      <div className="flex flex-col items-center p-3 justify-between gap-10 sm:flex-row">
        <div
          style={{
            background: "radial-gradient(circle, gray 0%, gray 20%, black 80%)",
          }}
          className=""
        >
          <img
            className="w-[340px] h-[240px] md:h-[332.5px] md:w-[500px] sm:h-[425px] sm:w-[588px]"
            src={promotionData.imgUrl}
            alt=""
          />
        </div>
        <div className="max-w-[500px] flex flex-col items-center text-center sm:text-right sm:items-end justify-center gap-5">
          <p className="text-[18px] leading-[24.38px] sm:text-[32px] sm:leading-[39.01px] font-semibold">
            Was {promotionData.oldPrice} <br /> Now {promotionData.newPrice}
          </p>
          <div className="text-[20px] leading-[29.26px] sm:text-[40px] font-semibold text-wrap sm:leading-[48.76px] ">
            {promotionData.text} <span className="text-[#FFAD33]">#1400</span>
          </div>
          <button className="bg-[#FFFFFF] p-1 text-[18px] leading-[21.94px] w-[156px] h-[40px] sm:w-[241px] sm:h-[60px] sm:text-[24px] sm:leading-[29.26px] text-[#000000] rounded-sm border-none">
            Chat with seller
          </button>
        </div>
      </div>
      <span className=" absolute top-6 right-4 sm:flex sm:static justify-end items-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="44px"
          fill="#F2F3F4"
        >
          <path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z" />
        </svg>
      </span>
    </div>
    </div>
  );
};

export { Promotion };
