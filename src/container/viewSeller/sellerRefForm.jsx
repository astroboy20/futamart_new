import { Button } from "@/components/ui/button";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";

const SellerRefForm = ({nextStep}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col gap-4 my-4 px-[5%]">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Full name
          </FormLabel>
          <Input
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business name
          </FormLabel>
          <Input
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
            name="business name"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business contact
          </FormLabel>
          <Input
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
            name="business contact"
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business address
          </FormLabel>
          <Input
            size={"lg"}
            width={"100%"}
            box-shadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
            name="business address"
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
            placeholder="Select option"
            name="business category"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
        <Button
          onClick={nextStep}
          className="bg-[#000000] text-[#FFFFFF] p-3 w-full my-5 shadow-sm rounded-[8px] md:text-[20px] sm:leading-[29.26px]"
          type="submit"
        >
          Continue
        </Button>
      </form>
      {/* <Button   
            size={"lg"}
            width={"100%"}
            background={"#1a1a1a"}
            borderRadius={"16px"}
            fontSize={{ base: "16px", lg: "16px" }}
            fontWeight={"700"}
            color={"#fff"}
            my={5}
          >
            Continue
          </Button> */}
    </div>
  );
};

export default SellerRefForm;
