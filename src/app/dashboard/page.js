"use client";
import { Home } from "@/container/dashboard/home/home";
import { ProtectedRoute } from "@/context/ProtectedRoute";

export default function Page() {
  return (
    <main>
        <Home />
    </main>
  );
}
