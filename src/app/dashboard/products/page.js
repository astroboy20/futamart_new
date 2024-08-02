"use client"
import { DashboardHeader } from "@/components/headers/dashboardHeader";
import { Products } from "@/container/dashboard/products";

export default function Page (){
    return(
        <div>
           <DashboardHeader/>
           <Products/>
        </div>
    )
}