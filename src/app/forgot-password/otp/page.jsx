import AuthLayout from "@/components/authLayout";
import { OTP } from "@/container/auth/otp";
import React from "react";

const Page = () => {
  return (
    <AuthLayout>
      <OTP />
    </AuthLayout>
  );
};

export default Page;
