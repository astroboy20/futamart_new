"use client";
import { Chats } from "@/container/user/chat/chats";
import { useParams, useSearchParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();

  const { id } = params;
  const name = searchParams.get("name");
  const price = searchParams.get("price");

//   console.log(id, name, price);
  return (
    <div>
      <Chats id={id} name={name} price={price} />
    </div>
  );
}
