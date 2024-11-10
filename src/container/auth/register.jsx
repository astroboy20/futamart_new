"use client";
import { DontShow, GoogleIcon, PasswordIcon } from "@/assets";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChecked = (e) => {
    setChecked(e.target.checked);
  };
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    // Redirect the user to the Google login URL
    window.location.href = "https://api.futamart.com/v1/user/google";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        setLoading(false);
        toast({
          title: "An error occurred.",
          description:
            result?.message || "Unable to sign in. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setLoading(false);
      toast({
        title: "Success",
        description: result?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      login(result.data);
    } catch (error) {
      console.log(error?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 pt-10 pb-5 px-5 lg:gap-9 lg:px-20 lg:pt-10 lg:pb-0">
      <div className="flex flex-col">
        <h1 className="text-[30px] lg:text-[48px] font-[700]">Sign up</h1>

        <p className="text-[16px] lg:text-[24px] text-[#5B6178] font-[400]">
          Welcome! Sign up to Futamart
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

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 my-4">
            <formcontrol>
              <label className="text-[16px] lg:text-[18px] pb-5">
                First name
              </label>
              <Input
                size={"lg"}
                width={"100%"}
                box-shadow={"0px 0px 0px 1px #CDD1DC"}
                placeholder=""
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </formcontrol>
            <formcontrol>
              <label className="text-[16px] lg:text-[18px] pb-5">
                Middle name
              </label>
              <Input
                size={"lg"}
                width={"100%"}
                box-shadow={"0px 0px 0px 1px #CDD1DC"}
                placeholder=""
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
              />
            </formcontrol>
            <formcontrol>
              <label className="text-[16px] lg:text-[18px] pb-5">
                Last name
              </label>
              <Input
                size={"lg"}
                width={"100%"}
                box-shadow={"0px 0px 0px 1px #CDD1DC"}
                placeholder=""
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </formcontrol>
            <formcontrol>
              <label className="text-[16px] lg:text-[18px] pb-5">
                Email address
              </label>
              <Input
                size={"lg"}
                width={"100%"}
                box-shadow={"0px 0px 0px 1px #CDD1DC"}
                placeholder=""
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </formcontrol>
            <formcontrol>
              <label className="text-[16px] lg:text-[18px] pb-5">
                Password
              </label>
              <div className="flex gap-2 items-center w-full border  shadow-[0px_0px_0px_1_rgba(205,209,220,1)] rounded px-3 ">
                <Input
                  placeholder=""
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="border-none px-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
                <div>
                  <span
                    className="bg-inherit"
                    onClick={togglePasswordVisibility}
                  >
                    {!showPassword ? <DontShow /> : <PasswordIcon />}
                  </span>
                </div>
              </div>
            </formcontrol>
            <formcontrol>
              <label className="text-[16px] lg:text-[18px] pb-5">
                Confirm password
              </label>
              <div className="flex gap-2 items-center w-full border  shadow-[0px_0px_0px_1_rgba(205,209,220,1)] rounded px-3 ">
                <Input
                  placeholder=""
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-none px-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                />
                <div>
                  <span
                    className="bg-inherit"
                    onClick={togglePasswordVisibility}
                  >
                    {!showPassword ? <DontShow /> : <PasswordIcon />}
                  </span>
                </div>
              </div>
            </formcontrol>
          </div>
          <div className="flex justify-center  text-[16px] font-[400]">
            <label className="flex gap-[5px] items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChecked}
              />
              I agree to the{" "}
              <span className="text-[#F18341]">Terms of Service</span> and
              <span className="text-[#F18341]">Policy</span>
            </label>
          </div>

          <Button
            disabled={!checked}
            className="bg-[#1A1A1A] w-full rounded-[16px] text-[16px] text-[#fff] my-5 font-[700] py-[25px]"
            type="submit"
          >
            {loading ? <ClipLoader color="white" /> : "Continue"}
          </Button>
        </form>

        <div className="text-[16px] font-[400]  lg:relative mt-[25px] mb-3  ">
          <p className="text-[#8C92AB] text-center">
            Have an account?
            <Link href={"/login"}>
              <span className="text-[#1a1a1a] font-[700]"> Sign in</span>{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Register };
