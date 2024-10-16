import AuthLayout from "@/components/authLayout";
import { NewPassword } from "@/container/auth/new-password";
import { OTP } from "@/container/auth/otp";
import React from "react";

const Page = () => {
  return (
    <AuthLayout>
      <NewPassword />
    </AuthLayout>
  );
};

export default Page;
