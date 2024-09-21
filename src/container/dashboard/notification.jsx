"use client"
import { Button } from "@/components/ui/button";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { notification } from "@/providers/data";
import Image from "next/image";
import Link from "next/link";
import { FaRegShareSquare } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const Notification = () => {
  const { data, isLoading } = useFetchItems({
    url: `${BASE_URL}/notification/user`,
  });

  console.log(data?.data)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <ClipLoader color="black" />
      </div>
    );
  }
  if(data?.data?.length === 0){
    return (
      <div className="flex justify-center items-center h-[100vh] ">
        There is notification at the monent!
      </div>
    );
  }
  return (
    <main className="flex flex-col gap-10">
      <div className="flex justify-between ">
        <h1 className="text-[24px] font-[600] underline">Notification</h1>
        <div className="flex items-center gap-5">
          <FaRegShareSquare size={24} />
          <Link href="/dashboard/products">
            <Button className="hidden lg:block">View products</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {notification.map((data) => (
          <div className="flex justify-between">
            <div className="flex gap-5 items-center lg:text-[16px] text-[12px]">
              <Image src={data.src} width={48} height={48} alt="user-image" />
              <p>
                {data.name} {data.item ? "added" : ""}{" "}
                <span className="underline"> {data?.item}</span>{" "}
                {data.item ? "to cart" : ""}{" "}
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
