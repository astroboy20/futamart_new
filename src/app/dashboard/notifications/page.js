import { DashboardHeader } from "@/components/headers/dashboardHeader";
import { Notification } from "@/container/dashboard/notification";

export default function Page (){
    return(
        <div>
            <DashboardHeader/>
            <Notification/>
        </div>
    )
}