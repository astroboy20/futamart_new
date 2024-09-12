"use client";
import { AddIcon, EditIcon, NotificationIconX, SearchIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton"; // Make sure this import is correct
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

const Products = () => {
  const { data, isLoading } = useFetchItems({ url: `${BASE_URL}/products/user` });
  const products = data?.data?.items || [];
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  return (
    <main className="flex flex-col gap-5 lg:gap-10 mt-[100px] lg:mt-0">
      <ModalContainer isOpen={showModal} onClose={setShowModal} />

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
                  Name <span className="lg:hidden flex text-white">& Photo</span>
                </TableHead>
                <TableHead className="text-white">Categories</TableHead>
                <TableHead className="text-white">Price</TableHead>
                <TableHead className="text-white"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                // Render skeleton rows if loading
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
                <div className="text-center m-auto py-10 w-full flex justify-center">No product found!</div>
              ) : (
                products.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell className="hidden lg:block mt-4">{data.name}</TableCell>
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
                    <TableCell className="flex items-center gap-2 text-[#00000066] justify-center">
                      <EditIcon /> Edit
                    </TableCell>
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
