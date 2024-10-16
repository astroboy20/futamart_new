"use client";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  useToast,
  Textarea,
  FormHelperText,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useFetchItems } from "@/hooks/useFetchItems";
import { IoIosAddCircle } from "react-icons/io";
import { BASE_URL } from "@/hooks/useFetchItems";

const SellerRefForm = ({ nextStep }) => {
  const { data: allCategories } = useFetchItems({
    url: `${BASE_URL}/categories`,
  });

  const categories = Array.isArray(allCategories?.data)
    ? [...allCategories.data]
    : [];

  const [businessData, setBusinessData] = useState({
    businessName: "",
    category: "",
    address: "",
    contact: "",
    email: "",
    description: "",
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
    !businessData.description ||
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
            Business Description
          </FormLabel>
          <Box position="relative" width={{ base: "100%", md: "400px" }}>
            {" "}
          
            <Textarea
              name="description"
              value={businessData.description}
              onChange={handleChange}
              size="lg"
              width={{ base: "100%", md: "175%" }}
              height="150px"
              boxShadow="0px 0px 0px 1px #CDD1DC"
              placeholder="Business description"
              maxLength={200} 
              resize="none" 
            />
            <FormHelperText
              position="absolute"
              bottom="8px"
              left="20px"
              fontSize="sm"
            >
              {`${businessData.description.length}/200 characters`}
            </FormHelperText>
          </Box>
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
            type="number"
            value={businessData.contact}
            onChange={handleChange}
            size={"lg"}
            width={"100%"}
            boxShadow={"0px 0px 0px 1px #CDD1DC"}
            placeholder="+234"
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
            Business Category
          </FormLabel>
          <Select
            size="lg"
            width="100%"
            boxShadow="0px 0px 0px 1px #CDD1DC"
            name="category"
            value={businessData.category}
            onChange={handleChange}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
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
