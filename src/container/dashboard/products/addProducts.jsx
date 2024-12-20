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
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/date-picker";

const AddProducts = ({ onClose }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  const { data } = useFetchItems({ url: `${BASE_URL}/categories` });
  const categoriesData = data?.data;
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    attributes: [{ name: "", variants: [] }],
    featuredImage: null,
    additionalImages: [],
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

  //handle change logic
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

  // Handle additional images upload and preview
  const handleAdditionalImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.additionalImages.length + files.length > 5) {
      toast({
        title: "Limit Reached",
        description: "You can only add up to 5 images.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      additionalImages: [...prevData.additionalImages, ...files],
    }));
  };

  //category
  const handleSelectChange = (value) => {
    // console.log("Selected Category Value:", value);
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  // Attributes logic
  const handleAddAttribute = () => {
    const hasEmptyAttribute = formData.attributes.some(
      (attr) => !attr.name.trim() || attr.variants.some((v) => !v.trim())
    );

    if (hasEmptyAttribute) {
      toast({
        title: "Incomplete Attribute",
        description:
          "Please fill in the name and variants of all attributes before adding a new one.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      attributes: [...prevData.attributes, { name: "", variants: [""] }],
    }));
  };

  const handleAttributeChange = (index, value) => {
    const updatedAttributes = formData.attributes.map((attr, i) =>
      i === index ? { ...attr, name: value } : attr
    );
    setFormData((prevData) => ({
      ...prevData,
      attributes: updatedAttributes,
    }));
  };

  const handleAddVariant = (attrIndex) => {
    const attribute = formData.attributes[attrIndex];

    if (!attribute.name.trim()) {
      toast({
        title: "Empty Attribute",
        description:
          "Please fill in the attribute name before adding variants.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedAttributes = formData.attributes.map((attr, i) =>
      i === attrIndex ? { ...attr, variants: [...attr.variants, ""] } : attr
    );
    setFormData((prevData) => ({
      ...prevData,
      attributes: updatedAttributes,
    }));
  };

  const handleVariantChange = (attrIndex, variantIndex, value) => {
    const updatedAttributes = formData.attributes.map((attr, i) =>
      i === attrIndex
        ? {
            ...attr,
            variants: attr.variants.map((variant, j) =>
              j === variantIndex ? value : variant
            ),
          }
        : attr
    );
    setFormData((prevData) => ({
      ...prevData,
      attributes: updatedAttributes,
    }));
  };

  const handleDeleteVariant = (attrIndex, variantIndex) => {
    const updatedAttributes = formData.attributes.map((attr, i) =>
      i === attrIndex
        ? {
            ...attr,
            variants: attr.variants.filter((_, j) => j !== variantIndex),
          }
        : attr
    );
    setFormData((prevData) => ({
      ...prevData,
      attributes: updatedAttributes,
    }));
  };

  const handleDeleteAttribute = (attrIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      attributes: prevData.attributes.filter((_, i) => i !== attrIndex),
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
    if (!formData.price || formData.price.trim() === "") {
      toast({
        title: "Warning",
        description: "Please add a price",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      // Reset discount percentage if price is invalid
      setFormData((prev) => ({
        ...prev,
        discountPercentage: "",
        discountPrice: "",
      }));

      return;
    }
    setIsChecked((prev) => {
      const newIschecked = !prev;
      setFormData((prevData) => ({
        ...prevData,
        isOnDiscount: newIschecked,
      }));
      return newIschecked;
    });
  };

  //form mutation
  const mutation = useMutation({
    mutationFn: async (submissionData) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/products`,
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
        throw error;
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries([`${BASE_URL}/products/user`]);
      toast({
        title: "Product Uploaded",
        description: response?.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";

      toast({
        title: "Error",
        description: errorMessage, 
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validation
    const {
      name,
      category,
      price,
      description,
      featuredImage,
      additionalImages,
      attributes,
      discountStartDate,
      discountEndDate,
      discountPrice,
      discountPercentage,
      isOnDiscount,
    } = formData;

    const missingFields = [];
    if (!name) missingFields.push("Product Name");
    if (!category) missingFields.push("Category");
    if (!price) missingFields.push("Price");
    if (!description) missingFields.push("Description");
    // if (!discountEndDate) missingFields.push("Discount EndDate");
    // if (!discountStartDate) missingFields.push("Discount StartDate");
    // if (!discountPrice) missingFields.push("Discount Price");

    // Check for at least one additional image
    if (!additionalImages || additionalImages.length === 0) {
      missingFields.push("At least one Additional Image");
    }

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
    submissionData.append("description", description);
    submissionData.append("featuredImage", featuredImage);
    submissionData.append("discountPrice", discountPrice);
    submissionData.append("isOnDiscount", isOnDiscount);
    submissionData.append("discountStartDate", discountStartDate);
    submissionData.append("discountEndDate", discountEndDate);
    submissionData.append("discountPercentage", discountPercentage);
    additionalImages.forEach((file) => {
      submissionData.append("additionalImages", file);
    });
    submissionData.append("attributes", JSON.stringify(attributes));

    try {
      await mutation.mutateAsync(submissionData);
      // console.log(formData);
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
        <h1 className="underline text-[24px] font-[600]">Add Products</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <div className="h-fit text-black rounded-[16px] flex flex-col gap-10">
          <p className="text-[16px] font-[600]">Upload Product Image</p>
          <div className="w-auto h-[320px] border border-black border-dashed rounded-[8px] flex justify-center items-center">
            {formData.featuredImage ? (
              <img
                src={URL.createObjectURL(formData.featuredImage)}
                className="w-full h-full object-cover"
                alt="Featured"
              />
            ) : (
              <>
                <input
                  className="hidden"
                  type="file"
                  onChange={handleFeaturedChange}
                  id="upload"
                />
                <label
                  htmlFor="upload"
                  className="flex flex-col gap-5 cursor-pointer"
                >
                  <span className="m-auto">
                    <GalleryIcon />
                  </span>
                  <p className="font-[600]">
                    Drop files here or{" "}
                    <span className="underline">browse files</span>
                  </p>
                </label>
              </>
            )}
          </div>

          {/* Additional Images Section */}
          <div className="h-fit text-black rounded-[16px] flex flex-col gap-10">
            <p className="text-[16px] font-[600]">Upload Additional Images</p>
            <div className="grid grid-cols-3 gap-2">
              {formData.additionalImages.map((imgSrc, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(imgSrc)}
                    className="w-full h-[100px] object-cover"
                    alt={`Additional ${index + 1}`}
                  />
                </div>
              ))}

              <div className="flex justify-center items-center border border-dashed border-black h-[100px] cursor-pointer">
                <input
                  className="hidden"
                  type="file"
                  multiple
                  onChange={handleAdditionalImageChange}
                  id="uploadAdditional"
                />
                <label
                  htmlFor="uploadAdditional"
                  className="flex justify-center items-center w-full h-full"
                >
                  <FaPlus className="text-[24px] text-gray-500" />
                </label>
              </div>
            </div>
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
          <div className="z-50 flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Category</label>
            <Select onValueChange={handleSelectChange} name="category">
              <SelectTrigger className="w-full h-[55px] z-50 relative">
                <SelectValue placeholder="Select Category" />
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

          {/* Attribute Management Section */}
          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">
              Attributes{" "}
              <span className="text-sm text-gray-500 mb-4">(Optional)</span>{" "}
            </label>
            <span className="text-sm text-gray-500 mb-2">
              Add product attributes (e.g., Color, Size). Variants (e.g., Black,
              Medium).
            </span>

            {formData.attributes?.map((attr, attrIndex) => (
              <div key={attrIndex} className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 w-full">
                  <Input
                    className="h-[55px]"
                    value={attr.name}
                    onChange={(e) =>
                      handleAttributeChange(attrIndex, e.target.value)
                    }
                    placeholder={`Attribute ${attrIndex + 1}`}
                  />
                  <Button
                    onClick={() => handleDeleteAttribute(attrIndex)}
                    className="bg-red-500 hover:bg-red-700 text-white"
                  >
                    <FaTrash />
                  </Button>
                </div>

                {attr.variants.map((variant, variantIndex) => (
                  <div
                    key={variantIndex}
                    className="flex items-center gap-2 ml-4"
                  >
                    <Input
                      className="h-[40px]"
                      value={variant}
                      onChange={(e) =>
                        handleVariantChange(
                          attrIndex,
                          variantIndex,
                          e.target.value
                        )
                      }
                      placeholder={`Variant ${variantIndex + 1}`}
                    />
                    <Button
                      onClick={() =>
                        handleDeleteVariant(attrIndex, variantIndex)
                      }
                      className="bg-red-500 hover:bg-red-700 text-white h-[40px]"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                ))}

                <Button
                  onClick={() => handleAddVariant(attrIndex)}
                  className="ml-auto w-fit mt-2 h-[40px]"
                >
                  Add Variant
                </Button>
              </div>
            ))}

            <Button onClick={handleAddAttribute}>Add Attribute</Button>
          </div>

          <div className="flex flex-col gap-5">
            <label className="text-[16px] font-[500]">Description</label>
            <Textarea
              placeholder="Enter description..."
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] font-[500]">Product Price</label>
            <Input
              className="h-[55px]"
              placeholder="5000"
              value={formData.price}
              name="price"
              onChange={handleChange}
            />
            <span className="text-sm text-gray-500">
              Please enter a price without commas, hashtags, or other symbols.
            </span>

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
              {isLoading ? <ClipLoader color="white" /> : "Upload Products"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export { AddProducts };
