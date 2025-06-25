// 📁 src/components/FanArtSpotlight.jsx
import React from "react";
import post from '../../../assets/Images/Community/post.png';
import fanartimg1 from "../../../assets/Images/Community/fanartimg1.png";
import fanartimg2 from "../../../assets/Images/Community/fanartimg2.png";
import { Heart } from 'lucide-react';

// Dummy fan art data
const artworks = [
  {
    artist: "Artist Name",
    image: post,        // Fan art image
    likes: "2.5k",
  },
  {
    artist: "Artist Name",
    image: fanartimg1,  // Fan art image
    likes: "2.5k",
  },
  {
    artist: "Artist Name",
    image: fanartimg2,  // Fan art image
    likes: "2.5k",
  },
];

const FanArtSpotlight = () => {
  return (
    <div className="w-full px-4 md:px-10 lg:px-20 py-10">
      
      {/* Section heading with responsive spacing */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 mx-4 sm:mx-10 lg:mx-40 space-y-4 sm:space-y-0">
        <h2 className="font-sans font-extrabold text-xl sm:text-4xl tracking-wide scale-y-100 uppercase text-center sm:text-left">
          FAN ART SPOTLIGHT
        </h2>

        {/* Link to view all fan arts */}
        <a
          href="#"
          className="text-md tracking-widest text-red-600 uppercase font-semibold hover:underline"
        >
          View All &nbsp; &rsaquo;
        </a>
      </div>

      {/* Grid displaying artwork cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-4 sm:mx-10 lg:mx-40">
        {artworks.map((art, index) => (
          <div key={index} className="flex flex-col">
            
            {/* Fan art image container */}
            <div className="w-full h-[300px] overflow-hidden">
              <img
                src={art.image}
                alt={`Artwork by ${art.artist}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Artist name and like count */}
            <div className="flex justify-between items-center mt-2 text-xl">
              <p className="text-black font-medium px-1">{art.artist}</p>
              <div className="flex items-center space-x-1 text-gray-800 px-1">
                <Heart size={16} className="inline-block" />
                <span>{art.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanArtSpotlight;
