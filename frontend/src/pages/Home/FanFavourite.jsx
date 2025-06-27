// 📁 src/components/FanFavourites.jsx

import React from "react";
import "../../../index.css"; // Custom global styles (used for no-scrollbar)
import captainMarvel from "../../../assets/Images/captainMarvel.png"; // Example comic image
import { comics } from "../../constants/fanfav"; // Comic data

const FanFavourites = () => {
  return (
    <div className="w-full px-4 md:px-12 py-16 my-8 ">
      {/* Top section with title and link */}
      <div className="flex justify-between items-center mb-10 px-2 md:px-20 md:mx-30">
        <h2 className="text-lg sm:text-xl md:text-3xl font-bold tracking-wide">
          FAN FAVOURITES
        </h2>
        <a
          href="#"
          className="text-red-600 text-sm md:text-base font-semibold"
        >
          VIEW ALL &gt;
        </a>
      </div>

      {/* Scrollable section with comic cards */}
      <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar  md:mx-50">
        {comics.map((comic) => (
          <div
            key={comic.id}
            className="flex-shrink-0
              w-[70%] sm:w-[45%] md:w-[30%] lg:w-[20%] 
              min-w-[70%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[20%] 
              max-w-[70%] sm:max-w-[45%] md:max-w-[30%] lg:max-w-[20%]"
          >
            {/* Comic Image */}
            <img
              src={captainMarvel}
              alt={comic.title}
              className="w-full h-[300px] md:h-[400px] object-cover shadow-lg rounded"
            />

            {/* Comic Title */}
            <h3 className="mt-2 text-sm md:text-base font-semibold truncate">
              {comic.title}
            </h3>

            {/* Comic Creator */}
            <p className="text-xs md:text-sm text-gray-600 truncate">
              {comic.creator}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanFavourites;
