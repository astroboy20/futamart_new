"use client"
import React, { useEffect, useState } from "react"; // Added useState and useEffect
import ProductCard from "@/components/ProductCard";
import Cookies from 'js-cookie';

const fetchFavouritedata = async () => {
  try {
    const baseUrl = "https://api.futamart.com";
    const token = Cookies.get("token");
    const response = await fetch(`${baseUrl}/v1/favourite/list`, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result.data.map(item => item.product); 
  } catch (error) {
    console.error("Failed to fetch business data:", error);
    return { products: [] };
  }
};

const Favourite = () => {
  const [exploreProducts, setExploreProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFavouritedata();
        setExploreProducts(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };
    loadData();
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>; 

  return (
    <div className="flex flex-col gap-10 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] lg:text-[35px] font-[600]">
          Favourite Products
        </h1>
      </div>

      <div className="py-3 sm:py-3 sm:px-0 grid grid-cols-2 gap-[15px] md:grid-cols-2 lg:grid-cols-4">
        {exploreProducts.length === 0 ? ( 
          <div>No favourite product added</div> 
        ) : (
          exploreProducts.map((product) => ( 
            <ProductCard
              key={product._id}
              product={{
                slug: product.slug,
                image: product.featuredImage,
                rating: product.averageRating,
                name: product.name,
                price: `${product.price || "0.00"}`,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favourite;
