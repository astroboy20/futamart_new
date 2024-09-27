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
import { IoIosArrowBack } from "react-icons/io";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useWebsocket } from "@/hooks/useWebsocket";

const Chats = ({ id, name, price }) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState(message);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFirstChat, setIsFirstChat] = useState(true);
  const messagesEndRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [failedMessages, setFailedMessages] = useState([]); // State to store failed messages

  const { data: userData } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/chats`,
  });

  const { data: user } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  });

  const { data: messages } = useFetchItems({
    url: selectedUser
      ? `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser._id}`
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
    if (socket && socket.readyState === WebSocket.OPEN) {
      const handleNewMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Message received from server:", data); // Log full message
          if (data.event === "newMessage") {
            const newMessage = data.data;
            console.log("Processing new message:", newMessage);

            if (newMessage.receiverId === user?.data?._id) {
              console.log("New message for this user:", newMessage);

              if (newMessage.senderId === selectedUser?._id) {
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
                            newMessage,
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
        } catch (err) {
          console.error("Error processing WebSocket message:", err);
        }
      };

      socket.addEventListener("message", handleNewMessage);

      return () => {
        socket.removeEventListener("message", handleNewMessage);
      };
    }
  }, [socket, queryClient, selectedUser, user?.data?._id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (id && isFirstChat) {
      const sendInitialMessage = async () => {
        try {
          const messageSent = localStorage.getItem(`initialMessageSent_${id}`);
          if (messageSent) {
            setIsFirstChat(false);
            return;
          }

          const payload = { message: `${name}\n${price}` };
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          queryClient.invalidateQueries([
            `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`,
          ]);
          queryClient.invalidateQueries([
            `${process.env.NEXT_PUBLIC_API_URL}/chats`,
          ]);
          localStorage.setItem(`initialMessageSent_${id}`, "true");
          setIsFirstChat(false);
        } catch (error) {
          console.error("Error sending initial message:", error);
        }
      };

      sendInitialMessage();
    }
  }, [id, isFirstChat, name, price, token, user?.data?._id, queryClient]);

  const handleClick = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      try {
        const payload = { message }; // Only include the message field
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`,
          payload,
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
        `${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`,
      ]);
      queryClient.invalidateQueries([
        `${process.env.NEXT_PUBLIC_API_URL}/chats`,
      ]);
      setMessage("");
    },
  });

  const handleSendMessage = useCallback(async (retryMessage = null) => {
    const messageToSend = retryMessage || message;

      if (typeof messageToSend !== 'string' || !messageToSend.trim()) {
      console.log("Message is empty or not a string, not sending.");
      return;
    }

    const newMessage = {
      _id: Date.now().toString(), // Temporary ID
      message: messageToSend, // Use the current message state or retry message
      senderId: user?.data?._id,
      createdAt: new Date().toISOString(),
      status: 'sending', // Add status to track message state
    };

    console.log("Sending message:", newMessage);

    // Optimistically update the UI
    const updateChatData = (oldData) => {
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
    };

    queryClient.setQueryData([`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`], updateChatData);

    // Keep the message input intact until the message is successfully sent
    setSending(true);
    setDisplayedMessage("");
    try {
      const response = await sendMessageMutation.mutateAsync();
      console.log("Message sent successfully:", response);
      // Update message status to 'sent'
      queryClient.setQueryData([`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            conversation: {
              ...oldData.data.conversation,
              messages: oldData.data.conversation.messages.map((msg) =>
                msg._id === newMessage._id ? { ...msg, status: 'sent' } : msg
              ),
            },
          },
        };
      });
      // Remove from failed messages if retry was successful
      setFailedMessages((prev) => prev.filter((msg) => msg._id !== newMessage._id));
    } catch (error) {
      console.error("Error sending message:", error);
      // Update message status to 'failed'
      queryClient.setQueryData([`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: {
            ...oldData.data,
            conversation: {
              ...oldData.data.conversation,
              messages: oldData.data.conversation.messages.map((msg) =>
                msg._id === newMessage._id ? { ...msg, status: 'failed' } : msg
              ),
            },
          },
        };
      });
      // Add to failed messages if not already present
      setFailedMessages((prev) => {
        if (!prev.find((msg) => msg._id === newMessage._id)) {
          return [...prev, newMessage];
        }
        return prev;
      });
    } finally {
      setSending(false);
    }
  }, [message, sendMessageMutation, user?.data?._id, id, queryClient]);

  const retrySendMessage = async (failedMessage) => {
    await handleSendMessage(failedMessage.message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (like adding a new line)
      handleSendMessage();
    }
  };

  // Automatically resize the textarea
  const handleInputChange = (e) => {
    setDisplayedMessage(e.target.value);
    setMessage(e.target.value); // Keep the original message updated
    
    // Adjust the height based on content
    e.target.style.height = 'auto'; // Reset height to auto to recalculate
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
  };

  return (
    <div className="flex flex-col gap-10 p-[6%]">
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
              !isDesktop ? "h-[80dvh]" : "h-[400px]"
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
                        {msg.status === 'failed' && (
                          <div className="text-red-500 text-[10px] mt-1 cursor-pointer" onClick={() => retrySendMessage(msg)}>
                            Message failed to send. Tap to retry.
                          </div>
                        )}
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

            <div className="bg-white p-3 shadow-md flex items-center gap-3  z-10">
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
              <button onClick={handleSendMessage} disabled={sending}>
                <FiSend size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Chats };
