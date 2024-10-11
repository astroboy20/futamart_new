"use client";

import { Header } from "@/components/headers/header";
import { useState, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { ClipLoader } from "react-spinners";
import { useToast } from "@chakra-ui/react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    formData.append("timestamp", Math.floor(Date.now() / 1000));
    formData.append("signature", process.env.NEXT_PUBLIC_CLOUDINARY_SIGNATURE);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let profileImageUrl = profile.profile_image;

    if (profile.profile_image && profile.profile_image.startsWith("data:")) {
      const file = await fetch(profile.profile_image).then((r) => r.blob());
      profileImageUrl = await uploadImageToCloudinary(file);
    }

    const updatedProfile = { ...profile, profile_image: profileImageUrl };

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update profile");
        setLoading(false);
        toast({
          title: "Error",
          description: result?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setLoading(false);

      toast({
        title: "Success",
        description: result?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      console.log("Updated Profile data:", updatedProfile);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profile_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main>
      <Header />
      <div className="content-center w-full h-full">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          <div className="flex justify-center mb-6">
            <label
              htmlFor="profileImageInput"
              className="border-2 border-black aspect-square flex content-center rounded-full cursor-pointer overflow-hidden w-1/2"
            >
              <Image
                src={profile?.profile_image || "/images/futamart.png"}
                alt="Profile picture"
                width={100}
                height={100}
                className="cursor-pointer w-full"
              />
            </label>
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="firstname"
                className="block text-base font-semibold text-gray-700"
              >
                First name
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                value={profile?.firstname}
                onChange={handleChange}
                style={{
                  boxShadow: "2px 2px 4px 0px #0000001F inset",
                  border: "0.2px solid #00000099",
                  borderRadius: "5px",
                }}
                className="mt-1 block w-full px-4 p-2 bg-[#F2F3F466] "
              />
            </div>
            <div>
              <label
                htmlFor="middlename"
                className="block text-base font-semibold text-gray-700"
              >
                Middle name
              </label>
              <input
                id="middlename"
                name="middlename"
                type="text"
                value={profile?.middlename}
                onChange={handleChange}
                style={{
                  boxShadow: "2px 2px 4px 0px #0000001F inset",
                  border: "0.2px solid #00000099",
                  borderRadius: "5px",
                }}
                className="mt-1 block w-full px-4 p-2 bg-[#F2F3F466] "
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-base font-semibold text-gray-700"
              >
                Last name
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                value={profile?.lastname}
                onChange={handleChange}
                style={{
                  boxShadow: "2px 2px 4px 0px #0000001F inset",
                  border: "0.2px solid #00000099",
                  borderRadius: "5px",
                }}
                className="mt-1 block w-full px-4 p-2 bg-[#F2F3F466] "
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile?.email}
                onChange={handleChange}
                style={{
                  boxShadow: "2px 2px 4px 0px #0000001F inset",
                  border: "0.2px solid #00000099",
                  borderRadius: "5px",
                }}
                className="mt-1 block w-full px-4 p-2 bg-[#F2F3F466] "
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-base font-semibold text-gray-700"
              >
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={profile?.role.name}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 px-4 p-2 shadow-sm bg-gray-100"
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                disabled={loading}
                type="submit"
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? <ClipLoader color="white" /> : "Save profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
