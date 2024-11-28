// components/CustomCarousel.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const carouselItems = [
  {
    title: 'Business Registration',
    description: 'Own a business? Register on futamart and reach more customers!',
    imageSrc: '/register.png',
  },
  {
    title: 'Buyer Accessibility',
    description: 'Find what you need easily! Explore a wide range of products anytime, anywhere.',
    imageSrc: '/buyer (2).png',
  },
  {
    title: 'Reviews and Ratings',
    description: 'Buy with confidence! Check ratings and reviews before making a purchase.',
    imageSrc: '/buyer (1).png',
  },
];

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between bg-yellow-100 p-8 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-1s">
        <div className="max-w-md animate__animated animate__fadeInUp">
          <h2 className="text-2xl font-bold text-gray-800">{carouselItems[currentIndex].title}</h2>
          <p className="text-gray-600 mt-2">{carouselItems[currentIndex].description}</p>
          
        </div>
        <div className="flex-shrink-0 animate__animated animate__bounceIn">
          <Image
            src={carouselItems[currentIndex].imageSrc}
            alt={carouselItems[currentIndex].title}
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Manual Navigation Buttons */}
      {/* <div className="absolute top-1/2 left-0 transform -translate-y-1/2 hidden md:block">
        <button
          className="bg-white text-black p-2 rounded-full shadow-lg border"
          onClick={goToPrevious}
        >
          <FaArrowLeft />
        </button>
      </div>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden md:block">
        <button
          className="bg-white text-black p-2 rounded-full shadow-lg border"
          onClick={goToNext}
        >
          <FaArrowRight />
        </button>
      </div> */}
    </div>
  );
};

export default CustomCarousel;
