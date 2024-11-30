"use client";
import { useEffect, useRef } from "react";

const HeaderWithMarquee = () => {
  return (
    <div className="w-full bg-red-600 text-white py-2">
    <div className="overflow-hidden">
      <div className="whitespace-nowrap animate-marquee">
        <span className="px-4 text-l font-extrabold">
        Register as a seller today and enjoy a 60-days free subscription. Explore exclusive deals, discover exciting local products, and be part of the futamart revolution!
        </span>
      </div>
    </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HeaderWithMarquee;
