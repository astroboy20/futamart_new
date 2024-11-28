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
  const hasJustRegistered = sessionStorage.getItem("hasJustRegistered");

  useEffect(() => {
    // Only redirect if not loading, user is not a seller, and there's no registration flag
    if (!isLoading && role && role !== "seller" && !hasJustRegistered) {
      router.push("/seller"); 
    }

    // Clear the registration flag after checking it once
    if (hasJustRegistered) {
      sessionStorage.removeItem("hasJustRegistered");
    }
  }, [role, isLoading, router, hasJustRegistered]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user data.</div>; 
  }

  if (role && role !== "seller" && !hasJustRegistered) {
    return null; 
  }

  return <>{children}</>; 
};

