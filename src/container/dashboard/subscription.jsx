"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import React, { useState } from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useToast } from "@chakra-ui/react";
import { LuDot } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Subscription = () => {
  const token = Cookies.get("token");
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const { data: plans, isLoading: plansLoading } = useFetchItems({
    url: `${BASE_URL}/subscription/plan`,
  });
  const { data: userPlan, isLoading: userPlanLoading } = useFetchItems({
    url: `${BASE_URL}/business-subscriptions`,
  });

  // Mutation for subscription
  const mutation = useMutation({
    mutationFn: async (planId) => {
      const response = await axios.post(
        `${BASE_URL}/user-subscription/subscribe`,
        { planId, type: "once" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(`${BASE_URL}/business-subscriptions`);
      queryClient.invalidateQueries(`${BASE_URL}/subscription/plan`);

      toast({
        title: "Subscription Successful",
        description: "You have successfully subscribed to the plan. Proceed to payment.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      if (data?.data?.authorization_url) {
        router.push(data.data.authorization_url);
      }
    },
    onError: (error) => {
      toast({
        title: "Subscription Failed",
        description: error?.response?.data?.message || "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (planId) => {
    setSelectedPlanId(planId);
    mutation.mutate(planId);
  };

  if (plansLoading || userPlanLoading) {
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

      {/* Current Plan */}
      <div className="flex flex-col gap-5">
        <h1 className="text-[18px] font-[600]">Current Plan</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Card className="drop-shadow-lg">
            <div className="flex flex-col gap-6 p-5">
              <div className="flex justify-between items-center">
                <p>Monthly plan</p>
                {userPlan?.data?.isActive ? (
                  <div className="text-[16px] text-[#388364] font-[700] flex items-center">
                    <LuDot size={30} /> Active
                  </div>
                ) : (
                  <span className="text-[16px] text-red-600 font-[700] flex items-center">
                    <LuDot size={30} /> Inactive
                  </span>
                )}
              </div>
              <span className="text-[20px] font-[700]">
                ₦ {userPlan?.data?.subscriptionPlan?.price || "-"} /month
              </span>
            </div>
          </Card>
          <Card className="drop-shadow-lg">
            <div className="flex flex-col gap-6 p-5">
              <p>Renew at</p>
              <span className="text-[20px] font-[700]">
                {userPlan?.data?.renewalDate || "-"}
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="flex flex-col gap-5">
        <h1 className="text-[18px] font-[600]">Subscription plans</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {plans?.data?.map((plan) => (
            <Card className="bg-black text-white mx-5 lg:mx-0" key={plan._id}>
              <div className="flex flex-col gap-6 p-5">
                <div className="flex flex-col">
                  <p>{plan.plan}</p>
                  <div className="text-[16px] text-[#FFF8F8] font-[500] flex gap-1 items-center">
                    <span className="text-[36px] font-[600]">₦ {plan.price}</span>/month
                  </div>
                </div>
                <div className="text-[16px]">
                  <p className="text-[16px] font-[600] mb-5">For individuals:</p>
                  <div className="flex flex-col gap-5">
                    {plan?.details?.map((detail, index) => (
                      <div className="flex gap-3 items-center" key={index}>
                        <IoMdCheckmarkCircle /> {detail}
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  onClick={() => handleSubmit(plan._id)}
                  className="flex mt-auto bg-white border border-black text-black text-[14px] hover:bg-white"
                >
                  {mutation.isPending && selectedPlanId === plan._id ? (
                    <ClipLoader size={20} />
                  ) : (
                    "Choose subscription"
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Subscription };
