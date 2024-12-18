"use client";

import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

// Helper function to format the date into a more readable format
const formatDateToLocal = (date) => {
  if (!date) return "";
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(
    adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
  );

  const day = adjustedDate.getDate().toString().padStart(2, "0");
  const month = (adjustedDate.getMonth() + 1).toString().padStart(2, "0");
  const year = adjustedDate.getFullYear();
  return `${year}-${month}-${day}`;
};

// Helper function to get the start of today
const getStartOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const DatePicker = ({ selectedDate, onDateChange, minDate }) => {
  const toast = useToast();

  const handleDateSelect = (selected) => {
    // Parse selected date and minDate to remove time components
    const selectedDateOnly = new Date(selected).setHours(0, 0, 0, 0);
    const minDateOnly = new Date(minDate).setHours(0, 0, 0, 0);

    if (minDate && selectedDateOnly < minDateOnly) {
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
      onDateChange(selected);
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
        value={formatDateToLocal(selectedDate)}
        onChange={(e) => handleDateSelect(e.target.value)}
        min={formatDateToLocal(getStartOfToday())}
      />
    </div>
  );
};
