import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { FiSend } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";

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
}) => {
  return (
    <>
      {" "}
      <div
        className={`w-full lg:w-[60%] flex flex-col ${
          !isDesktop
            ? "h-[100dvh] absolute inset-0 z-50 bg-white"
            : "h-[400px] bg-[#F2F3F4]"
        }  `}
      >
        <div className="bg-[#F5F5F6] rounded-b-[40px] p-2   lg:p-5  shadow-md sticky top-0 z-10 rounded-t-lg flex justify-between items-center">
          <h2 className="text-[14px] font-[500] flex gap-2 items-center">
            {!isDesktop && (
              <button onClick={() => setSelectedUser(null)}>
                <IoIosArrowBack />
              </button>
            )}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {selectedUser?.userInfo?.firstname}{" "}
            {selectedUser?.userInfo?.lastname}
          </h2>
        </div>

        <div className="flex-grow overflow-y-auto p-4 bg-[#F2F3F4]" ref={messagesEndRef}>
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

            {/* <div ref={messagesEndRef} /> */}
          </div>
        </div>

        {/* Message Input Section */}
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
          <button onClick={handleButtonClick} disabled={sending}>
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export { ChatInput };
