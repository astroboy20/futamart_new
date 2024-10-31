"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdPhotoCamera, MdImage } from "react-icons/md";

const notificationSound = new Audio("/sounds/notification.mp3");

const Chats = () => {
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const token = Cookies.get("token");
  const [message, setMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState(message);
  const [sending, setSending] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const messagesEndRef = useRef(null);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update userData only if there are changes
      if (JSON.stringify(userData) !== JSON.stringify(response.data)) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Initial fetch

    // Polling every 1 second
    const interval = setInterval(fetchUserData, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [userData, token]);

  const { data: user } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  });
  const { data: messages } = useFetchItems({
    url: selectedUser
      ? `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser?._id}`
      : null,
    enabled: !!selectedUser,
  });

  const userId = user?.data?._id;
  const { socket, error, connected, onlineUsers } = useWebsocket(
    userId ? `wss://api.futamart.com/?userId=${userId}` : null
  );

  useEffect(() => {
    if (onlineUsers.length > 0) {
      console.log("Online users:", onlineUsers);
    }
  }, [onlineUsers]);

  useEffect(() => {
    if (userId) {
      console.log("Connecting to WebSocket with userId:", userId);
    }
  }, [userId]);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data); // Log incoming message

        if (data.event === "newMessage") {
          const newMessage = data.data;
          console.log("New message data:", newMessage);

          if (newMessage._doc.receiverId === userId) {
            console.log("Message for current user:", newMessage);

            notificationSound.play().catch((error) => {
              console.error("Failed to play notification sound:", error);
            });

            if (newMessage._doc.senderId === selectedUser?._id) {
              queryClient.setQueryData(
                [
                  `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser?._id}`,
                ],
                (oldData) => {
                  if (!oldData) return oldData;
                  return {
                    ...oldData,
                    data: {
                      ...oldData.data,
                      conversation: {
                        ...oldData.data.conversation,
                        messages: [
                          ...oldData.data.conversation.messages,
                          newMessage._doc,
                        ],
                      },
                    },
                  };
                }
              );
            }

            queryClient.invalidateQueries([
              `${process.env.NEXT_PUBLIC_API_URL}/chats`,
            ]);
          }
        }
        if (selectedUser && onlineUsers.includes(selectedUser?._id)) {
          console.log(`${selectedUser.name} is online.`);
        } else {
          console.log(`${selectedUser?.name || "User"} is offline.`);
        }
      };

      socket.addEventListener("message", handleNewMessage);

      return () => {
        socket.removeEventListener("message", handleNewMessage);
      };
    }
  }, [socket, queryClient, selectedUser, userId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scroll({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

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

      // Optimistically update the unread message count to 0
      user.unreadMessagesCount = 0;

      // Mark messages as read if a conversationId is present
      if (user?.conversationId) {
        markMessagesAsRead(user.conversationId, user._id);
      }
    },
    [setSelectedUser, markMessagesAsRead]
  );

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser._id}`,
        { message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
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

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const newMessage = {
      _id: Date.now().toString(), // Temporary ID
      message,
      senderId: user?.data?._id,
      createdAt: new Date().toISOString(),
    };

    // Optimistically update the UI
    queryClient.setQueryData(
      [`${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser._id}`],
      (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            conversation: {
              ...oldData.data.conversation,
              messages: [...oldData.data.conversation.messages, newMessage],
            },
          },
        };
      }
    );

    setSending(true);

    // Clear the displayed message immediately
    setDisplayedMessage("");

    try {
      await sendMessageMutation.mutateAsync();
    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally, revert the optimistic update if needed
    } finally {
      setSending(false);
    }
  }, [message, sendMessageMutation, queryClient, selectedUser, user]);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleKeyPress = (e) => {
    if (!isMobile) {
      // On desktop, press Enter to send the message.
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    } else {
      // On mobile, press Enter to add a new line.
      if (e.key === "Enter" && !e.shiftKey) {
        // Just let the default behavior happen for a new line.
        return;
      }
    }
  };

  const handleInputChange = (e) => {
    setDisplayedMessage(e.target.value);
    setMessage(e.target.value); // Keep the original message updated

    // Adjust the height based on content
    e.target.style.height = "auto"; // Reset height to auto to recalculate
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
  };
  const isOnline = onlineUsers.includes(selectedUser?._id);

  const renderMessageWithImages = (message) => {
    const lines = message.split("\n");
    const imageUrlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi;
    const firstLine = lines[0].trim();

    let htmlContent = "";

    // Check if the first line is a valid image URL
    if (imageUrlPattern.test(firstLine)) {
      htmlContent += `<img src="${firstLine}" alt="Message Image" class="rounded-lg mb-2 max-w-full max-h-48" /><br />`;
    }

    // Combine remaining text and truncate if too long
    const remainingText = lines.slice(1).join("<br />");
    const truncatedText =
      remainingText.length > 100
        ? remainingText.substring(0, 100) +
          '... <span class="text-blue-500 cursor-pointer">Show more</span>'
        : remainingText;
    htmlContent += truncatedText;

    return htmlContent;
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

      <div className="flex flex-col lg:flex-row lg:justify-between w-full h-[100vh]">
        {/* Scrollable User List */}
        {(!selectedUser || isDesktop) && (
          <div className="w-full lg:w-[37%] pr-[20px] max-h-[70vh] overflow-y-auto lg:overflow-hidden border-r border-gray-300">
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
                    <p className="text-gray-600 text-[12px] font-[500] line-clamp-1">
                      {user?.lastMessage?.message?.match(
                        /(https?:\/\/[^\s]+)/
                      ) ? (
                        <span className="flex items-center">
                          <MdImage
                            className="inline-block text-gray-600"
                            size={16}
                          />{" "}
                          Photo
                        </span>
                      ) : (
                        user?.lastMessage?.message
                      )}
                    </p>
                  </div>

                  <div>
                    {user?.unreadMessagesCount > 0 && (
                      <span className="bg-black text-white text-[10px] font-[600] rounded-full h-5 w-5 flex items-center justify-center border border-white">
                        {user.unreadMessagesCount}
                      </span>
                    )}
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
        )}

        {/* Message when no chat is selected in desktop mode */}
        {isDesktop && !selectedUser && (
          <div className="flex items-center justify-center w-full lg:w-[60%] h-[70vh]">
            <p className="text-gray-500 text-xl">
              Select a chat to begin messaging.
            </p>
          </div>
        )}

        {/* Fixed Chat Area */}
        {selectedUser && (
          <div className="w-full lg:w-[60%] flex flex-col h-[100dvh] lg:h-[70vh] bg-[url('/images/products/chat-bg.png')] bg-cover bg-no-repeat lg:rounded-lg shadow-lg">
            <div className="bg-[#FFF8F8] p-2 lg:bg-white lg:p-4 lg:m-2 shadow-md sticky top-0 z-10 rounded-t-lg flex justify-between items-center">
              <h2 className="text-[14px] font-[500] flex gap-2 items-center">
                {!isDesktop && (
                  <button onClick={() => setSelectedUser(null)}>
                    <IoIosArrowBack />
                  </button>
                )}
                <Avatar>
                  {selectedUser?.userInfo?.profile_image ? (
                    <AvatarImage src={selectedUser.userInfo.profile_image} />
                  ) : (
                    <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
                  )}
                  <AvatarFallback>
                    {selectedUser?.userInfo?.firstname?.[0]}
                    {selectedUser?.userInfo?.lastname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>
                    {selectedUser?.userInfo?.firstname}{" "}
                    {selectedUser?.userInfo?.lastname}
                  </span>
                  <span
                    className={`text-[12px] font-[400] ${
                      isOnline ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </h2>
            </div>

            {/* Chat Messages Section */}
            <div className="flex-grow overflow-y-auto p-4" ref={messagesEndRef}>
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
                        <div className="max-w-md break-words">
                          <p
                            className="text-sm text-white-700"
                            dangerouslySetInnerHTML={{
                              __html: renderMessageWithImages(msg.message),
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-[10px] font-[500] mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input Section */}
            <div className="bg-white p-3 shadow-md flex items-center gap-3 z-10">
              <textarea
                value={displayedMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} // Add the key press handler
                placeholder="Type a message..."
                className="flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-black"
                style={{
                  minHeight: "50px", // Set a minimum height
                  overflow: "hidden", // Hide scrollbar
                  resize: "none", // Prevent manual resizing
                }}
                disabled={sending}
              />
              <button
                className="bg-black text-white p-3 rounded w-fit"
                onClick={handleSendMessage}
                disabled={sending}
              >
                <FiSend size={24} color="white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Chats };
