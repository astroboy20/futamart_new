"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@chakra-ui/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formatDateToLocal = (date) => {
  if (!date) return ""; // Handle null or undefined date
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(
    adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
  );

  const day = adjustedDate.getDate().toString().padStart(2, "0");
  const month = (adjustedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = adjustedDate.getFullYear();
  return `${day}-${month}-${year}`;
};

export const DatePicker = ({ selectedDate, onDateChange, minDate }) => {
  const toast = useToast();
  const [date, setDate] = useState(selectedDate);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  const handleDateSelect = (selected) => {
    // Check if selected date is after or equal to minDate
    if (minDate && new Date(selected) < new Date(minDate)) {
      toast({
        title: "Invalid Date!",
        description: "Discount Start Date cannot be in the past.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setDate(selected); // Store the Date object
    setShow(!show);
    if (onDateChange) {
      onDateChange(selected); // Pass the Date object back to the parent
    }
  };

  return (
    <div className="relative">
      <div className="flex">
        <Input
          className="focus:outline-none focus:ring-0 focus:ring-transparent h-[55px] pr-[80px]"
          value={formatDateToLocal(date)} // Format date for display
          placeholder={"eg 01-01-2024"}
          readOnly
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <Button variant="ghost" className={cn("p-2")} onClick={handleShow}>
            <CalendarIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {show && (
        <div className="absolute z-10 bg-white shadow-lg mt-2">
          <Calendar
            mode="single"
            selected={date} // Pass Date object to calendar
            onSelect={handleDateSelect}
            initialFocus
          />
        </div>
      )}
    </div>
  );
};
