import React from "react";

export default function CharacterDetail() {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left: Outfit */}
        <div className="md:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 w-full text-left">Outfit</h2>
          <img
            src="https://i.imgur.com/1Q9Z1Zm.png" // Replace with your character image
            alt="Character Outfit"
            className="w-full max-w-3xl h-full object-contain"
            draggable="false"
          />
        </div>
        {/* Right: Storyline */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Storyline</h2>
          <p className="text-base font-normal mb-4">
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.<br />
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.<br />
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.
          </p>
          <img
            src="https://i.imgur.com/6Xy0QkD.png" // Replace with your storyline image
            alt="Storyline"
            className="w-full h-64 object-cover rounded mb-4"
            draggable="false"
          />
          <p className="text-base font-normal">
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.<br />
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.<br />
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.<br />
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.<br />
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.<br />
            He is always doing his own kind of fun surfing in local roads of Mumbai. He is a moody person who can do various types of activities in just a short span of time. He has controlling speed with his own customizable weapons along with his ability booster.
          </p>
        </div>
      </div>
    </div>
  );
}