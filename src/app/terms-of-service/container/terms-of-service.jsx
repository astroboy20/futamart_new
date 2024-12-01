import React from "react";
import Image from "next/image";

const Term = () => {
  return (
    <div className="flex flex-col gap-5  py-[3%] px-[6%]">
      <div className="border-4 w-full border-red-700 m-auto bg-[url('/images/overlay.png')] h-[300px] flex justify-center items-center">
       <h1>Terms of Service</h1>
      </div>
    </div>
  );
};

export { Term };
