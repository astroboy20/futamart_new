"use client";
import {
  AnalyticsIcon,
  ChatIcon,
  DashboardIcon,
  Logo_White,
  LogoutIcon,
  NotificationIcon,
  ProductIcon,
  SettingIcon,
} from "@/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <main className="flex  bg-black p-5 w-full h-[100vh]">
      <div className="w-[30%] h-[100vh] pr-5 flex flex-col gap-10 overflow-hidden">
        <Logo_White />
        <div className="flex flex-col gap-7 text-[#F2F3F4] text-[20px]">
          <Link
            href={"/dashboard"}
            className={`flex items-center gap-3 ${
              pathname === "/dashboard"
                ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                : ""
            }`}
          >
            <DashboardIcon /> Dashboard
          </Link>
          <Link
            href={"/dashboard/products"}
            className={`flex items-center gap-3 ${
              pathname === "/dashboard/products" ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 " : ""
            }`}
          >
            <ProductIcon /> Products
          </Link>
          <Link
            href={"/"}
            className={`flex items-center gap-3 ${
              pathname === "/" ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 " : ""
            }`}
          >
            <ChatIcon />
            Chats
          </Link>
          <Link
            href={"/"}
            className={`flex items-center gap-3 ${
              pathname === "/" ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 " : ""
            }`}
          >
            <AnalyticsIcon /> Analytics
          </Link>
          <Link
            href={"/"}
            className={`flex items-center gap-3 ${
              pathname === "/" ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 " : ""
            }`}
          >
            <NotificationIcon /> Notifications
          </Link>
          <Link
            href={"/"}
            className={`flex items-center gap-3 ${
              pathname === "/" ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 " : ""
            }`}
          >
            <SettingIcon /> Settings
          </Link>
          <Link
            href={"/"}
            className={`flex items-center gap-3 ${
              pathname === "/" ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 " : ""
            }`}
          >
            <LogoutIcon />
            Logout
          </Link>
        </div>
      </div>
      <div className="w-[100%] ">{children}</div>
    </main>
  );
};

export default DashboardLayout;
