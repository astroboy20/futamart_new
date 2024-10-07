import React, { useState } from "react";
import { Fav } from "@/assets";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { MdFavoriteBorder } from "react-icons/md";
import axios from "axios";
import { MdFavorite } from "react-icons/md";

const AddToFavourite = ({ productId }) => {
  // const token = Cookies.get("token")
  const [isFavourite, setIsFavourite] = useState(false);
  const toast = useToast();
  const token = Cookies.get("token");
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

    setIsFavourite(!isFavourite);

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
          description: data.message || "Item added to favourite.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsFavourite(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "Failed to add item to favourite.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsFavourite(false);
      });
  };

  return (
    <button
      onClick={handleFavouriteClick}
      // style={{ color: isFavourite ? "red" : "inherit" }}
    >
      {isFavourite ? (
        <MdFavorite color="red" size={30} />
      ) : (
        <MdFavoriteBorder size={30} />
      )}
    </button>
  );
};

export { AddToFavourite };
