import { Logo, Logo_Black } from "@/assets";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex w-full h-screen">
      <div className="hidden lg:flex flex-col fixed w-2/5 bg-[#ECEBEB] h-full justify-center items-center">
        <Logo_Black />
        <h1 className="text-[48px] text-[#000000CC] font-[700]">futamart</h1>
      </div>
      <div className="w-full lg:ml-[40%] h-full overflow-auto">{children}</div>
    </main>
  );
};

export default AuthLayout;
