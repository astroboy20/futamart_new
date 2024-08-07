import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const useFetchItems = ({ url }) => {
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
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
export const getCart = ({ url }) => {
  const token = Cookies.get("token");
  return useQuery({
    queryKey: [url],
    queryFn: async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        return response.data;
      } catch (error) {
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
