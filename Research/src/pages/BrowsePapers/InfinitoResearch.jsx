import React, { useState, useEffect } from "react";
import research from "../../../assets/Images/ResearchPaper/ResearchImg.png";
import infinito from "../../../assets/Images/ResearchPaper/InfinitoImg.png";
import CarouselShimmer from "./Shimmer/CarouselShimmer";

const InfinitoCarousel = ({ researchPaper, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (researchPaper.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % researchPaper.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [researchPaper]);

  if (isLoading) return <CarouselShimmer />;
  if (researchPaper.length === 0) return null;

  return (
    <div className="bg-gray-100 w-full flex justify-center items-start">
      <div className="relative w-full h-[380px] bg-black mt-28 mb-12 text-white flex items-center justify-center">
        {/* Left branding */}
        <div className="w-2/3 pt-32">
          <div className="flex items-center ml-[-4px] gap-2 mb-2">
            <img src={infinito} alt="Infinito" className="h-16" />
            <img src={research} alt="Research" className="h-10" />
          </div>
          <p className="text-sm text-[14px] max-w-md">
            One day Spiderman ate a spider, he choked on it, he died. You think that’s the end. NAAAAH!!!
          </p>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
            {researchPaper.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-1 rounded-full ${
                  index === currentIndex ? "bg-[#FF0000]" : "bg-white"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Right carousel card */}
        <div className="absolute right-70 w-[450px] h-[452px] z-50 mb-6 bg-white text-black shadow-xl py-12 px-10">
          <h2 className="text-[30px] font-bold my-2 mb-1 line-clamp-2">
            {researchPaper[currentIndex].title}
          </h2>
          <p className="text-[#515151] text-[22px] mb-3 my-2">
            {researchPaper[currentIndex].authors?.join(", ")}
          </p>
          <div className="border-l-4 border-[#BAB7B7] pl-3 my-2 text-sm text-gray-800 mb-4 line-clamp-5">
            {researchPaper[currentIndex].abstract}
          </div>
          <button className="border-2 h-[42px] w-[150px] text-[#202020] border-[#202020] my-2 px-4 py-1.5 font-semibold text-[12px] hover:bg-black hover:text-white transition">
            VIEW PAPER ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfinitoCarousel;
