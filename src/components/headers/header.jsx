"use client";

import React from "react";
import Link from "next/link";
import {
  CartIcon,
  FavouriteIcon,
  Hamburger,
  Logo,
  Logo_X,
  PersonIcon,
  ProfileIcon,
  SearchIcon,
  SmallLogo,
} from "@/assets";
import { Input } from "../ui/input";

const Header = () => {
  return (
    <header className="flex flex-col lg:flex-row gap-[20px] lg:items-center w-full py-8 px-[6%] lg:justify-between lg:py-[3%] lg:px-[6%]">
      <div className="flex items-center justify-between lg:hidden">
        <Link href="/">
          <SmallLogo />
        </Link>
        <div className="flex gap-[12px] items-center">
          <Link href="/cart">
            <CartIcon />
          </Link>
          <div className="flex lg:hidden">
            <Hamburger />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex">
        <Link href="/">
          <div className="flex items-center gap-2.5">
            <Logo_X /> <Logo />
          </div>
        </Link>
      </div>
      <div className="flex items-center flex-grow lg:justify-center w-full gap-5">
        <div className="w-full lg:w-full flex items-center shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] bg-[#f2f3f4] rounded-[2px] px-4 py-1">
          <div>
            <SearchIcon />
          </div>
          <Input
            className="w-full rounded-[2px] h-10 border-none focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent"
            placeholder="search items here..."
          />
        </div>
      </div>
      <div className="hidden lg:flex gap-[10px] items-center">
        <PersonIcon />
        <Link href="/cart">
          <CartIcon />
        </Link>
      </div>
    </header>
  );
};

export { Header };
