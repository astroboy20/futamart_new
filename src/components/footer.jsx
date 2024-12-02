"use client";
import { Logo_Black_Small, PhoneIcon, WhatsappIcon } from "@/assets";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import { BASE_URL } from "@/hooks/useFetchItems";
import { useToast } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

const Footer = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() !== "" && emailPattern.test(email)) {
      setIsLoading(true);
      axios
        .post(`${BASE_URL}/newsletter`, { email })
        .then((response) => {
          setIsLoading(false);
          toast({
            title: "Subscription Successful!",
            description: response.data?.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setEmail("");
        })
        .catch((error) => {
          setIsLoading(false);
          toast({
            title: "Subscription Failed",
            description:
              "There was an issue subscribing you to our newsletter. Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setEmail("");
        });
    }
  };
  return (
    <footer className="flex flex-col ">
      <div className="bg-[rgb(247,247,247)] flex flex-col gap-[30px] py-10 px-5 lg:flex-row justify-between  lg:px-[5%] lg:py-6">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2.5 text-[24px] font-[700] lg:text-[40px] ">
            <Logo_Black_Small /> futamart
          </div>
          <div className="flex flex-col gap-2.5 text-[14px] font-[400] lg:text-[18px] ">
            <p className="flex items-center gap-2.5">
              <a
                href="https://wa.me/+2347054289365"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5"
              >
                <WhatsappIcon />
                <span>+234-705-428-9365</span>
              </a>
            </p>

            <p className="flex gap-2.5 items-center">
              <PhoneIcon /> +234-705-428-9365
            </p>
          </div>
          <div className="text-[16px] font-[500]">
            Want to get weekly updates from us?
            <br /> Sign up to our newsletter
          </div>
          <div className="flex gap-2 border border-[#4e4e4e] bg-white p-1 rounded-[2px]">
            <Input
              className="border-none bg-transparent outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div margin={"0 3px"} width={"fit-content"}>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="text-[14px] font-[600] py-[10px] px-[16px] outline-none"
              >
                {isLoading ? <ClipLoader color="#fff" /> : "Subscribe"}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 ">
          <h1 className="text-[16px] font-[600] lg:text-[24px] ">
            All Categories
          </h1>
          <div className="text-[14px] font-[400] lg:text-[18px] flex flex-col gap-2.5">
            <Link href="/food">
              <p>Food</p>
            </Link>
            <Link href="/electronic-and-gadgets">
              <p>Electronics & Gadgets</p>
            </Link>
            <Link href="/fashion-and-clothing">
              <p>Fashion & Clothing</p>
            </Link>
            <Link href="/beauty-and-skincare">
              <p>Beauty & Skincare</p>
            </Link>
            <Link href="/hair-products">
              <p>Hair products</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 ">
          <h1 className="text-[16px] font-[600] lg:text-[24px] ">Support</h1>
          <div className="text-[14px] font-[400] lg:text-[18px]  flex flex-col gap-2.5">
            <Link href={"/privacy-policy"}>Privacy Policy</Link>
            <Link href={"/terms-of-service"}>Terms of service</Link>
            <p>Customer Ratings</p>
          </div>
        </div>
      </div>
      <div className="bg-black py-1 px-[5%]">
        <p className="text-[16px] font-[400] text-[#fff]">futamart2024.</p>
      </div>
    </footer>
  );
};

export { Footer };
