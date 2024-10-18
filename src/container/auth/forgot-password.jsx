"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/hooks/useFetchItems";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const Forgotpassword = () => {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = () => {
    if (email.trim() !== "") {
      setIsLoading(true);
      axios
        .post(`${BASE_URL}/user/forgot-password`, { email })
        .then((response) => {
          toast({
            title: "OTP Sent",
            description: response.data?.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.push("/forgot-password/otp");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Error",
            description: response.data?.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col gap-[70px] pt-10 pb-5 px-5 lg:gap-[100px] lg:px-20 lg:pt-10 lg:pb-0 h-[100%]">
      <div className="flex flex-col">
        <h1 className="text-[30px] lg:text-[48px] font-[700] leading-10 lg:leading-[58px]">
          {" "}
          Forgot <br /> password?
        </h1>
        <p className="text-[16px] lg:text-[24px] text-[#5B6178] font-[400]">
          Enter your email for the verification process, <br /> we will send
          code to your email
        </p>
      </div>

      <div>
        <formcontrol>
          <label className="text-[16px] lg:text-[18px] pb-5">
            Email address
          </label>
          <Input
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
        </formcontrol>
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          type="submit"
          className="bg-[#1A1A1A] w-full rounded-[16px] text-[16px] text-[#fff] my-5 font-[700] py-[25px]"
        >
          {isLoading ? <ClipLoader color="#fff"/> : "Continue"}
          
        </Button>
      </div>
    </div>
  );
};

export { Forgotpassword };
