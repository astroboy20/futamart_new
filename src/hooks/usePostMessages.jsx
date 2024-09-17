import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const usePostMessages = ({ url, payload, query }) => {
  const token = Cookies.get("token");
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(url, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        console.error("Error sending initial message:", error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([query]);
    },
  });
};
