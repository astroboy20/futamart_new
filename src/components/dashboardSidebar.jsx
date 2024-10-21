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
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { Skeleton } from "./ui/skeleton";
import { FaShoppingCart } from "react-icons/fa";
const DashboardSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: business, isLoading } = useFetchItems({
    url: `${BASE_URL}/business`,
  });
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <div className="hidden lg:w-[40%] h-full pr-5 lg:flex flex-col gap-10 overflow-hidden ">
      <Logo_White />
      <div className="flex flex-col gap-7 text-[#F2F3F4] text-[20px]  h-full">
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
        {/* <Link
          href={"/dashboard/analytics"}
          className={`flex items-center gap-3 ${
            pathname === "/dashboard/analytics"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <AnalyticsIcon /> Analytics
        </Link> */}
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
          href={"/dashboard/subscriptions"}
          className={`flex items-center gap-3 ${
            pathname === "/dashboard/subscriptions"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <AnalyticsIcon /> Subscriptions
        </Link>
        <Link
          href={"/"}
          className={`flex items-center gap-3 ${
            pathname === "/"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
              : ""
          }`}
        >
          <FaShoppingCart /> Marketplace
        </Link>
        <p
          onClick={handleLogout}
          className={`flex items-center gap-3 ${
            pathname === "/"
              ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 cursor-pointer"
              : ""
          }`}
        >
          <LogoutIcon />
          Logout
        </p>
        <div className="mt-auto flex gap-5 items-center">
          <div>
            {isLoading ? (
              <Skeleton className="w-12 h-12 rounded-full" />
            ) : (
              <Image
                src={business?.data?.business_logo}
                width={48}
                height={48}
                alt="user-image"
                className="rounded-full"
              />
            )}
          </div>

          <div className="flex flex-col text-[16px] text-white">
            {isLoading ? (
              <>
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-48 h-4" />
              </>
            ) : (
              <>
                <p>{business?.data?.businessName}</p>
                <p>{business?.data?.business_email}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardSidebar };
