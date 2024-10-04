"use client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { Promotion } from "@/components/promotion";
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
      <Header/>
      <Chats id={id} name={name} price={price} />
      <Promotion/>
      <Footer/>
    </div>
  );
}
