"use client";

import { useFetchItems } from "@/hooks/useFetchItems";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children } ) => {
  const router = useRouter();  // Correct usage of useRouter
  const { user } = useAuth();
  const role = user?.data?.role?.name;

  useEffect(() => {
    if (role && role !== "seller") {
      router.push("/seller");  // Redirect if the user is not a seller
    }
  }, [role, router]);

  if (role && role !== "seller") {
    return null;  // Return null while redirecting
  }

  return <>{children}</>;  // Render the wrapped children if the role is "seller"
};
