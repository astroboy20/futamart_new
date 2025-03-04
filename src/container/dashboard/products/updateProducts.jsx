"use client";
import { GalleryIcon, NotificationIconX } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BASE_URL, useFetchItems } from "@/hooks/useFetchItems";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker } from "@/components/date-picker";
import { Switch } from "@/components/ui/switch";

const UpdateProducts = ({ onClose, product }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  const { data } = useFetchItems({ url: `${BASE_URL}/categories` });
  const categoriesData = data?.data;
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name || "",
    category: product.category.name || "",
    price: product.price || "",
    featuredImage: product.featuredImage || null,
    discountPercentage: "",
    discountPrice: "",
    isOnDiscount: false,
    discountStartDate: "",
    discountEndDate: "",
  });

  //final price logic
  useEffect(() => {
    const price = parseFloat(formData.price);
    const discountPercentage = parseFloat(formData.discountPercentage);

    if (!isNaN(price) && !isNaN(discountPercentage)) {
      const discountAmount = (price * discountPercentage) / 100;
      const discountPrice = price - discountAmount;

      if (discountPrice < 0) {
        toast({
          title: "Warning",
          description:
            "Discount percentage is too high, leading to a negative price!",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        setFormData((prev) => ({
          ...prev,
          discountPercentage: "0",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        discountPrice: discountPrice.toFixed(2),
      }));
    }
  }, [formData.price, formData.discountPercentage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle featured image upload and preview
  const handleFeaturedChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        featuredImage: file,
      }));
    }
  };

  //category
  const handleSelectChange = (value) => {
    // console.log("Selected Category Value:", value);
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  //discount start date
  const handleStartDateChange = (newDate) => {
    const selectedStartDate = new Date(newDate);

    setFormData((prevData) => ({
      ...prevData,
      discountStartDate: selectedStartDate,
    }));
  };

  //discount end date
  const handleEndDateChange = (newDate) => {
    const selectedStartDate = new Date(formData.discountStartDate);
    const selectedEndDate = new Date(newDate);

    if (selectedEndDate < selectedStartDate) {
      setEndDate("");
      setFormData((prevData) => ({
        ...prevData,
        discountEndDate: "",
      }));
      toast({
        title: "Invalid End Date",
        description: "End date must be after the start date.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      discountEndDate: selectedEndDate,
    }));
  };

  //discount switch
  const handleSwitch = () => {
    setIsChecked((prev) => {
      const newIschecked = !prev;
      setFormData((prevData) => ({
        ...prevData,
        isOnDiscount: newIschecked,
      }));
      return newIschecked;
    });
  };
  const mutation = useMutation({
    mutationFn: async (submissionData) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/product/${product._id}`,
          submissionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("Something went wrong!", error?.response?.data);
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries([`${BASE_URL}/products/user`]);
      toast({
        title: "Product Uploaded",
        description: response.data?.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "There was an error uploading the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validation
    const { name, category, price, featuredImage } = formData;

    const missingFields = [];
    if (!name) missingFields.push("Product Name");
    if (!category) missingFields.push("Category");
    if (!price) missingFields.push("Price");
    if (!featuredImage) missingFields.push("Featured Image");

    if (missingFields.length > 0) {
      toast({
        title: "Missing Fields",
        description: `Please fill in the following: ${missingFields.join(
          ", "
        )}.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    // Prepare formData for submission
    const submissionData = new FormData();
    submissionData.append("name", name);
    submissionData.append("category", category);
    submissionData.append("price", price);
    submissionData.append("featuredImage", featuredImage);

    try {
      await mutation.mutateAsync(submissionData);
      onClose();
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-3 lg:p-5 w-full mt-10">
      <div className="flex justify-between items-center lg:items-start">
        <h1 className="underline text-[24px] font-[600]">Update Products</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div className="h-fit text-black rounded-[16px] flex flex-col gap-10">
          <p className="text-[16px] font-[600]">Upload Product Image</p>

          <div className="w-auto h-[320px] border border-black border-dashed rounded-[8px] flex justify-center items-center">
            {formData.featuredImage &&
            formData.featuredImage instanceof File ? (
              <img
                src={URL.createObjectURL(formData.featuredImage)}
                className="w-full h-full object-cover"
                alt="New Featured"
              />
            ) : (
              <img
                src={formData.featuredImage || product.featuredImage}
                className="w-full h-full object-cover"
                alt="Existing Featured"
              />
            )}
          </div>

          <div className="m-auto w-fit">
            <input
              type="file"
              onChange={handleFeaturedChange}
              id="upload"
              className="hidden"
            />
            <label
              htmlFor="upload"
              className="flex flex-col gap-5 cursor-pointer text-center"
            >
              <span className="text-black font-bold underline ">
                Change Image
              </span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Product Name</label>
            <Input
              className="h-[55px]"
              placeholder="Dr Martens Loafers"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Category</label>
            <Select
              onValueChange={handleSelectChange}
              defaultValue={product.category._id}
              name="category"
            >
              <SelectTrigger className="w-full h-[55px] z-50 relative">
                <SelectValue placeholder="Select Category">
                  {formData.category
                    ? categoriesData?.find((c) => c._id === formData.category)
                        ?.name
                    : product.category.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-[10000]" portal>
                {categoriesData?.map((data) => (
                  <SelectItem value={data._id} key={data._id}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Product Price</label>
            <Input
              className="h-[55px]"
              placeholder="#5000"
              value={formData.price}
              name="price"
              onChange={handleChange}
            />

            <div className="flex gap-2 items-center mt-2">
              <Switch
                checked={isChecked}
                onCheckedChange={handleSwitch}
                aria-readonly
                id="discount"
              />{" "}
              <label htmlFor="discount" className="text-[16px] font-[500]">
                Add Discount Bonus
              </label>
            </div>
          </div>

          {isChecked && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <label className="text-[16px] font-[500] ">Discount %</label>
                <Input
                  placeholder="15%"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className="h-[55px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                  <label className="text-[16px] font-[500]">Start Date </label>
                  <DatePicker
                    selectedDate={formData.discountStartDate}
                    onDateChange={handleStartDateChange}
                    minDate={new Date()}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <label className="text-[16px] font-[500]">End Date </label>

                  <DatePicker
                    selectedDate={formData.discountEndDate}
                    onDateChange={handleEndDateChange}
                    minDate={new Date()}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <label className="text-[16px] font-[500] ">Final Price</label>
                <Input
                  placeholder="Discount Price"
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  className="h-[55px]"
                  readOnly
                />
              </div>
            </div>
          )}

          <div className="lg:ml-auto">
            <Button
              onClick={handleSubmit}
              className="rounded-[4px] w-full lg:w-fit h-[55px]"
            >
              {isLoading ? <ClipLoader color="white" /> : "Update Products"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export { UpdateProducts };
