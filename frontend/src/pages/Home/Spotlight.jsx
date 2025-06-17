import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import spotlightData from '../../constants/spotlight';

const SpotlightRow = () => {
  const [hoveredId, setHoveredId] = useState(1); // Start with the first one

  return (
    <div className="px-4 md:px-16 py-14 bg-white font-dmsans overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-[36px] font-black tracking-widest uppercase mb-10 text-center md:text-left">
          Today's Spotlight
        </h2>

        <div className="flex gap-6 transition-all duration-500 ease-in-out overflow-hidden">
          {spotlightData.map((comic) => {
            const isHovered = hoveredId === comic.id;

            return (
              <div
                key={comic.id}
                className={`relative flex items-start transition-all duration-500 ease-in-out overflow-hidden rounded-md shadow-md bg-white group
                  ${isHovered ? 'w-[783px]' : 'w-[270px]'} h-[406px]`}
                onMouseEnter={() => setHoveredId(comic.id)}
                onMouseLeave={() => {
                  if (comic.id !== 1) setHoveredId(1);
                }}
              >
                {/* Left: Image */}
                <div className="relative shrink-0 h-[406.12px] w-[270px]">
                  <img
                    src={comic.image}
                    alt={comic.title}
                    className="w-[270px] h-full object-cover z-0"
                  />
                </div>

                {/* Right: Hover content */}
                <div
                  className={`transition-opacity duration-500 ease-in-out overflow-hidden ${
                    isHovered ? 'opacity-100 w-[513px] px-8 py-6' : 'opacity-0 w-0 px-0 py-0'
                  } flex flex-col justify-between`}
                >
                  {isHovered && (
                    <>
                      <div>
                        <h3 className="text-[36px] font-bold leading-snug mb-1">{comic.title}</h3>
                        <div className="flex flex-row justify-between">
                          <p className="text-custom-gray uppercase text-[20px]">{comic.authors}</p>
                          <p className="text-gray-400 text-[20px] -mt-2 mb-4 font-normal">
                            {comic.year}
                          </p>
                        </div>
                        <p className="text-gray-700 text-[15px] leading-relaxed font-normal">
                          {comic.description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-4">
                        <button className="border border-black w-[42px] h-[42px] flex items-center justify-center hover:bg-black hover:text-white transition">
                          <Bookmark size={20} />
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-2 text-[14px] font-semibold tracking-wide">
                          READ NOW →
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpotlightRow;
