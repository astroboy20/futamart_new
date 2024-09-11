"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { AddToCart } from "@/components/addToCart";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { Loading } from "@/components/loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
const CartContainer = () => {
  const token = Cookies.get("token");
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    data: cart,
    isLoading,
    error,
  } = useFetchItems({ url: `${BASE_URL}/cart` });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${BASE_URL}/cart/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete item from cart");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${BASE_URL}/cart`]);
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove item from cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  if (isLoading)
    return (
      <div className="p-3 sm:py-3 sm:px-[6%] grid grid-cols-1 gap-2 lg:gap-[15px] md:grid-cols-2 lg:grid-cols-1 w-full">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="text-center mb-5 h-[50dvh] flex items-center justify-center font-bold">
        {error.message}
      </div>
    );
  if (cart?.data === null || cart?.data?.items?.length === 0)
    return (
      <div className="text-center mb-5 h-[50dvh] flex items-center justify-center">
        <div>
          <img
            src="/images/empty-cart.png"
            alt="Empty Cart"
            className="h-60 pt-10 mx-auto"
          />
          <p className="font-bold pt-10 text-[21px]"> Your cart is empty</p>
          <p className="text-gray-500 mb-20 px-4 font-semibold text-base sm:text-sm">
            Looks like you have not added anything yet to your cart. Go ahead
            and explore top categories
          </p>

          {/* <Link href="/" className="font-bold underline">
              <button className="mt-2 px-4 py-2  text-white rounded">
                Shop now
              </button>
            </Link> */}
        </div>
      </div>
    );

  return (
    <div className="w-[100%] mt-3 mb-10 lg:my-10 px-[6%]  mx-[auto]">
      <div>
        <p className="text-[20px] mb-3 leading-[29.26px] font-semibold sm:text-[35px] sm:leading-[48.76px]">
          Catalogue
        </p>
        <div className="flex flex-col gap-7 w-full">
          {cart?.data?.items.map((item) => {
            return (
              <div
                className="bg-[#F2F3F4] rounded-[4px] shadow-md flex items-center w-[100%] p-4"
                key={item?.product?._id}
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="w-1/3 flex justify-center items-center"
                >
                  <img
                    className="object-cover max-w-[60%]"
                    src={item?.product?.featuredImage}
                    alt=""
                  />
                </Link>
                <div className="px-3 sm:px-5 flex flex-col gap-4 sm:gap-6 w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-[8px] text-[#888282] leading-[9.75px] font-medium sm:text-[14px] sm:leading-[17.07px]">
                      {item?.product?.category?.name}
                    </p>
                    <span
                      className="cursor-pointer"
                      onClick={() => handleDelete(item?.product?._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                      </svg>
                    </span>
                  </div>
                  <Link href={`/products/${item?.product?.slug}`}>
                    <p className="font-semibold text-[16px] leading-[19.5px] sm:text-[24px] sm:leading-[34.13px] truncate w-[180px] lg:w-[850px] ">
                      {item?.product?.name}
                    </p>
                  </Link>
                  <p className="text-[#888282] text-[12px] leading-[14.63px] font-semibold sm:text-[18px] sm:leading-[21.94px]">
                    &#8358;{item?.product?.price}
                  </p>
                  <div className="flex justify-between items-center">
                    <button className="bg-black p-2 px-4 text-white rounded-md text-xs lg:text-base">
                      Chat with seller
                    </button>
                    <div className="flex items-center gap-1">
                      <AddToCart id={item?.product?._id} quantity={1}>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000000"
                          >
                            <path d="M466-306h28v-160h160v-28H494v-160h-28v160H306v28h160v160Zm14.17 174q-72.17 0-135.73-27.39-63.56-27.39-110.57-74.35-47.02-46.96-74.44-110.43Q132-407.65 132-479.83q0-72.17 27.39-135.73 27.39-63.56 74.35-110.57 46.96-47.02 110.43-74.44Q407.65-828 479.83-828q72.17 0 135.73 27.39 63.56 27.39 110.57 74.35 47.02 46.96 74.44 110.43Q828-552.35 828-480.17q0 72.17-27.39 135.73-27.39 63.56-74.35 110.57-46.96 47.02-110.43 74.44Q552.35-132 480.17-132Zm-.17-28q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                          </svg>
                        </span>
                      </AddToCart>
                      <p className="font-normal text-[8px] leading-[9.75px] sm:text-[14px] sm:leading-[17.07px]">
                        {item?.quantity}
                      </p>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#000000"
                        >
                          <path d="M306-466h348v-28H306v28Zm174.17 334q-72.17 0-135.73-27.39-63.56-27.39-110.57-74.35-47.02-46.96-74.44-110.43Q132-407.65 132-479.83q0-72.17 27.39-135.73 27.39-63.56 74.35-110.57 46.96-47.02 110.43-74.44Q407.65-828 479.83-828q72.17 0 135.73 27.39 63.56 27.39 110.57 74.35 47.02 46.96 74.44 110.43Q828-552.35 828-480.17q0 72.17-27.39 135.73-27.39 63.56-74.35 110.57-46.96 47.02-110.43 74.44Q552.35-132 480.17-132Zm-.17-28q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
