"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const useFetchItems = ({ url }) => {

  const router = useRouter();
  const token = Cookies.get("token");

  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(url, { headers });
        return response.data;
      } catch (error) {
        if (token && error.response && (error.response.status === 401 || error.response.status === 403)) {
          router.push("/login");
        }
        throw new Error(
          error?.response?.data?.message || "Error fetching data"
        );
      }
    },
    onError: (error) => {
      console.error("Error fetching items:", error.message);
    },
  });
};
