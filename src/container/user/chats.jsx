import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import Cookies from "js-cookie";
import { useFetchItems } from "@/hooks/useFetchItems";
import { NotificationIconX } from "@/assets";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Chats = ({ id }) => {
  const { data: messages, mutate: updateMessages } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`,
  });
  const { data: userData } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/chats`,
  });
  const { data: user } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  });

  const token = Cookies.get("token");
  const [isChat, setIsChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Assuming userData returns an object with a property '_id' as the current user ID
  const currentUserId = user?.data?._id;

  const handleClick = (user) => {
    setSelectedUser(user);
    setIsChat(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setSending(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`,
        { message: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("");
        updateMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 p-[6%]">
      <div className="flex justify-between items-center">
        <h1 className="text-[24px] font-[600] underline">Chat</h1>
        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Link href="/dashboard/products">
            <Button className="hidden lg:block">View products</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between w-full">
        {/* Chat List Section */}
        <div className="w-full lg:w-[30%]">
          <div className="flex justify-between items-center text-[18px] font-[500]">
            <p>All Chats ({userData?.data?.length})</p>
            <p className="hidden lg:flex">Oldest</p>
          </div>

          <div>
            {userData?.data?.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center py-4 border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleClick(user?.userInfo?.firstname)}
              >
                <p>{user?.userInfo?.firstname}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window Section */}
        {isChat && (
          <div className="w-full lg:w-[60%] h-[500px] p-4 rounded-lg flex flex-col justify-between">
            {/* Chat Header */}
            <div className="bg-white p-4 rounded-t-lg shadow-md flex justify-between items-center rounded-[16px]">
              <h2 className="text-[20px] font-bold">
                {selectedUser?.businessName || "Chat"}
              </h2>
            </div>

            {/* Messages Area */}
            <div className="flex-grow bg-[url('/images/products/chat-bg.png')] bg-cover bg-no-repeat p-4 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {messages?.data?.messages?.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${
                      msg.senderId === currentUserId
                        ? "justify-end" // Outgoing messages (right-aligned)
                        : "justify-start" // Incoming messages (left-aligned)
                    }`}
                  >
                    <div className="flex flex-col w-full">
                      <div
                        className={`p-3 rounded-lg max-w-fit ${
                          msg.senderId === currentUserId
                            ? "bg-blue-500 text-white" // Outgoing message style
                            : "bg-gray-200 text-black" // Incoming message style
                        }`}
                      >
                        <p>{msg.message}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-b-lg shadow-md flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                disabled={sending}
              />
              <button
                className="text-purple-500"
                onClick={handleSendMessage}
                disabled={sending}
              >
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
