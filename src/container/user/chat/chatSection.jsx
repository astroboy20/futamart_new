"use client";
import { SearchIcon } from "@/assets";
import { useTimestamp } from "@/hooks/useTimeStamp";
import { Input } from "@/components/ui/input";
import React, { useState, useCallback } from "react";

const ChatSection = ({ userData, setSelectedUser }) => {
  
  const handleClick = useCallback((user) => {
    setSelectedUser(user);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="w-full lg:w-full flex items-center shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] bg-[#f2f3f4] rounded-[4px] px-4 py-[3px]">
          <div>
            <SearchIcon />
          </div>
          <Input
            className="w-full rounded-[2px] h-10 border-none focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent"
            placeholder="search old chats here..."
          />
        </div>

        <div className="lg:bg-[#F2F3F4] lg:p-[3%] flex flex-col gap-5 rounded lg:shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] h-full lg:h-[430px] overflow-y-scroll no-scrollbar">
          {userData?.data?.map((user) => (
            <div
              key={user._id}
              className="p-[3%] bg-[#F5F5F6] shadow-[2px_2px_4px_0_rgba(0,0,0,0.15)] "
            >
              <div
                className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleClick(user)}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-[500]">
                    {user?.userInfo?.firstname} {user?.userInfo?.lastname}
                  </p>
                  <p className="text-gray-600 text-[12px] font-[500] line-clamp-1">
                    {user?.lastMessage?.message}
                  </p>
                </div>

                <p className="text-[#51A40A] text-[10px] font-[600]">
                  {useTimestamp({
                    timestamp: user?.lastMessage?.createdAt,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { ChatSection };
