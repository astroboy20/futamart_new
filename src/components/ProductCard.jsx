
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { StarRating } from './rating';
import { AddToCart } from './addToCart';
import { Fav } from '@/assets'; 

const ProductCard = ({ product }) => {
  return (
    <div className="pb-3 max-w-[180px] cursor-pointer shadow-md bg-[#f2f4f4] sm:max-w-[295px]">
      <Link href={`/products/${product.slug}`}>
        <img
          className="h-[175px] bg-[white] w-[180px] object-contain sm:h-[290px] sm:w-[295px]"
          src={product.image}
          alt={product.name}
          width={295}
          height={290}
        />
      </Link>
      <div className="px-3 pt-[.5em] flex flex-col gap-[.5em]">
        <div className="flex items-center justify-between">
          <Link href={`/products/${product.name}`}>
            <p className="capitalize font-semibold text-[10px] w-[98px] h-[12px] leading-[12.19px] sm:w-[215px] sm:h-[22px] sm:text-[18px] sm:leading-[21.94px] truncate">
              {product.name}
            </p>
          </Link>
          <Fav />
        </div>
        <p className="text-[#888282] text-[8px] leading-[9.75px] w-[70px] h-[10px] sm:w-[105px] sm:h-[20px] sm:text-[16px] sm:leading-[19.5px] truncate">
          {product.price}
        </p>
        <StarRating
          rating="5" // Adjust as per your data structure
          width={10}
          height={10}
        />
        <AddToCart
          id={product.id} // Adjust as per your data structure
          className="bg-black w-[64px] h-[20px] text-[8px] leading-[9.75px] sm:w-[132px] sm:h-[36px] sm:text-[14px] sm:leading-[17.07px] text-white rounded-sm border-none"
        >
          Add to cart
        </AddToCart>
      </div>
    </div>
  );
};

export default ProductCard;

