"use client"
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Introduction = ({ nextStep }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <div className="text-wrap mx-auto w-[full]  flex flex-col gap-4">
        <p className="text-wrap md:text-[28px] w-[281px] md:w-[444px] md:leading-[39.01px] font-bold">
          Requirements to become a seller on futamart
        </p>
        <p className="text-[14px] leading-[17.07px] md:text-[20px] md:leading-[26.82px]">
          To become a seller on FUTA MART, you must:
        </p>
        <ul className="list-disc p-3 flex flex-col gap-6 md:gap-4 text-[14px] leading-[17.07px] md:text-[20px] md:leading-[26.82px]">
          <li>
            Provide a valid Nigerian national identification number (NIN) for
            the background check process
          </li>
          <li>Be at least 18 years old.</li>
          <li>
            Submit personal information for background checks and identification
            purposes, ensuring confidentiality according to our Privacy Policy.
          </li>
          <li>
            If you meet these criteria, click continue to proceed with your
            registration!
          </li>
        </ul>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <p className="text-[14px] leading-[24px] sm:text-[20px] sm:leading-[24px]">
            I am above the age of 18 years
          </p>
        </label>
        <Button
          disabled={!isChecked}
          onClick={nextStep}
          className="bg-[#000000] text-[#FFFFFF] p-3 w-full my-5 shadow-sm rounded-[8px] md:text-[20px] sm:leading-[29.26px] "
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export { Introduction };
