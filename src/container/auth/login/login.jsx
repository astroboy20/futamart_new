"use client";
import { GoogleIcon } from "@/assets";
import React, { useState } from "react";
import { FormWithEmail } from "./form/FormWithEmail";
import { FormWithPhone } from "./form/FormWithPhone";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";
import { useToast } from "@chakra-ui/react";
import posthog from "posthog-js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState("email");
  const { login } = useAuth();
  const toast = useToast();

  const handleGoogleLogin = () => {
    // Redirect the user to the Google login URL
    window.location.href = "https://api.futamart.com/v1/user/google";
  };
  const handleOptions = (option) => {
    setOptions(option);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();
      if (!response.ok) {
        setLoading(false);
        toast({
          title: "Error",
          description: result?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setLoading(false);
      // setError(null);
      toast({
        title: "Success",
        description: result?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      posthog.capture("login", {
        email: formData.email,
      });
      login(result.data?.token, result.data?.redirectUrl);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: "Unable to sign in. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="flex flex-col gap-10 pt-10 pb-5 px-5 lg:gap-9 lg:px-20 lg:pt-10 lg:pb-0 h-[100%]">
      <div className="flex flex-col">
        <h1 className="text-[30px] lg:text-[48px] font-[700]">Sign in</h1>
        <p className="text-[16px] lg:text-[24px] text-[#5B6178] font-[400]">
          Welcome back! Log in to Futamart
        </p>
      </div>
      <div className="flex flex-col w-full lg:w-4/5">
        <Button
          onClick={handleGoogleLogin}
          className="bg-[#F7F7F7] flex gap-[10px] items-center text-[16px] font-[600] w-full rounded-[16px] border-2 border-[#292D32BA] text-[#000] py-[25px]"
        >
          <GoogleIcon /> Continue with Google
        </Button>

        <div className="relative flex items-center my-4 mx-7">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-7 text-[#707070] text-[20px] font-[700]">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex gap-5">
            <p
              onClick={() => handleOptions("email")}
              className={
                options === "email"
                  ? "text-[#1A1A1A] border-b-2 border-[#FF0000] text-[16px] font-[700] lg:text-[20px] cursor-pointer"
                  : "text-[#8C92AB] text-[16px] font-[400] lg:text-[20px] cursor-pointer"
              }
            >
              Email
            </p>
            {/* <p
              onClick={() => handleOptions("phone")}
              className={
                options === "phone"
                  ? "text-[#1A1A1A] border-b-2 border-[#FF0000] text-[16px] font-[700] lg:text-[20px] cursor-pointer"
                  : "text-[#8C92AB] text-[16px] font-[400] lg:text-[20px] cursor-pointer"
              }
            >
              Phone Number
            </p> */}
          </div>

          {options === "email" && (
            <FormWithEmail handleChange={handleChange} formData={formData} />
          )}
          {/* {options === "phone" && (
            <FormWithPhone handleChange={handleChange} formData={formData} />
          )} */}

          <div className="flex justify-between text-[16px] font-[400]">
            <label className="flex gap-[5px] items-center">
              <input type="checkbox" />
              keep me signed in
            </label>
            <Link href={"/forgot-password"}>
              {" "}
              <p className="underline">Forgot password?</p>
            </Link>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="bg-[#1A1A1A] w-full rounded-[16px] text-[16px] text-[#fff] my-5 font-[700] py-[25px]"
          >
            {loading ? <ClipLoader color="white" /> : "Continue"}
          </Button>
        </form>

        <div className="text-[16px] font-[400]  mb-3 mt-3 ">
          <p className="text-[#8C92AB] text-center">
            Don’t have an account?
            <Link href={"/register"}>
              <span className="text-[#1a1a1a] font-[700]"> Sign up</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Login };
