// 📁 src/shimmer/landingPageShimmer/PremiumPlansShimmer.jsx
import React from "react";

const PremiumPlansShimmer = () => {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center w-full mt-5 p-4 md:p-10 lg:p-16 min-h-[600px] gap-10 overflow-hidden">


      {/* 🟦 ANNUAL PLAN SHIMMER */}
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px]">
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-200 p-5 border border-gray-300 animate-pulse"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 100%)" }}>
          <div className="w-[80px] h-[80px] bg-gray-300 rounded-full mb-4"></div>
          <div className="w-[100px] h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-[80%] h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4 w-full px-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-4 w-full bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
        <div className="w-full h-14 bg-gray-300 mt-1 animate-pulse"
          style={{ clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)" }}></div>
      </div>
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px]">
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-200 p-5 border border-gray-300 animate-pulse"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 100%)" }}>
          <div className="w-[80px] h-[80px] bg-gray-300 rounded-full mb-4"></div>
          <div className="w-[100px] h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-[80%] h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4 w-full px-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-4 w-full bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
        <div className="w-full h-14 bg-gray-300 mt-1 animate-pulse"
          style={{ clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)" }}></div>
      </div>
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px]">
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-200 p-5 border border-gray-300 animate-pulse"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 100%)" }}>
          <div className="w-[80px] h-[80px] bg-gray-300 rounded-full mb-4"></div>
          <div className="w-[100px] h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-[80%] h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4 w-full px-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-4 w-full bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
        <div className="w-full h-14 bg-gray-300 mt-1 animate-pulse"
          style={{ clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)" }}></div>
      </div>
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px]">
        <div className="flex flex-col items-center w-full h-[90%] bg-gray-200 p-5 border border-gray-300 animate-pulse"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 100%)" }}>
          <div className="w-[80px] h-[80px] bg-gray-300 rounded-full mb-4"></div>
          <div className="w-[100px] h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-[80%] h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4 w-full px-4">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-4 w-full bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
        <div className="w-full h-14 bg-gray-300 mt-1 animate-pulse"
          style={{ clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)" }}></div>
      </div>
            

    </div>
  );
};

export default PremiumPlansShimmer;