"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import { useFetchItems } from "@/hooks/useFetchItems";
import { NotificationIconX } from "@/assets";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTimestamp } from "@/hooks/useTimeStamp";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IoIosArrowBack } from "react-icons/io";
import { useWebsocket } from "@/hooks/useWebsocket";

const Chats = () => {
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const token = Cookies.get("token");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);

  const { data: userData } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/chats`,
  });

  const { data: user } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  });

  const { data: messages } = useFetchItems({
    url: selectedUser
      ? `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser?._id}`
      : null,
    enabled: !!selectedUser,
  });

  const { socket, error, connected, onlineUsers } = useWebsocket(
    `ws://futamart-backend.onrender.com/?userId=${selectedUser?._id}`
  );
  


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser._id}`,
          { message },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("Something went wrong!");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([
        `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser._id}`,
      ]);
      queryClient.invalidateQueries([
        `${process.env.NEXT_PUBLIC_API_URL}/chats`,
      ]);
      setMessage("");
    },
  });

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setSending(true);
    try {
      await sendMessageMutation.mutateAsync();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-semibold underline">Chat</h1>
        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Link href="/dashboard/products">
            <Button className="hidden lg:block">View products</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between w-full h-full">
        {(!selectedUser || isDesktop) && (
          <div className="w-full lg:w-[30%]">
            <div className="flex justify-between items-center text-[18px] font-medium">
              <p>
                All Chats
                <span className="text-[#51A40A]">
                  {" "}
                  ({userData?.data?.length})
                </span>
              </p>
              <p className="hidden lg:flex">Oldest</p>
            </div>

            <div>
              {userData?.data?.map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center py-4 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => handleClick(user)}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] font-[500]">
                      {user?.userInfo?.firstname} {user?.userInfo?.lastname}
                    </p>
                    <p className="text-gray-600 text-[12px] font-[500]">
                      {user?.lastMessage?.message}
                    </p>
                  </div>

                  <p className="text-[#51A40A] text-[10px] font-[600]">
                    {useTimestamp({ timestamp: user?.lastMessage?.createdAt })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedUser && (
          <div
            className={`w-full lg:w-[60%] flex flex-col ${
              !isDesktop ? "h-[85dvh]" : "h-[400px]"
            }  bg-[url('/images/products/chat-bg.png')] bg-cover bg-no-repeat rounded-lg shadow-lg `}
          >
            <div className="bg-white p-4 m-2 shadow-md sticky top-0 z-10 rounded-t-lg flex justify-between items-center">
              <h2 className="text-[14px] font-[500] flex gap-2 items-center">
                {!isDesktop && (
                  <button onClick={() => setSelectedUser(null)}>
                    <IoIosArrowBack />
                  </button>
                )}
                {selectedUser?.userInfo?.firstname}{" "}
                {selectedUser?.userInfo?.lastname}
              </h2>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              <div className="flex flex-col gap-4">
                {messages?.data?.conversation?.messages?.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg?.senderId === user?.data?._id ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    <div className="flex flex-col max-w-full">
                      <div
                        className={`p-3 text-[12px] rounded-lg max-w-full ${
                          msg.senderId === user?.data?._id
                            ? "bg-black text-white ml-auto"
                            : "bg-white text-black mr-auto shadow-md border border-gray-200"
                        }`}
                      >
                        <p>{msg.message}</p>
                      </div>
                      <span className="text-[10px] font-[500] mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input Section */}
            <div className="bg-white p-3 shadow-md flex items-center gap-3  z-10">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-black"
                disabled={sending}
              />
              <button onClick={handleSendMessage} disabled={sending}>
                <FiSend size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Chats };
