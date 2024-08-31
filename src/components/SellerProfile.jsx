
import Image from 'next/image';
import React from 'react';

const SellerProfile = ({ sellerName, sellerProfileImage, businessDetails }) => {
  return (
    <div className="flex items-center">
      <img src={sellerProfileImage} alt={sellerName} width={100} height={100} className="rounded-full" />
      <div className="ml-4">
        <h1 className="text-2xl font-bold">{sellerName}</h1>
        <p>{businessDetails}</p>
      </div>
    </div>
  );
};

export default SellerProfile;
