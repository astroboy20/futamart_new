"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";

const AddToCart = ({ id, quantity, className, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const cartData = {
    productId: id,
    quantity: 1,
  };
  const handleClick = async (event) => {
    setIsLoading(true);
    const token = Cookies.get("token");
    if (!token) {
      setIsLoading(false);
      alert("Login!!");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/add-cart`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartData),
      }
    );
    const cartmsg = await response.json();
    alert(cartmsg.message);
    setIsLoading(false);
  };
  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className={
        isLoading
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
