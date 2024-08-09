import AuthLayout from "@/components/authLayout";
import { Forgotpassword } from "@/container/auth/forgot-password";
import React from "react";

const Page = () => {
  return (
    <AuthLayout>
      <Forgotpassword />
    </AuthLayout>
  );
};

export default Page;
