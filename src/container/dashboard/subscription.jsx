"use client";
import { BadgeIcon } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import React, { useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { LuDot } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

const Subscription = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const toast = useToast();
  const [planId, setPlanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: plans, isLoading } = useFetchItems({
    url: `${BASE_URL}/subscription/plan`,
  });
  const { data: user_plan, isPending } = useFetchItems({
    url: `${BASE_URL}/business-subscriptions`,
  });

  const handleSetID = (id) => {
    setPlanId(id);
  };

  const handleSubmit = () => {
    if (planId) {
      setLoading(true);
      axios
        .post(
          `${BASE_URL}/user-subscription/subscribe`,
          { planId, type: "once" },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          setLoading(false);
          toast({
            title: "Subscription Successful",
            description: "You have successfully subscribed to the plan., proceed to payment",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          if (response?.data?.data?.authorization_url) {
            router.push(response?.data?.data?.authorization_url);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: "Subscription Failed",
            description:
              error.response?.data?.message ||
              "Something went wrong. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log(error);
        });
    }
  };

if (isLoading || isPending) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ClipLoader />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 lg:gap-10 mt-[100px] lg:mt-0">
      <div className="flex justify-between items-center lg:items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-[20px] font-[700]">Plan and Billing</h1>
          <p className="text-[16px]">Manage your plan and payments</p>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          <Button className="bg-transparent border border-black text-black text-[14px] hover:bg-transparent">
            Cancel subscription
          </Button>
          <Button className="hidden lg:flex gap-3 items-center bg-transparent border border-black text-black text-[14px] hover:bg-transparent">
            Manage subscription <FaRegShareSquare size={20} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-[18px] font-[600]">Current Plan</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className="drop-shadow-lg">
            <div className="flex flex-col gap-6 p-5">
              <div className="flex justify-between items-center">
                <p>Monthly plan</p>
                {user_plan?.data?.isActive ? (
                  <div className="text-[16px] text-[#388364] font-[700] flex items-center">
                    <span>
                      <LuDot size={30} />
                    </span>{" "}
                    Active
                  </div>
                ) : (
                  <span className="text-[16px] text-red-600 font-[700] flex items-center">
                    <span>
                      <LuDot size={30} />
                    </span>{" "}
                    Inactive
                  </span>
                )}
              </div>
              {user_plan?.data?.subscriptionPlan?.price ? (
                <span className="text-[20px] font-[700]">
                  ₦ {user_plan?.data?.subscriptionPlan.price}/month
                </span>
              ) : (
                <span className="text-[20px] font-[700]">-</span>
              )}
            </div>
          </Card>
          <Card className="drop-shadow-lg">
            <div className="flex flex-col gap-6 p-5">
              <p>Renew at</p>
              <span className="text-[20px] font-[700]">
                {user_plan?.data?.renewalDate}
              </span>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-[18px] font-[600]">Subscription plans</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {plans?.data?.map((data) => (
            <Card className="bg-black text-white mx-5 lg:mx-0" key={data._id}>
              <div className="flex flex-col gap-6 p-5">
                <div className="flex flex-col">
                  <p>{data.plan}</p>
                  <div className="text-[16px] text-[#FFF8F8] font-[500] flex gap-1 items-center">
                    <span className="text-[36px] font-[600]">
                      ₦ {data.price}
                    </span>
                    /month
                  </div>
                </div>
                <div className="text-[16px]">
                  <p className="text-[16px] font-[600] mb-5">
                    For individuals:
                  </p>
                  <div className="flex flex-col gap-5">
                    {data?.details?.map((detail, index) => (
                      <div className="flex gap-3 items-center" key={index}>
                        <div>
                          <IoMdCheckmarkCircle />
                        </div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => {
                    handleSetID(data._id);
                    handleSubmit();
                  }}
                  className="flex mt-auto bg-white border border-black text-black text-[14px] hover:bg-white"
                >
                  {loading ? <Spinner size="sm" /> : "Choose subscription"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-[90%] h-fit flex justify-center items-center">
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className="w-[90%] rounded-full"
        >
          <ModalOverlay />
          <ModalContent
            className="lg:p-5 rounded-full"
            width={{ base: "95%", lg: "100%" }}
          >
            <ModalCloseButton />
            <ModalBody className="flex flex-col gap-3 rounded-full">
              <div className="m-auto">
                <BadgeIcon />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-[28px] lg:text-[32px] font-[600]">
                    Payment Successful
                  </h1>
                  <p className="text-[20px]">
                    Your plan has been successfully subscribed to
                  </p>
                </div>
                <div>
                  <Button className="w-full h-[50px]" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export { Subscription };
