"use client";
import { Header } from "@/components/headers/header";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { StarRating } from "@/components/rating";
import { AddToCart } from "@/components/addToCart";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { Loading } from "@/components/loading";
import { AddToFavourite } from "@/components/AddToFavourite";
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
