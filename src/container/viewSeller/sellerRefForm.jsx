import { Button } from "@/components/ui/button";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";

const SellerRefForm = ({ nextStep, businessData, handleChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(businessData)
    nextStep()
  };
  return (
    <div className="flex flex-col gap-4 my-4 ">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business name
          </FormLabel>
          <Input
            name="businessName"
            value={businessData?.businessName}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business contact
          </FormLabel>
          <Input
            name="contact"
            value={businessData?.contact}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business address
          </FormLabel>
          <Input
            name="address"
            value={businessData?.address}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business category
          </FormLabel>
          <Select
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            name="category"
            value={businessData?.category}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select Category
            </option>

            <option value="Food">Food</option>
            <option value="Electronics & Gadget">Electronics & Gadget</option>
            <option value="Fashion & Clothing">Fashion & Clothing </option>
            <option value="Beauty & Skincare">Beauty & Skincare </option>
            <option value="Hair Products">Hair Products </option>
            <option value="Footwears">Footwears </option>
            <option value="Others">Others </option>
          </Select>
        </FormControl>
        <Button
        //   onClick={nextStep}
          className="bg-[#000000] text-[#FFFFFF] p-3 w-full my-5 shadow-sm rounded-[8px] md:text-[18px] sm:leading-[29.26px] h-[50px]"
          type="submit"
        >
          Continue
        </Button>
      </form>
     
    </div>
  );
};

export default SellerRefForm;
