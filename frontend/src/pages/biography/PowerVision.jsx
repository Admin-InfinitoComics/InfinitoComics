import React, { useState } from "react";

// Example images (replace with your own PNGs)
const powers = [
  {
    title: "VISION",
    desc: [
      "Able to customize and upgrade his weapons and tools to next level, speed booster device, ability to see clearly in smoke and fog",
      "Able to customize and upgrade his weapons and tools to next level, speed booster device, ability to see clearly in smoke and fog",
    ],
    img: "/images/vision.png", // <-- replace with your PNG path
  },
  {
    title: "SPEED",
    desc: [
      "Superhuman speed, can dodge bullets, and move faster than the eye can see.",
      "Enhanced reflexes and agility, can run up walls and across water.",
    ],
    img: "/images/speed.png",
  },
  {
    title: "STRENGTH",
    desc: [
      "Unmatched strength, can lift cars and break through walls.",
      "Resistant to physical damage, can withstand heavy impacts.",
    ],
    img: "/images/strength.png",
  },
];

export default function PowersTabs() {
  const [active, setActive] = useState(0);

  return (
    <div className="relative bg-[#181717] overflow-hidden">
      {/* Torn paper effect (top & bottom) */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[url('/images/torn-top.png')] bg-repeat-x z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-8 bg-[url('/images/torn-bottom.png')] bg-repeat-x z-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch max-w-6xl mx-auto py-16 px-4 md:px-8">
        {/* Left: Tabs & Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-white text-2xl md:text-3xl font-normal mb-2">POWERS</h2>
          <h3 className="text-[#a18afc] text-5xl md:text-6xl font-extrabold tracking-widest mb-4">
            {powers[active].title}
          </h3>
          {powers[active].desc.map((d, i) => (
            <p key={i} className="text-white mb-2">{d}</p>
          ))}

          {/* Tabs */}
          <div className="flex mt-8 space-x-8">
            {powers.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`pb-1 text-base font-semibold transition-colors ${
                  active === i
                    ? "text-[#a18afc] border-b-2 border-[#a18afc]"
                    : "text-white/70 border-b-2 border-white/20"
                }`}
              >
                POWER {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative mt-12 md:mt-0">
          <img
            src={powers[active].img}
            alt={powers[active].title}
            className="w-[320px] md:w-[420px] lg:w-[500px] object-contain drop-shadow-2xl
              md:absolute md:right-[-80px] md:top-1/2 md:-translate-y-1/2
              z-30
              transition-all duration-500
              "
            style={{
              // 3D effect: pop out on desktop
              filter: "drop-shadow(0 12px 32px #a18afc88)",
            }}
          />
        </div>
      </div>
    </div>
  );
}