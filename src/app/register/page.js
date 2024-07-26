import AuthLayout from "@/components/authLayout";
import { Register } from "@/container/auth/register";

export default function Page(){
    return(
        <main>
            <AuthLayout>
               <Register/> 
            </AuthLayout>
        </main>
    )
}