import { NotificationIconX, SearchIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const notifications = [
  {
    title: "Profile Views",
    rate: "0.8% increase",
    count: "428",
    description: "1 hour ago",
  },
  {
    title: "Favourites",
    rate: "2% increase",
    count: "123",
    description: "1 hour ago",
  },
  {
    title: "Catalogue",
    rate: "0.4% decrease",
    count: "186",
    description: "2 hours ago",
  },
];

const Home = () => {
  return (
    <main className="flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <div className="w-[70%] h-fit px-3 py-1 border-2 shadow-[2px_2px_4px_0_rgba(0,0,0,0.12)] rounded flex items-center gap-5">
          <SearchIcon />
          <Input
            className="border-none focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent p-0"
            placeholder="search items here"
          />
        </div>

        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Button>Add products</Button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-[20px] font-[500]">This month</h1>{" "}
        <div className="grid grid-cols-3 gap-10">
          {notifications.map((data, index) => (
            <Card
              key={index}
              className="rounded-[8px] px-5 py-2 h-[140px] flex flex-col shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D]"
            >
              <h3 className="text-[20px] font-[500]">{data.title}</h3>
              <div className="flex justify-between items-center mt-auto  font-[500]">
                <p className="text-[8px] bg-[#FFE5CA] py-2 px-4 rounded-full">
                  {data.rate}
                </p>
                <p className="text-[40px] ">{data.count}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <Card>Profile Views
This week
288</Card>
      </div>
    </main>
  );
};

export { Home };
