"use client";
import { Button } from "@/components/ui/button";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

const FileUpload = ({ nextStep }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
      setIsChecked(e.target.checked);
    };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="py-4 text-[24px] leading-[29.26px] text-center font-bold lg:leading-[39.01px] lg:text-[32px]">
          Upload a proof of your identity
        </p>
        <Select
          size={"lg"}
          width={"100%"}
          box-shadow={"0px 0px 0px 1px #CDD1DC"}
          placeholder="Select a document"
          name="document"
        >
          <option value="nin">NIN</option>
          <option value="voters card">Voter`s card</option>
          <option value="drivers license">Driver`s license</option>
        </Select>
      </div>
      <div className="p-3 flex-col justify-center items-center gap-5 flex lg:flex-row">
        <div className="flex flex-col gap-3 bg-[#F2F3F4] border-[2px] border-dotted rounded-[28px] p-4 items-center text-center border-[#000000] w-[238px] h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="29px"
            fill="#000000"
          >
            <path d="M261.7-140.78q-98.95 0-169.09-68.09-70.13-68.09-70.13-166.43 0-83.66 47.85-150.03 47.84-66.37 127.8-84.5 28.39-94.26 106.22-151.82 77.82-57.57 175.65-57.57 119.83 0 205 82.07 85.17 82.06 91.39 201.32 70.7 14.22 115.92 69.68 45.21 55.45 45.21 127.85 0 82.3-58.43 139.91-58.44 57.61-140.79 57.61H541.48q-43.73 0-74.86-31.14-31.14-31.14-31.14-74.86V-418.3l-67.96 67.08-62.22-61.65L480-588.13l174.7 175.26-62.22 61.65-67.96-67.08v171.52H738.3q38.61 0 65.92-27.31 27.3-27.3 27.3-65.91t-27.3-65.91q-27.31-27.31-65.92-27.31h-66.78v-88.48q0-79.48-56.02-135.5-56.02-56.02-135.5-56.02-80.74 0-136.13 59.07-55.39 59.06-55.39 140.93H261.7q-55.19 0-94.21 39.01-39.01 39.01-39.01 94.2 0 55.18 39.01 94.21 39.02 39.02 94.21 39.02h93.78v106H261.7ZM480-427Z" />
          </svg>
          <p className="text-[12px] leading-[14.63px] font-semibold lg:text-[15px] lg:leading-[18.29px]">
            Front side of your document
          </p>
          <p className="text-[8px] leading-[9.75px] lg:text-[10px] lg:leading-[12.19px]">
            Upload the front page of your document support JPG, PNG, PDF
          </p>
          <input className="hidden" type="file" name="" id="file" />
          <label
            className="border cursor-pointer text-[8.75px] leading-[10.36px] lg:text-[11px] lg:leading-[13.41px] border-[#000000] rounded-full p-2"
            htmlFor="file"
          >
            Choose a file
          </label>
        </div>
        <div className="flex flex-col gap-3 bg-[#F2F3F4] border-[2px] border-dotted rounded-[28px] p-4 items-center text-center border-[#000000] w-[238px] h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="29px"
            fill="#000000"
          >
            <path d="M261.7-140.78q-98.95 0-169.09-68.09-70.13-68.09-70.13-166.43 0-83.66 47.85-150.03 47.84-66.37 127.8-84.5 28.39-94.26 106.22-151.82 77.82-57.57 175.65-57.57 119.83 0 205 82.07 85.17 82.06 91.39 201.32 70.7 14.22 115.92 69.68 45.21 55.45 45.21 127.85 0 82.3-58.43 139.91-58.44 57.61-140.79 57.61H541.48q-43.73 0-74.86-31.14-31.14-31.14-31.14-74.86V-418.3l-67.96 67.08-62.22-61.65L480-588.13l174.7 175.26-62.22 61.65-67.96-67.08v171.52H738.3q38.61 0 65.92-27.31 27.3-27.3 27.3-65.91t-27.3-65.91q-27.31-27.31-65.92-27.31h-66.78v-88.48q0-79.48-56.02-135.5-56.02-56.02-135.5-56.02-80.74 0-136.13 59.07-55.39 59.06-55.39 140.93H261.7q-55.19 0-94.21 39.01-39.01 39.01-39.01 94.2 0 55.18 39.01 94.21 39.02 39.02 94.21 39.02h93.78v106H261.7ZM480-427Z" />
          </svg>
          <p className="text-[12px] leading-[14.63px] font-semibold lg:text-[15px] lg:leading-[18.29px]">
            Back side of your document
          </p>
          <p className="text-[8px] leading-[9.75px] lg:text-[10px] lg:leading-[12.19px]">
            Upload the front page of your document support JPG, PNG, PDF
          </p>
          <input className="hidden" type="file" name="" id="file" />
          <label
            className="border cursor-pointer text-[8.75px] leading-[10.36px] lg:text-[11px] lg:leading-[13.41px] border-[#000000] rounded-full p-2"
            htmlFor="file"
          >
            Choose a file
          </label>
        </div>
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name=""
          id=""
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p className="text-[9px] leading-[10.97px] font-medium lg:text-[13px] lg:leading-[15.85px]">
          I confirmed that I uploaded valid government-Issued ID. This ID
          includes my picture, signature, name, date of birth and address
        </p>
      </label>
      <Button
        disabled={!isChecked}
        onClick={nextStep}
        className="text-[15px] leading-[18.29px] w-full bg-[#000000] text-[#FFFFFF] p-3 rounded-md lg:text-[24px] lg:leading-[29.26px] h-[50px]"
      >
        Register business
      </Button>
    </div>
  );
};

export { FileUpload };
