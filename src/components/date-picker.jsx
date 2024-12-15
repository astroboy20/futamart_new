"use client";

import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

// Helper function to format the date into a more readable format
const formatDateToLocal = (date) => {
  if (!date) return ""; // Handle null or undefined date
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(
    adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
  );

  const day = adjustedDate.getDate().toString().padStart(2, "0");
  const month = (adjustedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = adjustedDate.getFullYear();
  return `${year}-${month}-${day}`;
};

export const DatePicker = ({ selectedDate, onDateChange, minDate }) => {
  const toast = useToast();

  const handleDateSelect = (selected) => {
    // Check if selected date is after or equal to minDate
    if (minDate && new Date(selected) < new Date(minDate)) {
      toast({
        title: "Invalid Date!",
        description: "The selected date cannot be in the past.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (onDateChange) {
      onDateChange(selected); // Pass the Date object back to the parent
    }
  };

  return (
    <div className="relative">
      <Input
        height="55px"
        background="white"
        placeholder="Select Date"
        size="md"
        type="date"
        value={formatDateToLocal(selectedDate)} // Updated to use formatted date for display
        onChange={(e) => handleDateSelect(e.target.value)} // Handle date change
      />
    </div>
  );
};
