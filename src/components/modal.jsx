"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { AddProducts } from "@/container/dashboard/addProducts";

const ModalContainer = ({ isOpen, onClose }) => {
  console.log("tpe:", isOpen, !isOpen);
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} size={{ base: "full", lg: "" }} onClose={onClose}>
      <ModalOverlay
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <ModalContent
        width={{ base: "100%", lg: "90%" }}
        height={{ base: "90dvh", lg: "80dvh" }}
        background={"#F2F3F4"}
        overflowY={"scroll"}
      >
        <ModalCloseButton />
        <ModalBody>
          <AddProducts onClose={onClose}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalContainer };
