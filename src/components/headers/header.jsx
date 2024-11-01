"use client";

import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import Cookies from "js-cookie";

import {
  CartIcon,
  Hamburger,
  Logo,
  Logo_X,
  PersonIcon,
  SearchIcon,
  SmallLogo,
} from "@/assets";
import { Input } from "../ui/input";
import { MobileNavbar } from "../mobileNavbar";

const Header = () => {
  const [show, setShow] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname(); // Get the current path
  const { data: userData } = useFetchItems({
    url: `${BASE_URL}/user`,
  });

  const role = userData?.data?.role?.name;

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  const handlePersonIconClick = (e) => {
    e.stopPropagation();
    setDropdownVisible((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    if (!dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

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
          <div className="flex lg:hidden" onClick={handleShow}>
            <Hamburger />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-1/6">
        <Link href="/">
          <div className="flex items-center gap-2.5">
            <Logo_X /> <Logo />
          </div>
        </Link>
      </div>

      {/* Conditionally render the search bar based on the pathname */}
      {(pathname !== "/user/chat" && !pathname.startsWith("/user/chat/")) && (
        <div className="flex items-center flex-grow lg:justify-center w-full lg:w-4/6 gap-5 lg:px-10">
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
      )}

      <div
        className="hidden lg:flex gap-[10px] cursor-pointer items-center relative lg:w-1/6 justify-center"
        onClick={handlePersonIconClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={dropdownRef}
      >
        {userData?.data?.profile_image ? (
          <img
            src={userData.data.profile_image}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <PersonIcon />
        )}
        <Link href="/cart">
          <CartIcon />
        </Link>
        {dropdownVisible && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            {!isAuthenticated ? (
              <div className="py-2">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="py-2">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/user/chat"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Chats
                </Link>
                <Link
                  href="/favourite"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Favourite products
                </Link>
                <Link
                  href="/cart"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cart
                </Link>
                <Link
                  href="/cart"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                {userData && (
                  <Link
                    href={role === "seller" ? "/dashboard" : "/seller"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {role === "seller" ? "Go to Dashboard" : "Become a Seller"}
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {show && <MobileNavbar handleShow={handleShow} />}
    </header>
  );
};

export { Header };
