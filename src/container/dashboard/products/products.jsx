"use client";
import { AddIcon, EditIcon, NotificationIconX, SearchIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ModalContainer } from "@/components/modal";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { FiDelete } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { AddProducts } from "./addProducts";

const Products = () => {
  const toast = useToast();
  const token = Cookies.get("token");
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchItems({
    url: `${BASE_URL}/products/user`,
  });
  const products = data?.data?.items || [];
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${BASE_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Product deleted",
        description: "Product has been successfully deleted.",
        status: "success",
      });
      queryClient.invalidateQueries([`${BASE_URL}/products/user`]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        status: "error",
      });
    },
  });

  const editProductMutation = useMutation({
    mutationFn: async (product) => {
      await axios.put(`${BASE_URL}/product/${product.id}`, product);
    },
    onSuccess: () => {
      toast({
        title: "Product updated",
        description: "Product has been successfully updated.",
        status: "success",
      });
      queryClient.invalidateQueries([`${BASE_URL}/products/user`]);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update product.",
        status: "error",
      });
    },
  });

  const handleDelete = (id) => {
    deleteProductMutation.mutateAsync(id);
  };

  const handleEdit = (id) => {
    const updatedProduct = {
      id,
      name: "Updated Product Name",
      category: "Updated Category",
      price: 2000,
    };
    editProductMutation.mutateAsync(updatedProduct);
  };
  console.log(products);
  return (
    <main className="flex flex-col gap-5 lg:gap-10 mt-[100px] lg:mt-0">
      <ModalContainer isOpen={showModal} onClose={setShowModal}>
        <AddProducts onClose={setShowModal} />
      </ModalContainer>

      <div className="flex justify-between items-center lg:items-start">
        <div className="w-[80%] lg:w-[70%] h-fit px-3 py-1 border-2 shadow-[2px_2px_4px_0_rgba(0,0,0,0.12)] rounded flex items-center gap-5">
          <SearchIcon />
          <Input
            className="border-none focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent p-0"
            placeholder="search items here"
          />
        </div>

        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Button className="hidden lg:block" onClick={handleModal}>
            Add products
          </Button>
        </div>
      </div>

      <div>
        <Card>
          <Table>
            <TableHeader className="bg-black text-white rounded-b-[50px]">
              <TableRow className="rounded-b-[50px]">
                <TableHead className="hidden lg:flex items-center text-white">
                  Name
                </TableHead>
                <TableHead className="text-white">
                  Name{" "}
                  <span className="lg:hidden flex text-white">& Photo</span>
                </TableHead>
                <TableHead className="text-white">Categories</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="w-full">
              {isLoading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="hidden lg:block">
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-12 w-12" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-12" />
                    </TableCell>
                  </TableRow>
                ))
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    No product found!
                  </TableCell>
                </TableRow>
              ) : (
                products.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell className="hidden lg:block mt-4">
                      {data.name}
                    </TableCell>
                    <TableCell>
                      <Image
                        src={data.featuredImage}
                        width={48}
                        height={48}
                        alt="product-image"
                        className="object-contain"
                      />
                      <span className="lg:hidden flex">{data.name}</span>
                    </TableCell>
                    <TableCell>{data.category.name}</TableCell>
                    <TableCell>₦{data.price}</TableCell>
                    <div className="flex my-12 lg:my-0 ">
                      <TableCell
                        className="flex items-center gap-2 text-[#00000066] cursor-pointer"
                        onClick={() => handleEdit(data.id)}
                      >
                        <EditIcon /> Edit
                      </TableCell>
                      <TableCell className="text-[#fff]">
                        <div
                          className="flex items-center gap-2 bg-[#F90101CC] p-2 rounded cursor-pointer"
                          onClick={() => handleDelete(data._id)}
                        >
                          <FiDelete /> Delete
                        </div>
                      </TableCell>
                    </div>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <span
            className="lg:hidden flex absolute bottom-[30px] left-[75%]"
            onClick={handleModal}
          >
            <AddIcon />
          </span>
        </Card>
      </div>
    </main>
  );
};

export { Products };
