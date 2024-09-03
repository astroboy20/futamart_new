"use client";
import { GalleryIcon, NotificationIconX } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddProducts = () => {
  const toast = useToast();
  const [featuredImage, setFeaturedImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const handleFeaturedChange = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(URL.createObjectURL(file));
  };

  const handleAdditionalImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (additionalImages.length + files?.length > 5) {
      toast({
        title: "Limit Reached",
        description: "You can only add up to 5 images.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setAdditionalImages((prevImages) => [...prevImages, ...newImages]);
  };

  return (
    <main className="p-3 lg:p-5 w-full mt-10">
      <div className="flex justify-between items-center lg:items-start">
        <h1 className="underline text-[24px] font-[600]">Add Products</h1>

        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Button className="hidden lg:block">Add products</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div className="h-fit text-black rounded-[16px] flex flex-col gap-10">
          <p className="text-[16px] font-[600]">Upload Product Image</p>
          <div className="w-auto h-[320px] border border-black border-dashed rounded-[8px] flex justify-center items-center">
            {featuredImage ? (
              <img
                src={featuredImage}
                className="w-full h-full object-cover"
                alt="Featured"
              />
            ) : (
              <>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleFeaturedChange}
                  id="upload"
                />
                <label
                  htmlFor="upload"
                  className="flex flex-col gap-5 cursor-pointer"
                >
                  <span className="m-auto">
                    <GalleryIcon />
                  </span>
                  <p className="font-[600]">
                    Drop files here or{" "}
                    <span className="underline">browse files</span>
                  </p>
                </label>
              </>
            )}
          </div>

          {/* Additional Images Section */}
          <div className="h-fit text-black rounded-[16px] flex flex-col gap-10">
            <p className="text-[16px] font-[600]">Upload Additional Images</p>
            <div className="grid grid-cols-3 gap-2">
              {additionalImages.map((imgSrc, index) => (
                <div key={index} className="relative">
                  <img
                    src={imgSrc}
                    className="w-full h-[100px] object-cover"
                    alt={`Additional ${index + 1}`}
                  />
                </div>
              ))}
              {/* Plus icon for adding more images */}
              <div className="flex justify-center items-center border border-dashed border-black h-[100px] cursor-pointer">
                <input
                  className="hidden"
                  type="file"
                  multiple
                  onChange={handleAdditionalImageChange}
                  id="uploadAdditional"
                />
                <label
                  htmlFor="uploadAdditional"
                  className="flex justify-center items-center w-full h-full"
                >
                  <FaPlus className="text-[24px] text-gray-500" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Product Name</label>
            <Input className="h-[55px]" placeholder="Dr Martens Loafers" />
          </div>
          <div className="z-50 flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Category</label>
            <Select>
              <SelectTrigger className="w-full h-[55px] z-50 relative">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="z-[10000]" portal>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="electronics">
                  Electronics & Gadgets
                </SelectItem>
                <SelectItem value="fashion">Fashion & Clothing</SelectItem>
                <SelectItem value="beauty">Beauty & Skincare</SelectItem>
                <SelectItem value="hair">Hair Products</SelectItem>
                <SelectItem value="footwears">Footwears</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Product Size</label>
            <Input className="h-[55px]" placeholder="35-45" />
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Attribute</label>
            <div className="flex gap-2 items center ">
              <Input className="h-[55px]" placeholder="35-45" />{" "}
              <Button className="h-[55px]">Add</Button>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">
              Product Description
            </label>
            <Textarea placeholder="Add your product description here" />
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Price</label>
            <Input className="h-[55px]" placeholder="#5,500" />
          </div>
          <div className="lg:ml-auto">
            <Button className="rounded-[4px] w-full lg:w-fit h-[55px]">
              Upload Products
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export { AddProducts };
