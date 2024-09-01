import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import React from 'react';
import Link from "next/link";
import { StarRating } from "./rating";

const SellerProfile = ({ sellerName, sellerProfileImage, businessDetails }) => {

  const details = businessDetails.split(', ').reduce((acc, detail) => {
    const [key, value] = detail.split(': ');
    acc[key] = value;
    return acc;
  }, {});

  return (
    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-[80px] mb-10">
      <img 
        src={sellerProfileImage} 
        alt={sellerName} 
        className="rounded-full w-48 h-48 object-cover" 
      />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{sellerName}</h1>
          <RiVerifiedBadgeFill className="text-[30px]" />
          <Link href="" className="text-black font-medium rounded-[5px] px-3 py-1" style={{ backgroundColor: '#DADADA' }}>
            Message
          </Link>
          <FaStar className="text-[30px] p-1 rounded-[5px]" style={{ backgroundColor: '#DADADA' }} />
        </div>

        <div className="flex items-center gap-2">
          <p className="font-medium">
            Customer rating: <span className="font-medium">Very good</span>
            <StarRating rating="5" width={18} height={18} />
          </p>
        </div>

        <div className="text-sm text-gray-700">
          <p><span className="font-semibold">Address:</span> {details['Address'] || 'N/A'}</p>
          <p><span className="font-semibold">Contact:</span> {details['Contact'] || 'N/A'}</p>
          <p><span className="font-semibold">Email:</span> {details['Email'] || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
