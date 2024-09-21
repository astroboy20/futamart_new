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
import { useAuth } from "@/context/AuthContext";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashboardSidebar = () => {
  const pathname = usePathname();
  // const {user} = useAuth()
  // console.log(user)
  return (
    <div className="hidden lg:w-[40%] h-[100vh] pr-5 lg:flex flex-col gap-10 overflow-hidden ">
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
            pathname === "/dashboard/products"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <ProductIcon /> Products
        </Link>
        <Link
          href={"/dashboard/chats"}
          className={`flex items-center gap-3 ${
            pathname === "/dashboard/chats"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <ChatIcon />
          Chats
        </Link>
        <Link
          href={"/dashboard/analytics"}
          className={`flex items-center gap-3 ${
            pathname === "/dashboard/analytics"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <AnalyticsIcon /> Analytics
        </Link>
        <Link
          href={"/dashboard/notifications"}
          className={`flex items-center gap-3 ${
            pathname === "/dashboard/notifications"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <NotificationIcon /> Notifications
        </Link>
        <Link
          href={"/dashboard/settings"}
          className={`flex items-center gap-3 ${
            pathname === "/dashboard/settings"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <SettingIcon /> Settings
        </Link>
        <Link
          href={"/"}
          className={`flex items-center gap-3 ${
            pathname === "/"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <LogoutIcon />
          Logout
        </Link>
      </div>

      <div className="flex gap-5 items-center">
        <Image
          src={"/images/user-image.png"}
          width={48}
          height={48}
          alt="user-image"
        />
        <div className="flex flex-col text-[16px] text-white">
          <p>La_spag</p>
          <p>La_spag2024@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export { DashboardSidebar };
