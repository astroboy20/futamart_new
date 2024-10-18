"use client";
import {
  CancelIcon,
  DashboardIcon,
  Hamburger_Left,
  Logo_Right,
} from "@/assets";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { HiArchiveBox } from "react-icons/hi2";
import { MdAnalytics } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { IoChatbubbles, IoSettingsSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import Image from "next/image";

const DashboardHeader = () => {
  const pathname = usePathname();
  const { data: business } = useFetchItems({ url: `${BASE_URL}/business` });


  const splitedPathname = pathname.split("/")[2];
  const headerName = splitedPathname
    ? splitedPathname[0].toUpperCase() + splitedPathname.slice(1)
    : "Dashboard";
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      {show ? (
        <motion.main
          className="lg:hidden bg-black fixed top-0 w-4/5 left-0 h-full z-50 flex flex-col gap-5 py-8 px-5"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            duration: 1.0,
            delay: 0.2,
          }}
        >
          <span onClick={handleShow}>
            <CancelIcon />
          </span>

          <div className="flex flex-col gap-10 text-[#F2F3F4] text-[20px] h-full">
            <Link
              href={"/dashboard"}
              className={`flex items-center gap-3 ${
                pathname === "/dashboard"
                  ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                  : ""
              }`}
              onClick={handleShow}
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
              onClick={handleShow}
            >
              <HiArchiveBox size={"30px"} /> Products
            </Link>
            <Link
              href={"/dashboard/chats"}
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/chats"
                  ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                  : ""
              }`}
              onClick={handleShow}
            >
              <IoChatbubbles size={"30px"} />
              Chats
            </Link>
            {/* <Link
              href={"/dashboard/analytics"}
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/analytics"
                  ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                  : ""
              }`}
              onClick={handleShow}
            >
              <MdAnalytics size={"30px"} /> Analytics
            </Link> */}
            <Link
              href={"/dashboard/notifications"}
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/notifications"
                  ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                  : ""
              }`}
              onClick={handleShow}
            >
              <IoMdNotifications size={"30px"} /> Notifications
            </Link>
            <Link
              href={"/dashboard/settings"}
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/settings"
                  ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                  : ""
              }`}
              onClick={handleShow}
            >
              <IoSettingsSharp size={"30px"} /> Settings
            </Link>
            <Link
              href={"/dashboard/subscriptions"}
              className={`flex items-center gap-3 ${
                pathname === "/dashboard/subscriptions"
                  ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                  : ""
              }`}
              onClick={handleShow}
            >
              <MdAnalytics size={"30px"} /> Subscriptions
            </Link>
            <Link
              href={"/"}
              className={`flex items-center gap-3 ${
                pathname === "/"
                  ? "bg-[#FFFFFF33] border rounded-[8px] py-2 px-5 "
                  : ""
              }`}
              onClick={handleShow}
            >
              <RiLogoutCircleLine size={"30px"} />
              Logout
            </Link>
            <div className="mt-auto flex gap-5 items-center">
              <div>
                <Image
                  src={business?.data?.business_logo}
                  width={48}
                  height={48}
                  alt="user-image"
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col text-[16px] text-white">
                <p>{business?.data?.businessName}</p>
                <p>{business?.data?.business_email}</p>
              </div>
            </div>
          </div>
        </motion.main>
      ) : (
        <header className="lg:hidden flex justify-between bg-black fixed w-full left-0 top-0 p-5 rounded-b-[24px] z-50">
          <span onClick={handleShow}>
            <Hamburger_Left />
          </span>

          <h1 className="text-[24px] font-[600] text-[#FFF8F8]">
            {headerName}
          </h1>
          <Logo_Right />
        </header>
      )}
    </>
  );
};

export { DashboardHeader };
