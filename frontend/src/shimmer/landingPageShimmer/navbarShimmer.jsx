// 📁 src/components/ShimmerHeader.jsx
import React from "react";

const ShimmerHeader = () => {
  return (
    <div className="w-full text-gray-800 bg-white animate-pulse">
      {/* Top Promo Strip */}
      <div className="h-7 sm:h-9 bg-gray-100 shimmer" />

      {/* Header Main */}
      <div className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left: Login Button */}
          <div className="h-8 w-28 sm:w-32 bg-gray-200 rounded shimmer" />

          {/* Center: Logo */}
          <div className="h-10 w-36 sm:w-44 bg-gray-200 rounded shimmer" />

          {/* Right: Button + Search Icon */}
          <div className="flex gap-2 items-center">
            <div className="h-9 w-36 sm:w-44 bg-gray-200 rounded shimmer" />
            <div className="h-9 w-9 bg-gray-200 rounded shimmer" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-3 sm:gap-6 justify-center">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-4 w-16 sm:w-20 lg:w-24 bg-gray-200 rounded shimmer"
              />
            ))}
        </div>
      </div>

      {/* Shimmer Keyframes */}
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -500px 0;
            }
            100% {
              background-position: 500px 0;
            }
          }
          .shimmer {
            background: linear-gradient(
              90deg,
              rgba(243, 244, 246, 0.4) 25%,
              rgba(229, 231, 235, 0.6) 50%,
              rgba(243, 244, 246, 0.4) 75%
            );
            background-size: 1000px 100%;
            animation: shimmer 1.3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ShimmerHeader;
