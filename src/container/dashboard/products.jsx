import { NotificationIconX, SearchIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { products } from "@/providers/data";
import Image from "next/image";

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
        <Card className="p-5">
          <div className="w-full flex justify-between items-center py-2 text-left font-semibold border-b border-gray-300">
            <span className="flex-1 text-left">Name</span>
            <span className="flex-1 text-center">Image</span>
            <span className="flex-1 text-center">Categories</span>
            <span className="flex-1 text-center">Size</span>
            <span className="flex-1 text-right">Price</span>
          </div>
          {products.map((data, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center py-2 border-b border-gray-300"
            >
              <p className="flex-1 text-left">{data.name}</p>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src={data.src}
                  width={48}
                  height={48}
                  alt="product-image"
                  className="object-contain"
                />
              </div>
              <p className="flex-1 text-center">{data.categories}</p>
              <p className="flex-1 text-center">{data.size}</p>
              <p className="flex-1 text-right">{data.price}</p>
            </div>
          ))}
        </Card>
      </div>
    </main>
  );
};

export { Products };
