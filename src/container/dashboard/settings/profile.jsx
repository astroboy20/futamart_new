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
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { GoUpload } from "react-icons/go";
import { AiOutlinePicture } from "react-icons/ai";
import Image from "next/image";

const Profile = ({ setSelected }) => {
  const { data } = useFetchItems({ url: `${BASE_URL}/categories` });
  const { data: profile } = useFetchItems({ url: `${BASE_URL}/business` });
  const profileData = profile?.data;
  const categoriesData = data?.data;

  const [profileUpdate, setProfileUpdate]=useState({
    firstname: "",
    business_photo:profileData?.business_photo || null,
    business_logo:profileData?.business_logo || null,
    business_name:profileData?.businessName || "",
    business_contact: profileData?.business_contact || "",
    business_email: profileData?.business_email || "",
    business_address: profileData?.business_address || "",
    business_category: profileData?.business_category || ""
  })
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

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
          {profileData?.business_logo ? (
            <img
              src={profileData?.business_logo}
              className="w-full h-full object-cover"
              alt="business_logo"
            />
          ) : (
            <div className="flex items-center gap-1 justify-center pt-10 text-[13px]">
              <label className="flex items-center gap-1 ">
                {" "}
                <GoUpload /> Upload logo
              </label>

              <input type="file" id="" className="hidden" />
            </div>
          )}
        </div>
        <div className="w-[140px] h-[140px] rounded-full bg-[#fff] absolute bottom-[-30%] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          {photo ? (
            <img
              src={URL.createObjectURL(photo)}
              className="w-full h-full object-cover"
              alt="business_photo"
            />
          ) : (
            <div className="flex items-center gap-1 text-[13px]">
              <label className="flex items-center gap-1 " htmlFor="photo">
                <AiOutlinePicture /> Upload photo
              </label>

              <input type="file" id="photo" className="hidden" onChange={handlePhotoChange} />
            </div>
          )}
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
          <Input className="h-[50px]" value={profileData?.businessName} />
        </div>

        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Business contact
          </label>
          <Input className="h-[50px]" value={profileData?.business_contact} />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Business email
          </label>
          <Input className="h-[50px]" value={profileData?.business_email} />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">
            Business address
          </label>
          <Input className="h-[50px]" value={profileData?.business_address} />
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
