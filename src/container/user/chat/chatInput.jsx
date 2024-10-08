"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useRef } from "react";
import { FiSend } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { FiPaperclip } from "react-icons/fi"; // Import paperclip icon

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
  handleButtonClick,
  handleFileUpload,
  isOnline,
}) => {
  const fileInputRef = useRef(null);

  const handleAttachmentClick = () => {
    fileInputRef.current.click(); // Open the file picker
  };

  return (
    <>
      <div
        className={`w-full lg:w-[60%] flex flex-col ${
          !isDesktop
            ? "h-[100dvh] absolute inset-0 z-50 bg-white"
            : "h-[400px]  bg-[url('/images/products/chat-bg.png')] bg-cover bg-no-repeat lg:rounded-lg shadow-lg "
        }  `}
      >
        <div className="bg-[#F5F5F6] rounded-b-[40px] p-2 lg:p-5 shadow-md sticky top-0 z-10 rounded-t-lg flex flex-col">
          <div className="flex justify-between items-center">
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
              {selectedUser?.userInfo?.firstname}{" "}
              {selectedUser?.userInfo?.lastname}
            </h2>
          </div>

          {/* Online/Offline Status */}
          <span
            className={` ml-[10px] text-[12px] font-[400] ${
              isOnline ? "text-green-500" : "text-red-500"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        <div
          className="flex-grow overflow-y-auto p-4 bg-[#F2F3F4]"
          ref={messagesEndRef}
        >
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
                    <p
                      dangerouslySetInnerHTML={{
                        __html: msg.message.replace(/\n/g, "<br />"),
                      }}
                    />

                    {/* Display image preview if the file is an image */}
                    {msg.file && msg.file.match(/\.(jpeg|jpg|gif|png)$/) && (
                      <img
                        src={msg.file}
                        alt="Uploaded"
                        className="mt-2 max-w-[200px] rounded"
                      />
                    )}

                    {/* Display PDF or document preview */}
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
                    {new Date(msg.createdAt).toLocaleTimeString()}
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

          <button onClick={handleAttachmentClick} className="p-2">
            <FiPaperclip size={20} />
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx" // Accept images, PDFs, and docs
          />
          <button onClick={handleButtonClick} disabled={sending}>
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export { ChatInput };
