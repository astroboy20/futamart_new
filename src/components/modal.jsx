import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const Modal = ({ isOpen, message }) => {
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
