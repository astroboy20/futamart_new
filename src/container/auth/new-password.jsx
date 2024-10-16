"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/hooks/useFetchItems";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const NewPassword = () => {
  const new_token = Cookies.get("new-token");
  const toast = useToast();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (password.trim() !== "") {
      setIsLoading(true);
      axios
        .post(
          `${BASE_URL}/user/set-new-password`,
          { password },
          { headers: { Authorization: `Bearer ${new_token}` } }
        )
        .then((response) => {
          toast({
            title: "Password Reset",
            description: "Your password has been successfully updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.push("/login");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Error",
            description: "Failed to reset password. Please try again.",
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
          Reset <br /> your password
        </h1>
        <p className="text-[16px] lg:text-[24px] text-[#5B6178] font-[400]">
          Enter a new password below. Make sure your <br /> new password is
          strong and secure.
        </p>
      </div>

      <div>
        <formcontrol>
          <label className="text-[16px] lg:text-[18px] pb-5">
            New Password
          </label>
          <Input
            size={"lg"}
            width={"100%"}
            placeholder="Enter your new password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
        </formcontrol>

        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          type="submit"
          className="bg-[#1A1A1A] w-full rounded-[16px] text-[16px] text-[#fff] my-5 font-[700] py-[25px]"
        >
          {isLoading ? <ClipLoader color="#fff" /> : "Reset Password"}
        </Button>
      </div>
    </div>
  );
};

export { NewPassword };
