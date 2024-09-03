"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";



const SellerRefForm = ({ nextStep }) => {
  const [businessData, setBusinessData] = useState({
    businessName: "",
    category: "",
    address: "",
    contact: "",
    email: "",
  });
  const [logo, setLogo] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [valid, setValid] = useState(true);
  const toast = useToast(); 

  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files ? files[0] : null;
      if (file) {
        setLoading(true); 
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "futamart");

        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dm42ixhsz/image/upload",
            formData
          );
          setLogo(response.data.secure_url); 

         
          toast({
            title: "Upload Successful",
            description: "Your logo has been uploaded successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (err) {
          console.error("Upload failed:", err);
        } finally {
          setLoading(false); 
        }
      }
    } else {
      setBusinessData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validation =
    !businessData.address ||
    !businessData.category ||
    !businessData.businessName ||
    !businessData.email ||
    !businessData.contact ||
    !logo; 

  const handleSubmit = (e) => {
    e.preventDefault();
    typeof window != "undefined" &&
      localStorage.setItem(
        "businessData",
        JSON.stringify({ ...businessData, logo })
      );
    console.log("Business Data:", { ...businessData, logo });
    nextStep();
  };

  return (
    <div className="flex flex-col gap-4 my-4">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business name
          </FormLabel>
          <Input
            name="businessName"
            value={businessData.businessName}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            boxShadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
          />
        </FormControl>
        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business Email
          </FormLabel>
          <Input
            name="email"
            type="email"
            value={businessData.email}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            boxShadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business contact
          </FormLabel>
          <Input
            name="contact"
            value={businessData.contact}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            boxShadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder=""
          />
        </FormControl>

        <FormControl>
          <FormLabel fontSize={{ base: "16px", lg: "18px" }}>
            Business address
          </FormLabel>
          <Input
            name="address"
            value={businessData.address}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            boxShadow={"0px 0px 0px 1px #CDD1DC"}
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
            boxShadow={"0px 0px 0px 1px #CDD1DC"}
            name="category"
            value={businessData.category}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Electronics & Gadget">Electronics & Gadget</option>
            <option value="Fashion & Clothing">Fashion & Clothing</option>
            <option value="Beauty & Skincare">Beauty & Skincare</option>
            <option value="Hair Products">Hair Products</option>
            <option value="Footwears">Footwears</option>
            <option value="Others">Others</option>
          </Select>
        </FormControl>

        <FormControl display={"flex"} flexDirection={"column"} gap={"16px"}>
          <div className="text-[16px] sm:text-[18px] font-medium">
            Business Logo
          </div>
          <div className="border-2 p-3 rounded-lg w-full">
            {loading ? (
              <Spinner color="black" />
            ) : (
              <label
                htmlFor="logo"
                className="flex items-center gap-2 cursor-pointer"
              >
                <IoIosAddCircle size={30} /> Choose Logo
              </label>
            )}
            <input
              className="hidden"
              type="file"
              id="logo"
              name="logo"
              onChange={handleChange}
            />
          </div>
        </FormControl>

        <Button
          disabled={validation}
          className="bg-[#000000] text-[#FFFFFF] p-3 w-full my-5 shadow-sm rounded-[8px] md:text-[18px] sm:leading-[29.26px] h-[50px]"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export { SellerRefForm };
