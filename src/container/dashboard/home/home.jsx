"use client";
import { NotificationIconX, SearchIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import Image from "next/image";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { chartConfig, chartData, notification } from "@/providers/data";
import { ModalContainer } from "@/components/modal";
import { useState } from "react";
import Link from "next/link";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { OverviewCard } from "./overviewCard";

const notifications = notification.slice(0, 2);


const Home = () => {
  const { data: overviewData } = useFetchItems({
    url: `${BASE_URL}/dashboard/seller/overview`,
  });
  // console.log(overview?.data.catalouge);
  const overview = overviewData?.data;
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
          <Link href="/dashboard/products">
            <Button className="hidden lg:block">View products</Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-[20px] font-[500]">This month</h1>{" "}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          <OverviewCard
            name={"Profile Views"}
            value={overview?.profileViews}
            bg={"#FFE5CA"}
            text_color={"#994E00"}
          />
          <OverviewCard
            name={"Favourites"}
            value={overview?.favourites}
            bg={"#E0EED4"}
            text_color={"#5E8B37"}
          />
          <OverviewCard
            name={"Catalogue"}
            value={overview?.catalouge}
            bg={"#FFEDBB"}
            text_color={"#BD8B00"}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-5 w-full">
        <Card className="p-5 w-full lg:w-[70%] h-fit  lg:h-[400px] overflow-y-scroll no-scrollbar shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D] rounded-[8px]">
          <div className="flex justify-between mb-10 lg:mb-0">
            <div>
              <p className="text-[14px] lg:text-[18px] font-[500]">
                {" "}
                Profile Views
              </p>
              <p className="text-[14px] lg:text-[24px] font-[700]">
                {overview?.viewsStats?.totalViewsThisWeek}
              </p>
            </div>
            <p className="text-[14px] font-[400] lg:text-[16px] lg:font-[500]">
              This week
            </p>
          </div>

          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                barSize={40}
                dataKey="value"
                fill="var(--color-desktop)"
                radius={8}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={14}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </Card>

        <Card className="p-5 w-full lg:w-[30%] h-fit lg:h-[400px] shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D] rounded-[8px] bg-black flex flex-col gap-5">
          <div className="text-[8px] flex flex-col gap-4 lg:gap-2">
            <p className="rounded-full py-2 px-4 text-[#BD8B00] bg-[#FFEDBB] w-fit">
              Combo Deals
            </p>
            <p className="rounded-full py-2 px-4 text-[#5E8B37] bg-[#E0EED4] w-fit">
              Flash Sales
            </p>
          </div>
          <div className="text-white flex flex-col gap-3">
            <h2 className="text-[20px] font-[600]">
              Add your weekend flash sales
            </h2>
            <p className="text-[16px] font-[400]">
              Showcase your products in our weekend flash sales! Take advantage
              of this opportunity to boost your sales and reach more customers.
            </p>
          </div>
          <Button className="bg-[#F2F3F4] text-black w-fit m-auto px-[16px] lg:w-full">
            Add product
          </Button>
        </Card>
      </div>

      <div className="flex items-center gap-5 w-full">
        <Card className="p-5 w-full lg:w-[30%] h-[180px] overflow-y-scroll no-scrollbar  shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D] rounded-[8px]">
          <h1 className="text-[20px] font-[500] ">Notifications</h1>{" "}
          <div className="flex flex-col gap-5">
            {notifications.map((data) => (
              <div key={data.id} className="flex items-center gap-5">
                <Image
                  src={data.src}
                  width={40}
                  height={40}
                  alt="notification-image"
                />
                <p className="text-[14px]">
                  {data.name} added{" "}
                  <span className="underline">{data.item} </span>to cart
                </p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="hidden p-5 w-[70%] h-[180px] shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D] rounded-[8px] lg:flex flex-col gap-5 overflow-hidden">
          <h1 className="text-[20px] font-[500]">All Products</h1>
          <div className="">
            <Table className="min-w-full">
              <TableHeader className="bg-black text-white rounded-t-[4px]">
                <TableRow>
                  <TableHead className="font-medium text-white border-none">
                    Product Name
                  </TableHead>
                  <TableHead className="font-medium text-white border-none">
                    Product Photo
                  </TableHead>
                  <TableHead className="font-medium text-white border-none">
                    Category
                  </TableHead>
                  <TableHead className="font-medium text-white border-none">
                    Product Size
                  </TableHead>
                  <TableHead className="font-medium text-white border-none">
                    Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="no-scrollbar">
                <TableRow>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </main>
  );
};

export { Home };
