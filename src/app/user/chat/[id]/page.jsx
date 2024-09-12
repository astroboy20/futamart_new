"use client"
import { Chats } from "@/container/user/chats";
import { useParams } from "next/navigation";

export default function Page(){
    const {id} = useParams()
    return(
        <div>
            <Chats id={id}/>
        </div>
    )
}