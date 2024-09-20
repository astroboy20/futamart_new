import { UploadIcon_one, UploadIcon_two } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GoUpload } from "react-icons/go";
import { AiOutlinePicture } from "react-icons/ai";

const Profile = ({ setSelected }) => {
  const { data } = useFetchItems({ url: `${BASE_URL}/categories` });
  const categoriesData = data?.data;
  return (
    <div>
      <div className="flex lg:hidden items-center gap-3 text-[18px] font-[600] mb-5">
        <button className="flex " onClick={() => setSelected(null)}>
          <IoIosArrowBack />
        </button>
        Profile
      </div>

      <div className="relative w-full">
        <div className="w-auto h-[180px] rounded bg-[#F2F3F4] ">
          {" "}
          <div className="flex items-center gap-1 justify-center pt-10 text-[13px]">
            <GoUpload /> Upload logo
          </div>{" "}
        </div>
        <div className="w-[140px] h-[140px] rounded-full bg-[#fff] absolute bottom-[-30%] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className="flex items-center gap-1 text-[13px]">
            <AiOutlinePicture /> Upload photo
          </div>
        </div>
      </div>

      <form className="mt-12 flex flex-col gap-5">
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Full name
          </label>
          <Input className="h-[50px]" />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            {" "}
            Business name
          </label>
          <Input className="h-[50px]" />
        </div>

        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Business contact
          </label>
          <Input className="h-[50px]" />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Business email
          </label>
          <Input />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Business address
          </label>
          <Input className="h-[50px]" />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Business category
          </label>
          {/* onValueChange={handleSelectChange}  */}
          <Select name="category">
            <SelectTrigger className="w-full h-[50px] z-50 relative">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="z-[10000]" portal>
              {categoriesData?.map((data) => (
                <SelectItem value={data._id} key={data._id}>
                  {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto">
          <Button
            // onClick={handleSubmit}
            className="rounded-[4px] w-fit h-[50px]"
          >
            {/* {isLoading ? <ClipLoader color="white" /> : "Upload Products"} */}
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export { Profile };
