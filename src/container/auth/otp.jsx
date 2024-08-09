import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

const OTP = () => {
  return (
    <div className="h-full border-4 border-red-500">
      <Card className="w-[495px] h-[300px] flex  m-auto border border-green-500">
        <div className="flex items-center ">
          <Input className="w-[5%]" />
          <Input className="w-[5%]" />
          <Input className="w-[5%]" />
          <Input className="w-[5%]" />
        </div>
      </Card>
    </div>
  );
};

export { OTP };
