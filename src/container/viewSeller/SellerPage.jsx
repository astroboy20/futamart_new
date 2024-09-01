// src/container/viewseller/sellerpage.jsx
import React from "react";
import ProductCard from "@/components/ProductCard";
import SellerProfile from "@/components/SellerProfile";
const fetchBusinessData = async (collectionName) => {
  try {
    const baseUrl = "https://futamart-backend.onrender.com";
    const response = await fetch(`${baseUrl}/v1/business/${collectionName}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Failed to fetch business data:", error);
    return { business: {}, products: [] };
  }
};

export default async function Page({ params }) {
  const { collectionName } = params || {};

  if (!collectionName) {
    return <div>Error: No collection name provided</div>;
  }

  const data = await fetchBusinessData(collectionName);

  const products = data.product || [];

  return (
    <div className="px-[6%]">
      <div>
        <SellerProfile
          sellerName={data.business.businessName || "N/A"}
          sellerProfileImage={
            data.business.business_logo || "/images/Sample_User_Icon.png"
          }
          businessDetails={`Address: ${
            data.business.business_address || "N/A"
          }, Contact: ${data.business.business_contact || "N/A"}, Email: ${
            data.business.business_email || "N/A"
          }`}
        />

        <div className="py-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  slug: product.slug,
                  image: product.featuredImage,
                  name: product.name,
                  price: `$${product.price || "0.00"}`,
                }}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
