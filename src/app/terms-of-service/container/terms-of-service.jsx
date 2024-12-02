import { Button } from "@/components/ui/button";
import React from "react";
// import Image from "next/image";

const Term = () => {
  return (
    <div className="flex flex-col gap-5  py-[3%] px-[6%]">
      <div className="w-full m-auto bg-[url('/images/overlay.png')] h-[400px] flex justify-center items-center">
        <h1 className="text-[30px] lg:text-[60px] font-[600] text-[white]">
          Terms of Service
        </h1>
      </div>
      <div>
        <ul className="text-[16p] lg:text-[20px] font-[400] list-disc flex flex-col gap-5 text-justify">
          <li>
            {" "}
            Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Yorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis.{" "}
          </li>
          <li>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.Yorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.Yorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis.{" "}
          </li>
          <li>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.vYorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.Yorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis.{" "}
          </li>
          <li>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.Yorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.Yorem ipsum dolor sit amet,
            consectetur adipiscing elit.{" "}
          </li>
          <li>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos.Yorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet
            odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.Yorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis.
          </li>

          <label className="flex gap-2 items-center">
            <input type="checkbox" className="w-6 h-6" />{" "}
            <p>I agree to this conditions</p>
          </label>
        </ul>
      </div>
      <Button className="text-[16px] lg:text-[20px] font-[600] h-[55px]">Agree</Button>
    </div>
  );
};

export { Term };
