"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useFetchItems } from "@/hooks/useFetchItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useWebsocket } from "@/hooks/useWebsocket";
import { Header } from "@/components/headers/header";
import { ChatSection } from "./chatSection";
import { ChatInput } from "./chatInput";

const notificationSound = new Audio("/sounds/notification.mp3");

const Chats = ({ id, featuredImage, name, price }) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState(message);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFirstChat, setIsFirstChat] = useState(true);
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [failedMessages, setFailedMessages] = useState([]); // State to store failed messages
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { data: userData } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/chats`,
  });

  const { data: user } = useFetchItems({
    url: `${process.env.NEXT_PUBLIC_API_URL}/user`,
  });

  const { data: messages } = useFetchItems({
    url:
      selectedUser || id
        ? `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedUser?._id || id}`
        : null,
    enabled: !!selectedUser || id,
  });

  const userId = user?.data?._id;
  const { socket, error, connected, onlineUsers } = useWebsocket(
    userId ? `wss://api.futamart.com/?userId=${userId || id}` : null
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

            if (newMessage._doc.receiverId === user?.data?._id) {
              console.log("New message for this user:", newMessage);

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
                            ,
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
          // Check if the selected user is online using `onlineUsers`
          if (selectedUser && onlineUsers.includes(selectedUser._id)) {
            console.log(`${selectedUser.name} is online.`);
          } else {
            console.log(`${selectedUser?.name || "User"} is offline.`);
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
        //  const messageSent = localStorage.getItem(`initialMessageSent_${id}`);
          // if (messageSent) {
           setIsFirstChat(false);
            setIsChatOpen(true);
          
          // }

          // Retrieve product details if undefined
          let productImage = featuredImage
          let productName = name;
          let productPrice = price;
          console.log(productImage)
          // if (!productImage || !productName || !productPrice) {
          //   const storedProduct = localStorage.getItem(`clickedProduct_${id}`);
          //   if (storedProduct) {
          //     const {featuredImage:storedImage, name: storedName, price: storedPrice } =
          //       JSON.parse(storedProduct);
          //     productImage = storedImage || featuredImage;
          //     productName = storedName || name;
          //     productPrice = storedPrice || price;
          //   }
          // }

          const payload = { message: `${productImage}\n${productName}\n${productPrice}` };
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
         // localStorage.setItem(`initialMessageSent_${id}`, "true");
          setIsFirstChat(false);
          setIsChatOpen(true);
        } catch (error) {
          console.error("Error sending initial message:", error);
        }
      };

      sendInitialMessage();
    }
  }, [id, isFirstChat, featuredImage, name, price, token, user?.data?._id, queryClient]);

  const handleClick = useCallback(
    (user) => {
      setSelectedUser(user);

      if (!isFirstChat) {
        const productInfo = {
          featuredImage,
          name,
          price,
          id,
        };
        localStorage.setItem(
          `clickedProduct_${id}`,
          JSON.stringify(productInfo)
        );
        console.log("Stored product info in local storage:", productInfo);
      }
    },
    [featuredImage, name, price, id, isFirstChat]
  );

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

  const handleSendMessage = useCallback(
    async (retryMessage = null, file = null) => {
      const messageToSend = retryMessage || message;

      // Ensure messageToSend is a string
      if (typeof messageToSend !== "string" || !messageToSend.trim()) {
        console.log("Message is empty or not a string, not sending.");
        return;
      }
      const newMessage = {
        _id: Date.now().toString(), // Temporary ID
        message: messageToSend || "",
        senderId: user?.data?._id,
        createdAt: new Date().toISOString(),
        status: "sending", // Track message state
        file: file ? file.name : null, 
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

      queryClient.setQueryData(
        [`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`],
        updateChatData
      );

      // Keep the message input intact until the message is successfully sent
      setSending(true);
      setDisplayedMessage("");
      setFile(null);
      try {
        const response = await sendMessageMutation.mutateAsync();
        console.log("Message sent successfully:", response);
        // Update message status to 'sent'
        queryClient.setQueryData(
          [`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                conversation: {
                  ...oldData.data.conversation,
                  messages: oldData.data.conversation.messages.map((msg) =>
                    msg._id === newMessage._id
                      ? { ...msg, status: "sent" }
                      : msg
                  ),
                },
              },
            };
          }
        );
        // Remove from failed messages if retry was successful
        setFailedMessages((prev) =>
          prev.filter((msg) => msg._id !== newMessage._id)
        );
      } catch (error) {
        console.error("Error sending message:", error);
        // Update message status to 'failed'
        queryClient.setQueryData(
          [`${process.env.NEXT_PUBLIC_API_URL}/chat/${id}`],
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              data: {
                ...oldData.data,
                conversation: {
                  ...oldData.data.conversation,
                  messages: oldData.data.conversation.messages.map((msg) =>
                    msg._id === newMessage._id
                      ? { ...msg, status: "failed" }
                      : msg
                  ),
                },
              },
            };
          }
        );
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
    },
    [message, sendMessageMutation, user?.data?._id, id, queryClient]
  );
  const handleFileUpload = useCallback(
    async (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile); // Store the selected file
        setDisplayedMessage("Uploading file..."); // Optional: Set a temporary message

        console.log("File selected for upload:", selectedFile);

        // Call the sendMessage function with the selected file
        await handleSendMessage(selectedFile); // Send the file to handleSendMessage
      }
    },
    [handleSendMessage]
  );

  const retrySendMessage = async (failedMessage) => {
    await handleSendMessage(failedMessage.message);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setDisplayedMessage(e.target.value);
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleButtonClick = () => {
    handleSendMessage();
  };

  return (
    <div className="flex flex-col gap-5 h-[100dvh] ">
      {/* <Header /> */}
      <div className="flex justify-between items-center text-[18px] font-medium">
        <p className="text-[20px] lg:text-[35px] font-[600] px-[6%]">Chats</p>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between w-full h-full px-[6%] mb-[4%]">
        {(!selectedUser || isDesktop || !id) && (
          <div className="w-full lg:w-[35%]">
            <ChatSection
              userData={userData}
              setSelectedUser={setSelectedUser}
              setIsChatOpen={setIsChatOpen}
            />
          </div>
        )}
        {(selectedUser || isChatOpen || id) && (
          <ChatInput
            user={user}
            id={id}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            messages={messages}
            setSelectedUser={setSelectedUser}
            isDesktop={isDesktop}
            selectedUser={selectedUser}
            messagesEndRef={messagesEndRef}
            displayedMessage={displayedMessage}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            sending={sending}
            retrySendMessage={retrySendMessage}
            handleButtonClick={handleButtonClick}
            handleFileUpload={handleFileUpload}
            isOnline={onlineUsers.includes(id)}
          />
        )}
      </div>
    </div>
  );
};

export { Chats };
