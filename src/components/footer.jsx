import {
  Logo,
  Logo_Black,
  Logo_Black_Small,
  PhoneIcon,
  WhatsappIcon,
} from "@/assets";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="flex flex-col ">
      <div className="bg-[rgb(247,247,247)] flex flex-col gap-[30px] py-10 px-5 lg:flex-row justify-between  lg:px-[5%] lg:py-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5 text-[32px] font-[700] lg:text-[40px] ">
            <Logo_Black_Small /> futamart
          </div>
          <div className="flex flex-col gap-2.5 text-[16px] font-[400] lg:text-[18px] ">
            <p className="flex gap-2.5 items-center">
              <WhatsappIcon /> +234-123-123-123
            </p>
            <p className="flex gap-2.5 items-center">
              <PhoneIcon /> +234-123-123-123
            </p>
          </div>
          <div className="text-[18px] font-[500]">
            Want to get weekly updates from us?
            <br /> Sign up to our newsletter
          </div>
          <div className="flex gap-2 border border-[#4e4e4e] bg-white p-1 rounded-[2px]">
            <Input
              className="border-none bg-transparent"
              placeholder="Enter email"
            />
            <div margin={"0 3px"} width={"fit-content"}>
              <Button className="text-[16px] font-[600] py-[10px] px-[16px]">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 ">
          <h1 className="text-[18px] font-[600] lg:text-[24px] ">
            All Categories
          </h1>
          <div className="text-[16px] font-[400] lg:text-[18px]  flex flex-col gap-2.5">
            <p>Food</p>
            <p>Electronics & Gadgets</p>
            <p>Fashion & Clothing</p>
            <p>Beauty & Skincare</p>
            <p>Hair products</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 ">
          <h1 className="text-[18px] font-[600] lg:text-[24px] ">Support</h1>
          <div className="text-[16px] font-[400] lg:text-[18px]  flex flex-col gap-2.5">
            <p>Privacy Policy</p>
            <p>Terms of service</p>
            <p>Customer Ratings</p>
          </div>
        </div>
      </div>
      <div className="bg-black py-1 px-[5%]">
        <p className="text-[18px] font-[400] text-[#fff]">futamart2024.</p>
      </div>
    </footer>
  );
};

export { Footer };
