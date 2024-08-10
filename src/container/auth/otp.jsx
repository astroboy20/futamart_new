"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const OTP = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    //move to the next input field
    if (value !== "" && index < otpValues.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Move focus back to the previous input field if value is deleted
    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").split("");
    if (pasteData.length !== otpValues.length) return;

    const newOtpValues = [...otpValues];
    pasteData.forEach((char, index) => {
      if (index < otpValues.length) {
        newOtpValues[index] = char;
      }
    });
    setOtpValues(newOtpValues);
    document.getElementById(`otp-input-${otpValues.length - 1}`).focus();
  };

  const handleSubmit = () => {
    console.log(otpValues);
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="w-[90%] lg:w-[495px] h-fit p-[6%] flex flex-col gap-10 shadow-[0px_15px_15px_0px_rgba(0,0,0,0.15)] border border-[#E3E3E3]">
        <div className="w-full border-3 lg:pl-8 lg:pr-8">
          <p className="text-[18px] lg:text-[20px] font-[700] ">
            Enter 4 digit code
          </p>
          <p className="text-[14px] lg:text-[16px] font-[600]">
            A four-digit code should have come to your email address that you
            indicated.
          </p>
        </div>
        <div className="grid grid-cols-4  gap-10 lg:gap-20 text-center">
          {otpValues.map((value, index) => (
            <Input
              id={`otp-input-${index}`}
              value={value}
              key={index}
              className="lg:w-[120%] w-[50px] h-[50px] text-center bg-[#F5F5F5] border border-[#E3E3E3] input"
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onPaste={handlePaste}
              maxLength={1}
            />
          ))}
        </div>
        <div className="flex gap-10 items-center lg:pl-8 lg:pr-8">
          <Button
            onClick={handleSubmit}
            className="text-[16px] lg:text-[20px] font-[600] w-[150px] rounded-[8px]"
          >
            Confirm
          </Button>
          <Button className="text-[16px] lg:text-[20px] font-[600] w-[150px] rounded-[8px] border-2 border-[#000] bg-transparent text-black">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { OTP };
