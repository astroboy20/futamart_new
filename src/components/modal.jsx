"use client"
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useToast } from "@chakra-ui/react";

const Modal = ({ isOpen, message }) => {
  const toast = useToast()
  if (!isOpen) return null;
  return (
    <Alert variant="destructive">
      
      {/* <ExclamationTriangleIcon className="h-4 w-4" /> */}
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
    
  );
};

export { Modal };
