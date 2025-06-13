import React from 'react'
import image from '../../../assets/Images/quick-vision.png' // Adjust the path as necessary
const temp2 = () => {
     return (
    <div
      className="w-full min-h-[600px] md:min-h-[550px] bg-black text-white relative overflow-hidden bg-cover bg-no-repeat bg-center"
      style={{ 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Add overlay div */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="flex flex-col-reverse md:flex-row items-center justify-between mx-[10%] px-6 py-12 md:py-20 gap-8 relative z-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-16">
          <p className="uppercase text-md font-bold tracking-widest text-white mb-2">
            Character Spotlight
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4 tracking-widest">
            QUICK VISION
          </h1>
          <p className="text-white mb-6 w-3/4 md:w-2/3">
            A moody Mumbai street surfer with custom weapons, fog-cutting vision, and a speed-boosting ride—meet the rogue who upgrades on the fly and never plays by the rules.
          </p>
          <button className="border border-white px-6 py-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all">
            Know More ›
          </button>
        </div>


      </div>
    </div>
  );
}

export default temp2

