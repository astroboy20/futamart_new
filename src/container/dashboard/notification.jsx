import { NotificationIconX } from "@/assets";
import { Button } from "@/components/ui/button";
import { notification } from "@/providers/data";
import Image from "next/image";

const Notification = () => {
  return (
    <main className="flex flex-col gap-10">
      <div className="flex justify-between ">
        <h1 className="text-[24px] font-[600] underline">Notification</h1>
        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Button className="hidden lg:block">Add products</Button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {notification.map((data) => (
          <div className="flex justify-between">
            <div className="flex gap-5 items-center lg:text-[16px] text-[12px]">
              <Image src={data.src} width={48} height={48} alt="user-image" />
              <p>
                {data.name} {data.item ? "added" : ""}{" "}
                <span className="underline"> {data?.item}</span> {data.item ? "to cart" : ""}{" "}
              </p>
            </div>
            <p className="text-[8px] lg:text-[14px] italic">{data.time}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export { Notification };
