"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
// import Image from "next/image";

const PiracyPolicy = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  return (
    <div className="flex flex-col gap-5  py-[3%] px-[6%]">
     <div className="relative w-full m-auto bg-[url('/images/settings.png')] bg-center bg-cover h-[400px] flex justify-center items-center">
  <div className="absolute inset-0 bg-[#00000099]"></div>
  <h1 className="relative text-[30px] lg:text-[60px] font-[600] text-[white]">
    Privacy Settings
  </h1>
</div>

      <div>
        <div className="text-[16p] lg:text-[20px] font-[400] list-disc flex flex-col gap-5 text-justify">
          <p>
            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Yorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.Yorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.Yorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.vYorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.Yorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.Yorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.Yorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos.Yorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.Yorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.Yorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.Yorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
            libero et velit interdum, ac aliquet odio mattis.{" "}
          </p>

          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-6 h-6"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />{" "}
            <p>I agree to this conditions</p>
          </label>
        </div>
      </div>
      <Button disabled={!isChecked} className="text-[16px] lg:text-[20px] font-[600] h-[55px]">
        Agree
      </Button>
    </div>
  );
};

export { PiracyPolicy };
