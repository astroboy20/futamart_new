"use client";

import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { data: user, isLoading, error } = useFetchItems({
    url: `${BASE_URL}/user`,
  });

  const role = user?.data?.role?.name;

  useEffect(() => {
    if (!isLoading && role && role !== "seller") {
      router.push("/seller"); 
    }
  }, [role, isLoading, router]);

  if (isLoading) {
    return <div></div>;
  }

  if (error) {
    return <div>Error fetching user data.</div>; 
  }

  if (role && role !== "seller") {
    return null; 
  }

  return <>{children}</>; 
};
