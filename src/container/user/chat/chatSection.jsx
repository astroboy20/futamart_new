"use client";
import { SearchIcon } from "@/assets";
import { useTimestamp } from "@/hooks/useTimeStamp";
import { Input } from "@/components/ui/input";
import React, { useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const ChatSection = ({ userData, setSelectedUser,setIsChatOpen }) => {
  const token = Cookies.get("token");

  // Function to mark messages as read
  const markMessagesAsRead = useCallback(
    async (conversationId, userId) => {
      console.log("Marking messages as read for:", { conversationId, userId });
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/read/${conversationId}`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.message);
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    },
    [token] 
  );

  const handleClick = useCallback(
    (user) => {
      setSelectedUser(user);
      setIsChatOpen(true)
  
      // Optimistically update the unread message count to 0
      user.unreadMessagesCount = 0;
  
      // Mark messages as read if a conversationId is present
      if (user?.conversationId) {
        markMessagesAsRead(user.conversationId, user._id);
      }
    },
    [setSelectedUser, markMessagesAsRead]
  );
  

  return (
    <div className="flex flex-col gap-5">
      {/* Search Input */}
      <div className="w-full flex items-center shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] bg-[#f2f3f4] rounded-[4px] px-4 py-[3px]">
        <SearchIcon />
        <Input
          className="w-full rounded-[2px] h-10 border-none focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent"
          placeholder="search old chats here..."
        />
      </div>

      {/* Messaged Users List */}
      <div className="lg:bg-[#F2F3F4] lg:p-[3%] flex flex-col gap-5 rounded lg:shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] h-full lg:h-[430px] overflow-y-scroll no-scrollbar">
        {userData?.data?.length > 0 ? (
          userData.data.map((user) => (
            <div
              key={user._id}
              className="p-[3%] bg-[#F5F5F6] shadow-[2px_2px_4px_0_rgba(0,0,0,0.15)]"
            >
              <div
                className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleClick(user)}
              >
                <div className="flex flex-col gap-2">
                  <p className="text-[14px] font-[500]">
                    {user?.businessInfo?.businessName}
                  </p>
                  <p className="text-gray-600 text-[12px] font-[500] line-clamp-1">
                    {user?.lastMessage?.message}
                  </p>
                </div>
                <div>
                  {user?.unreadMessagesCount > 0 && (
                    <span className="bg-black text-white text-[10px] font-[600] rounded-full h-5 w-5 flex items-center justify-center border border-white">
                      {user.unreadMessagesCount}
                    </span>
                  )}
                  <p className="text-[#51A40A] text-[10px] font-[600]">
                    {useTimestamp({ timestamp: user?.lastMessage?.createdAt })}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
};

export { ChatSection };
