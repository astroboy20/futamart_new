"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";

const Forgotpassword = () => {
  const router = useRouter();
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
            // value={formData.email}
            // onChange={handleChange}
            isRequired
          />
        </formcontrol>
        <Button
          // disabled={loading}
          onClick={() => router.push("/forgot-password/otp")}
          type="submit"
          className="bg-[#1A1A1A] w-full rounded-[16px] text-[16px] text-[#fff] my-5 font-[700] py-[25px]"
        >
          {/* {loading ? "Loading..." : "Continue"} */}
          Continue
        </Button>
      </div>
    </div>
  );
};

export { Forgotpassword };
