"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
// import { , useDisclosure, useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const ModalContainer = ({ isOpen, message, onClose }) => {
  console.log("tpe:", isOpen, !isOpen);
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} size={"lg"} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={"100%"}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { ModalContainer };
