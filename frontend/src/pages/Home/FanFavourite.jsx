import React from "react";
import "../../../index.css";
import captainMarvel from "../../../assets/Images/captainMarvel.png";

// Static data for comic cards
const comics = [
  {
    id: 1,
    title: "Wolverine (2025) #6",
    creator: "Stan Lee",
    image: "https://i.ibb.co/ftrY63W/captain-marvel.jpg",
  },
  {
    id: 2,
    title: "Wolverine (2025) #6",
    creator: "Stan Lee",
    image: "https://i.ibb.co/mJRDsNv/marvel-red.jpg",
  },
  {
    id: 3,
    title: "Wolverine (2025) #6",
    creator: "Stan Lee",
    image: "https://i.ibb.co/YXscvND/shadow.jpg",
  },
  {
    id: 4,
    title: "Wolverine (2025) #6",
    creator: "Stan Lee",
    image: "https://i.ibb.co/4gCchK8/deadshot.jpg",
  },
  {
    id: 5,
    title: "Wolverine (2025) #6",
    creator: "Universe/ Artist",
    image: "https://i.ibb.co/GTb47f7/quick-ninja.jpg",
  },
  {
    id: 6,
    title: "Wolverine (2025) #6",
    creator: "Universe/ Artist",
    image: "https://i.ibb.co/GTb47f7/quick-ninja.jpg",
  },
  {
    id: 7,
    title: "Wolverine (2025) #6",
    creator: "Universe/ Artist",
    image: "https://i.ibb.co/GTb47f7/quick-ninja.jpg",
  },
];

const FanFavourites = () => {
  return (
    <div className="w-full px-4 md:px-12 py-16 my-8">
      {/* Top heading with title and link */}
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-xl md:text-3xl font-bold tracking-wide">FAN FAVOURITES</h2>
        <a href="#" className="text-red-600 text-sm font-semibold">VIEW ALL &gt;</a>
      </div>

      {/* Horizontally scrollable comic cards section */}
      <div className="flex gap-4 overflow-x-auto mx-auto px-4 md:px-8 scroll-smooth no-scrollbar container">
        {comics.map((comic) => (
          <div
            key={comic.id}
            className="flex-shrink-0 
              w-[70%] sm:w-[40%] md:w-[25%] lg:w-[18%] 
              min-w-[70%] sm:min-w-[40%] md:min-w-[25%] lg:min-w-[18%] 
              max-w-[70%] sm:max-w-[40%] md:max-w-[25%] lg:max-w-[18%]"
          >
            {/* Comic image */}
            <img
              src={captainMarvel}
              alt={comic.title}
              className="w-full h-[400px] object-cover shadow-lg"
            />
            {/* Comic title */}
            <h3 className="mt-2 text-sm font-semibold">{comic.title}</h3>
            {/* Creator name */}
            <p className="text-xs text-gray-600">{comic.creator}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanFavourites;
