import { AddIcon, NotificationIconX, SearchIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/providers/data";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Products = () => {
  return (
    <main className="flex flex-col gap-5 lg:gap-10 mt-[100px] lg:mt-0">
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
          <Button className="hidden lg:block">Add products</Button>
        </div>
      </div>

      <div>
        <Card>
          <Table>
            <TableHeader className="bg-black text-white rounded-b-[50px]">
              <TableRow className="rounded-b-[50px]">
                <TableHead className="hidden lg:flex items-center text-white">Name </TableHead>
                <TableHead className=" text-white">Image <span className="lg:hidden flex text-white">& Image</span></TableHead>
                <TableHead className=" text-white">Categories</TableHead>
                <TableHead className=" text-white">Size</TableHead>
                <TableHead className=" text-white">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((data) => (
                <TableRow>
                  <TableCell className="hidden lg:block mt-4">{data.name}</TableCell>
                  <TableCell>
                    {" "}
                    <Image
                      src={data.src}
                      width={48}
                      height={48}
                      alt="product-image"
                      className="object-contain"
                    />
                    <span className="lg:hidden flex">{data.name}</span>
                  </TableCell>
                  <TableCell>{data.categories}</TableCell>
                  <TableCell>{data.size}</TableCell>
                  <TableCell>{data.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <span className="lg:hidden flex absolute bottom-[30px] left-[75%]"><AddIcon/></span>
        </Card>
      </div>
    </main>
  );
};

export { Products };
