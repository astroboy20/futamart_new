"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useRef } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi"; // Import paperclip icon
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const ChatInput = ({
  user,
  messages,
  isDesktop,
  setSelectedUser,
  selectedUser,
  messagesEndRef,
  displayedMessage,
  handleInputChange,
  handleKeyPress,
  sending,
  retrySendMessage,
  handleButtonClick,
  handleFileUpload,
  isOnline,
  setIsChatOpen,
  id,
  isChatOpen,
}) => {
  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    console.log("Attachment button clicked");
    fileInputRef.current.click();
  };

  const router = useRouter();
  const pathname = usePathname();

  const handleCloseChat = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(`initialMessageSent_${id}`);
    }

    setSelectedUser(null);

    if (pathname.startsWith(`/user/chat/`) && id) {
      router.push("/user/chat");
    } else if (pathname === "/user/chat") {
      setIsChatOpen(false);
    }
  };

  // Prevent rendering if the chat is closed
  if (!isChatOpen) return null;
  const renderMessageWithImages = (message) => {
    const lines = message.split("\n");
    const imageUrlPattern = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi;

    let htmlContent = "";
    let imageFound = false;

    // Check each line for an image URL
    for (let line of lines) {
      const trimmedLine = line.trim();
      if (imageUrlPattern.test(trimmedLine)) {
        htmlContent += `<img src="${trimmedLine}" alt="Message Image" class="rounded-lg mb-2 max-w-full max-h-48" /><br />`;
        imageFound = true;
      } else {
        htmlContent += `<p>${line}</p>`;
      }
    }

    // If no image is found, return the message as a plain text
    if (!imageFound) {
      htmlContent = message;
    }

    return htmlContent;
  };

  return (
    <div
      className={`w-full lg:w-[60%] flex flex-col ${
        !isDesktop
          ? "h-[100dvh] fixed overflow-hidden no-scrollbar inset-0 z-50 bg-white"
          : "h-[500px] bg-[url('/images/products/chat-bg.png')] bg-cover bg-no-repeat lg:rounded-lg shadow-lg"
      }`}
    >
      <div className="bg-[#F5F5F6] rounded-b-[40px] p-2 lg:p-5 shadow-md sticky top-0 z-10 rounded-t-lg flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-[14px] font-[500] flex gap-2 items-center">
            {!isDesktop && (
              <button onClick={handleCloseChat}>
                <IoIosArrowBack />
              </button>
            )}
            <Avatar>
              <AvatarImage
                src={
                  messages?.data?.userInfo?.profile_image ||
                  selectedUser?.businessInfo?.business_logo
                }
              />

              <AvatarFallback>
                {(messages?.data?.userInfo?.firstname?.[0] || "") +
                  (messages?.data?.userInfo?.lastname?.[0] || "") ||
                  selectedUser?.businessInfo?.businessName}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>
                {messages?.data?.userInfo?.firstname ||
                messages?.data?.userInfo?.lastname
                  ? `${messages?.data?.userInfo?.firstname || ""} ${
                      messages?.data?.userInfo?.lastname || ""
                    }`.trim()
                  : selectedUser?.businessInfo?.businessName}
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
      </div>

      <div
        className="flex-grow overflow-y-auto p-4 bg-[url('/images/products/chat-bg.png')] bg-cover bg-no-repeat lg:rounded-lg shadow-lg"
        ref={messagesEndRef}
      >
        <div className="flex flex-col">
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

                  {msg.file && msg.file.match(/\.(jpeg|jpg|gif|png)$/) && (
                    <img
                      src={msg.file}
                      alt="Uploaded"
                      className="mt-2 max-w-[200px] rounded"
                    />
                  )}
                  {msg.file && msg.file.match(/\.(pdf|doc|docx)$/) && (
                    <div className="mt-2">
                      <iframe
                        src={msg.file}
                        className="w-full h-32 border border-gray-300"
                        title="Document Preview"
                      />
                    </div>
                  )}
                  {msg.status === "failed" && (
                    <div
                      className="text-red-500 text-[10px] mt-1 cursor-pointer"
                      onClick={() => retrySendMessage(msg)}
                    >
                      Message failed to send. Tap to retry.
                    </div>
                  )}
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

      <div className="bg-white p-3 shadow-md flex items-center gap-3 z-10">
        <textarea
          value={displayedMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-black"
          style={{
            minHeight: "50px",
            overflow: "hidden",
            resize: "none",
          }}
          disabled={sending}
        />

        {/* <button onClick={handleAttachmentClick} className="p-2">
          <FiPaperclip size={20} />
        </button> */}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
          accept="image/*,.pdf,.doc,.docx"
        />
        <button onClick={handleButtonClick} disabled={sending}>
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};

export { ChatInput };
