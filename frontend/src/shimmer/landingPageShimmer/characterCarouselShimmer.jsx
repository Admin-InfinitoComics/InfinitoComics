// 📁 src/components/CharacterCarouselShimmer.jsx
import React from "react";

const CharacterCarouselShimmer = () => {
  return (
    <div className="w-full px-4 py-12 bg-white animate-pulse">
      <div className="max-w-full mx-5 md:mx-60">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="w-64 h-6 bg-gray-300 rounded"></div>
          <div className="w-24 h-5 bg-gray-300 rounded"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left arrow */}
          <div className="absolute -left-4 md:-left-8 top-1/2 transform -translate-y-1/2 bg-white border p-3 z-10 shadow-md w-10 h-10 rounded"></div>

          {/* Character Card Shimmers */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 px-4 md:px-8"
          >
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center justify-between h-[300px] md:h-[400px] w-full max-w-[280px] mx-auto"
              >
                <div className="absolute bottom-0 w-full h-[65%] bg-gray-200 transform -skew-y-6 mb-3"></div>
                <div className="h-[200px] md:h-[320px] w-full bg-gray-300 rounded relative z-10"></div>
                <div className="w-full py-3 bg-gray-400 rounded relative z-10"></div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <div className="absolute -right-4 md:-right-8 top-1/2 transform -translate-y-1/2 bg-white border p-3 z-10 shadow-md w-10 h-10 rounded"></div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-2 rounded-full bg-gray-300 border border-black"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterCarouselShimmer;
