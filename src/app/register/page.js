import AuthLayout from "@/components/authLayout";
import { Register } from "@/container/auth/register";
import { Suspense } from "react";

export default function Page() {
  return (
    <main>
      <AuthLayout>
        <Register />
      </AuthLayout>
    </main>
  );
}
