"use client";
import { Header } from "@/components/headers/header";
import { useSearchParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { Search } from "@/app/search/components/search";
export default function Page() {
  const searchParams = useSearchParams();

  const search_query = searchParams.get("query");

  return (
    <main>
      <Header />
      <Search search_query={search_query} />
      <Footer />
    </main>
  );
}
