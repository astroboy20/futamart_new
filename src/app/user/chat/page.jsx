import { Footer } from "@/components/footer";
import { Header } from "@/components/headers/header";
import { Promotion } from "@/components/promotion";
import { UserChat } from "@/container/user/chat/userChat";

export default function Page(){
    return(
        <div>
            <Header/>
            <UserChat/>
        </div>
    )
}
