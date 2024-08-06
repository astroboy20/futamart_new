"use client";
import { NotificationIconX } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig, chartData } from "@/providers/data";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

const Analytics = () => {
  return (
    <main className="flex flex-col gap-10">
      <div className="flex justify-between ">
        <h1 className="text-[24px] font-[600] underline">Analytics</h1>
        <div className="flex items-center gap-5">
          <NotificationIconX />
          <Button className="hidden lg:block">Add products</Button>
        </div>
      </div>

      <div className="flex flex-col  gap-5 w-full">
        <div className="flex gap-2 items-center">
          <p className="text-[14px] lg:text-[18px] font-[500]">
            {" "}
            Profile Views
          </p>
          <p className="text-[14px] lg:text-[24px] font-[700]">288</p>
        </div>
        <Card className="p-5 w-full lg:w-full h-fit lg:h-fit shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D] rounded-[8px]">
          <div className="float-right mb-10 lg:mb-0">
            <p className="text-[14px] font-[400] lg:text-[16px] lg:font-[500]">
              This week
            </p>
          </div>

          <ChartContainer config={chartConfig} className="w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
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
                dataKey="desktop"
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
      </div>
      <div className="flex flex-col  gap-5 w-full">
        <div className="flex gap-2 items-center">
          <p className="text-[14px] lg:text-[18px] font-[500]">Favourite</p>
          <p className="text-[14px] lg:text-[24px] font-[700]">288</p>
        </div>
        <Card className="p-5 w-full lg:w-full h-fit lg:h-fit shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D] rounded-[8px]">
          <div className="float-right mb-10 lg:mb-0">
            <p className="text-[14px] font-[400] lg:text-[16px] lg:font-[500]">
              This week
            </p>
          </div>

          <ChartContainer config={chartConfig} className="w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
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
                dataKey="desktop"
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
      </div>
      <div className="flex flex-col  gap-5 w-full">
        <div className="flex gap-2 items-center">
          <p className="text-[14px] lg:text-[18px] font-[500]"> Catalogue</p>
          <p className="text-[14px] lg:text-[24px] font-[700]">288</p>
        </div>
        <Card className="p-5 w-full lg:w-full h-fit lg:h-fit shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D] rounded-[8px]">
          <div className="float-right mb-10 lg:mb-0">
            <p className="text-[14px] font-[400] lg:text-[16px] lg:font-[500]">
              This week
            </p>
          </div>

          <ChartContainer config={chartConfig} className="w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
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
                dataKey="desktop"
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
      </div>
    </main>
  );
};

export { Analytics };
