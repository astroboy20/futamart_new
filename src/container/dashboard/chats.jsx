import { NotificationIconX } from "@/assets";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Chats = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between ">
        <h1 className="text-[24px] font-[600] underline">Chat</h1>
        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Link href="/dashboard/products">
            <Button className="hidden lg:block">View products</Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-between  w-full">
        <div className="w-[30%]">
          <div className="flex justify-between items-center text-[18px] font-[500]">
            <p>All Chats ()</p>
            <p>Oldest</p>
          </div>
        </div>
        <div className="w-[60%] bg-[url('/images/products/chat-bg.png')] h-[500px] bg-cover bg-no-repeat" ></div>
      </div>
    </div>
  );
};

export { Chats };
