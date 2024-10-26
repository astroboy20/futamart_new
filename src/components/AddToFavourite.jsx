"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from "axios";

const AddToFavourite = ({ productId }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const toast = useToast();
  const token = Cookies.get("token");

  // Load the initial favorite status from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavourite(storedFavorites.includes(productId));
  }, [productId]);

  const handleFavouriteClick = () => {
    if (!token) {
      toast({
        title: "Error",
        description: "You must be logged in to add to favourites.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const updatedFavouriteStatus = !isFavourite;
    setIsFavourite(updatedFavouriteStatus);

    // Update the favorite status in localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (updatedFavouriteStatus) {
      // Adding to favorites
      updatedFavorites = [...storedFavorites, productId];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/favourite/add`,
          { productId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          console.log("Success:", data);
          toast({
            title: "Success",
            description: data.message || "Item added to favourites.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Error",
            description: "Failed to add item to favourites.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          // Revert the favorite status in case of an error
          setIsFavourite(!updatedFavouriteStatus);
          localStorage.setItem("favorites", JSON.stringify(storedFavorites));
        });
    } else {
      // Removing from favorites
      updatedFavorites = storedFavorites.filter((id) => id !== productId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/favourite/remove`,
          { productId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          console.log("Success:", data);
          toast({
            title: "Success",
            description: data.message || "Item removed from favourites.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Error",
            description: error.message || "Failed to remove item from favourites.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });

          setIsFavourite(!updatedFavouriteStatus);
          localStorage.setItem("favorites", JSON.stringify(storedFavorites));
        });
    }
  };

  return (
    <button onClick={handleFavouriteClick}>
      {isFavourite ? (
        <MdFavorite color="black" size={25} />
      ) : (
        <MdFavoriteBorder size={25} />
      )}
    </button>
  );
};

export { AddToFavourite };
