import React from 'react'

const FoundationSection = () => {
  return (
      <div>
      <section className="w-full bg-white py-16">
        {/* Header */}
        <div className="text-left max-w-6xl mx-auto mb-9">
          <h2 className="uppercase tracking-widest font-bold font-['Dharma Gothic E'] text-black text-md md:text-lg">
            Foundation Updates
          </h2>
        </div>

        <div className='relative flex flex-col md:flex-row items-center md:items-stretch'>
        <div className="flex flex-col md:flex-row w-full mx-auto bg-black overflow-hidden md:h-80 realative z-10">
          <div className="ml-33 text-white px-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
            <p className="uppercase text-3xl md:text-2xl font-['Dharma Gothic E'] font-bold mb-4 flex flex-wrap items-center">
                <span className="inline-block mr-2">infinito conducts</span>
                <span className="text-[#DD1215] inline-block">Tedx symbiosis</span>
            </p>


            <p className="text-lg md:text-lg mb-6 leading-relaxed max-w-md">
              Anuj, is the keynote speaker at the legendary TedX Symbiosis, conducted by Infinito Comics. He is delivering 2 speeches about Economy and Management! Exciting? 
              Read more by clicking the button below.
            </p>

            <a
            href="#"
            className="uppercase text-xs tracking-widest font-semibold text-white border-2 border-white px-4 py-2  hover:text-red-500 hover:border-red-500 transition duration-300 max-w-30"
            >
            See more &rsaquo;
            </a>
          </div>
        </div>    

           <div className="w-full md:w-auto md:absolute md:top-[-40px] md:right-[190px] max-w-[420px] z-20">
            <img
                src="../../../assets/Images/archery.jpg"
                alt="Archers"
                className="w-full h-[400px] object-cover shadow-xl"
            />
            </div>
        </div>
      </section>
    </div>
  )
}

export default FoundationSection;