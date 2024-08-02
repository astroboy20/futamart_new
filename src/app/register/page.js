import AuthLayout from "@/components/authLayout";
import { Register } from "@/container/auth/register";
import { Suspense } from "react";

export default function Page() {
  return (
    <main>
      <Suspense fallback={<div>Loading</div>}>
        <AuthLayout>
          <Register />
        </AuthLayout>
      </Suspense>
    </main>
  );
}
