import { Card } from "@chakra-ui/react";
import React from "react";

const OverviewCard = ({ name, percentage, value, bg, text_color }) => {
  const displayPercentage = percentage < 0 ? 0 : percentage;

  return (
    <Card className="rounded-[8px] px-5 py-2 h-[85px]  lg:h-[140px] flex flex-col shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] border-[#0000004D]">
      <h3 className="text-[14px] lg:text-[20px] font-[500]">{name}</h3>
      <div className="flex justify-between items-center mt-auto  font-[500]">
        <p
          style={{ backgroundColor: bg, color: text_color }}
          className="text-[8px] px-2 py-1 lg:py-2 lg:px-4 rounded-full"
        >
          {displayPercentage}% Increase
        </p>

        <p className="text-[20px] lg:text-[40px] ">{value}</p>
      </div>
    </Card>
  );
};

export { OverviewCard };
