import { RiVerifiedBadgeFill } from "react-icons/ri";
import { VscUnverified } from "react-icons/vsc";
import { FaStar } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const SellerProfile = ({
  sellerName,
  sellerProfileImage,
  businessDetails,
  isVerified,
}) => {
  const details = businessDetails.split(",").reduce((acc, detail) => {
    const [key, ...valueParts] = detail.split(":");
    const value = valueParts.join(":").trim(); 
    if (key && value) {
      acc[key.trim()] = value; 
    }
    return acc;
  }, {});

  // Extract and format the Joined date
  const joinedDate = details["Joined"]
    ? new Date(details["Joined"]).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="flex relative items-start space-y-4 sm:space-y-0 sm:space-x-[80px] mb-10">
      <img
        src={sellerProfileImage}
        alt={sellerName}
        className="rounded-full h-24 w-24 sm:h-24 sm:w-24 md:h-48 md:w-48 lg:h-48 lg:w-48 mr-5 sm:mt-3 lg:mt-0 object-cover"
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-medium">{sellerName}</h1>
          {isVerified ? (
            <div className="tooltip" title="Seller is verified">
              <RiVerifiedBadgeFill className="text-blue-500 text-[20px] sm:text-[30px]" />
            </div>
          ) : (
            <div className="tooltip" title="Seller is not verified">
              <VscUnverified className="text-red-500 text-[20px] sm:text-[30px]" />
            </div>
          )}

          <div className="flex items-center gap-3 absolute bottom-0 left-0 w-full sm:relative sm:left-[10rem] sm:bottom-[20rem] lg:static lg:w-auto lg:left-auto lg:bottom-auto hidden sm:flex">
            <Link
              href=""
              className="text-black font-medium rounded-[5px] px-3 py-1"
              style={{ backgroundColor: "#DADADA" }}
            >
              Message
            </Link>
            <FaStar
              className="text-[30px] p-1 rounded-[5px]"
              style={{ backgroundColor: "#DADADA" }}
            />
          </div>
        </div>

        <div className="text-sm text-gray-700">
          <p className="pb-[8px]">{details["Description"] || "N/A"}</p>
          <p className="pb-[8px]">
            <span className="font-semibold">Joined:</span>{" "}
            {joinedDate}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {details["Email"] || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
