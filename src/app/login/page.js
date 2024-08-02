import AuthLayout from "@/components/authLayout";
import { Login } from "@/container/auth/login/login";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      {" "}
      <AuthLayout>
        <Login />
      </AuthLayout>
    </Suspense>
  );
}
