"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddToCart = ({ id, quantity = 1, className, children }) => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!token) {
        throw new Error("Login required");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-cart`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id, quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries([
        `${process.env.NEXT_PUBLIC_API_URL}/add-cart`,
      ]);
      toast({
        title: "Success",
        description: data.message || "Item added to cart.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading || !token}
      onClick={handleClick}
      className={
        isLoading || !token
          ? `${className} opacity-60 cursor-not-allowed`
          : `${className}`
      }
    >
      {isLoading ? (
        <ClipLoader color="gray" size={20} />
      ) : (
        children || "Add to Cart"
      )}
    </button>
  );
};

export { AddToCart };
