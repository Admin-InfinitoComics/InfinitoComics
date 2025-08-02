import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const characters = [
  {
    id: 1,
    name: "BATTLE BEAST",
    image: "https://i.imgur.com/1.png",
    bg: "bg-cyan-100",
  },
  {
    id: 2,
    name: "KALARI",
    image: "https://i.imgur.com/2.png",
    bg: "bg-pink-100",
  },
  {
    id: 3,
    name: "KALARI",
    image: "https://i.imgur.com/2.png",
    bg: "bg-pink-100",
  },
  {
    id: 4,
    name: "POISON",
    image: "https://i.imgur.com/3.png",
    bg: "bg-gray-100",
  },
  {
    id: 5,
    name: "BULLET",
    image: "https://i.imgur.com/4.png",
    bg: "bg-yellow-100",
  },
  {
    id: 6,
    name: "RIZAL",
    image: "https://i.imgur.com/5.png",
    bg: "bg-pink-200",
  },
  {
    id: 7,
    name: "BULLET",
    image: "https://i.imgur.com/4.png",
    bg: "bg-yellow-100",
  },
  {
    id: 8,
    name: "RIZAL",
    image: "https://i.imgur.com/5.png",
    bg: "bg-pink-200",
  },
  // Add more if you want to test sliding
];



// Responsive slides to show
const getSlidesToShow = () => {
  if (window.innerWidth < 640) return 1; // mobile
  if (window.innerWidth < 1024) return 3; // tablet
  return 5; // desktop
};


const FeaturedCharactersCarousel = () => {
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
      setCurrentGroup(0); // Reset to first group on resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalGroups = Math.ceil(characters.length / slidesToShow);

  const prevGroup = () => setCurrentGroup((prev) => Math.max(prev - 1, 0));
  const nextGroup = () => setCurrentGroup((prev) => Math.min(prev + 1, totalGroups - 1));

  // Get the characters for the current group
  const visibleCharacters = characters.slice(
    currentGroup * slidesToShow,
    currentGroup * slidesToShow + slidesToShow
  );

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col py-4 px-2 sm:py-6 sm:px-0">
      <h2 className="text-xl md:text-2xl font-bold tracking-widest mb-6 mx-4 md:mx-30 lg:mx-50">
        FEATURED CHARACTERS
      </h2>
      <div className="relative w-full">
        <div className="flex items-center mx-2 md:mx-20 lg:mx-40">
          {/* Prev Button */}
          <button
            onClick={prevGroup}
            disabled={currentGroup === 0}
            className="hidden md:block p-2 text-2xl font-bold text-gray-500 hover:text-black disabled:opacity-30"
          >
            &#8592;
          </button>
          {/* Slides */}
          <div className="flex overflow-hidden w-full">
            <div className="flex w-full">
              {visibleCharacters.map((char, idx) => (
                <div
                  key={char.id}
                  className={`px-1 min-w-[120px] sm:px-3 sm:min-w-[180px] flex-1 cursor-pointer`}
                  onClick={() => navigate(`/characters/biography`, { state: char })}
                >
                  <div
                    className={` ${char.bg} flex flex-col items-center justify-end h-80 md:h-96 relative`}
                  >
                    <img
                      src={char.image}
                      alt={char.name}
                      className="h-60 md:h-72 object-contain mx-auto"
                      draggable="false"
                    />
                  </div>
                  <div className="bg-black text-white text-xs md:text-sm font-medium tracking-widest text-center py-3 ">
                    {char.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Next Button */}
          <button
            onClick={nextGroup}
            disabled={currentGroup === totalGroups - 1}
            className="hidden md:block p-2 text-2xl font-bold text-gray-500 hover:text-black disabled:opacity-30"
          >
            &#8594;
          </button>
        </div>
        {/* Mobile Arrows */}
        <div className="flex justify-between mt-4 md:hidden">
          <button
            onClick={prevGroup}
            disabled={currentGroup === 0}
            className="p-2 text-2xl font-bold text-gray-500 hover:text-black disabled:opacity-30"
          >
            &#8592;
          </button>
          <button
            onClick={nextGroup}
            disabled={currentGroup === totalGroups - 1}
            className="p-2 text-2xl font-bold text-gray-500 hover:text-black disabled:opacity-30"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCharactersCarousel;