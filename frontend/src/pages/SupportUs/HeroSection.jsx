import React, { useState } from 'react';
import bgImage from '../../../assets/Images/SupportUs/bg.jpg';
import DonateBoxImg from '../../../assets/Images/SupportUs/DonateBoxImg.jpg';
import { FaRegCheckCircle, FaRegHeart } from "react-icons/fa";

function HeroSection() {
  const [selectedTab, setSelectedTab] = useState("one-time");

  return (
    <div className="flex justify-center items-center">
      <div className="w-full h-full text-gray-800">
        <div
          className="bg-cover bg-center text-white py-10 px-4 md:px-10"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full max-w-7xl mx-auto">
            
            {/* Left Section */}
            <div className="w-full lg:w-1/2 font-bebas text-start">
              <h2 className="text-2xl sm:text-3xl md:text-[1.9rem] font-bold mb-2">SUPPORT INFINITO’S JOURNEY.</h2>
              <p className="text-lg sm:text-xl mb-6">Infinito Universe • Innovation • National Development</p>

              <div className="flex flex-wrap items-center justify-between flex-col sm:flex-row gap-1 my-8 ">
                <div className='flex flex-col justify-center pr-5 '>
                  <p className="text-2xl sm:text-3xl font-bold text-center">₹3,25,700</p>
                  <p className="text-sm sm:text-md">Monthly Contributions!</p>
                </div>
                <div className='flex flex-col items-center justify-center px-5'>
                  <p className="text-2xl sm:text-3xl font-bold">345</p>
                  <p className="text-sm sm:text-md">Individuals</p>
                </div>
                <div className='flex flex-col justify-center items-center px-5 '>
                  <p className="text-2xl sm:text-3xl font-bold">7</p>
                  <p className="text-sm sm:text-md">Corporates</p>
                </div>
              </div>

              <p className="text-sm sm:text-md mb-3">
                Every support counts towards making this universe a better place and keeping this story alive!
              </p>
              <p className="cursor-pointer text-sm sm:text-md">
                Become a <span className='underline'>Corporate Member.</span>
              </p>
            </div>

            {/* Right Section (Support Box) */}
            <div className="w-full lg:w-1/2 -mx-[3rem]">
              <div className="bg-white text-black shadow-lg px-6 sm:px-10 py-8 sm:py-10">
                {/* Toggle Tabs */}
                <div className="flex mb-6 border border-gray-300 overflow-hidden">
                  {["one-time", "monthly"].map((tab) => (
                    <button
                      key={tab}
                      className={`flex-1 py-2 text-center font-semibold transition cursor-pointer ${
                        selectedTab === tab ? "bg-red-600 text-white" : "text-[#DE1215] bg-white"
                      }`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Dynamic Box */}
                {selectedTab === "one-time" ? (
                  <>
                    <p className='text-sm text-gray-700 my-6 text-start'>
                      Want the world to see your contribution?{" "}
                      <span
                        className="text-blue-600 cursor-pointer underline"
                        onClick={() => setSelectedTab("monthly")}
                      >
                        Support Us monthly!
                      </span>
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-4 text-[#DE1215]">
                      {["₹ 500", "₹ 1000", "₹ 1500", "₹ 2000", "₹ 2500", "₹ 3000"].map((amount, idx) => (
                        <button
                          key={idx}
                          className={`border py-2 text-sm font-semibold hover:bg-[#DE1215] hover:text-white ${
                            amount === "₹ 1500" ? "bg-red-600 text-white" : "border-[#DE1215]"
                          }`}
                        >
                          {amount}
                        </button>
                      ))}
                    </div>

                    <div className='flex justify-between mb-4 gap-3'>
                      <input
                        placeholder='Please enter Amount (INR)'
                        type="number"
                        className='w-2/3 border border-gray-300 px-4 py-3 text-sm'
                      />
                      <button className='w-1/3 border border-[#DE1215] text-[#DE1215] lg:px-10 text-sm hover:bg-[#DE1215] hover:text-white font-semibold cursor-pointer'>
                        CUSTOM
                      </button>
                    </div>

                    <div className="text-sm mb-4">
                      <p className='mt-6 mb-3 text-start'>
                        Support with <span className='text-[#DE1215]'>₹1500</span> just once
                      </p>
                      <div className="flex items-center text-sm pb-4">
                        <FaRegCheckCircle className='text-[#DE1215] text-xl mr-2' />
                        2 months of free Infinito Ultimate subscription
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <label className="text-sm font-semibold block mb-1 text-[#DE1215] text-start">
                      Support as*
                    </label>
                    <input
                      type="text"
                      placeholder="How would you like to be visible on our website?"
                      maxLength={30}
                      className="w-full py-3 px-5 text-[0.8rem] mb-4 border border-gray-300"
                    />
                    <p className="text-xs mb-4 mt-[-0.9rem] text-gray-950 text-start">
                      *You’ll show up anonymously if you leave this blank.
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-4 text-[#DE1215]">
                      {["₹ 500", "₹ 1000", "₹ 1500", "₹ 2000", "₹ 2500", "₹ 3000"].map((amount, index) => (
                        <button
                          key={index}
                          className={`border py-2 text-sm font-semibold hover:bg-[#DE1215] hover:text-white ${
                            amount === "₹ 1500" ? "bg-red-600 text-white" : "border-[#DE1215]"
                          }`}
                        >
                          {amount}
                        </button>
                      ))}
                    </div>

                    <div className="text-sm mb-4 text-start">
                      <p>
                        Become a <span className="text-[#FFBC08] font-bold">GOLD</span> member by supporting with{" "}
                        <span className="font-semibold text-[#DE1215]">₹1500 / month.</span>
                      </p>
                      <div className="flex items-center mt-3">
                        <img src={DonateBoxImg} className='h-[6rem]' alt="" />
                        <ul className="list-none ml-2 mt-2 text-base">
                          <li className='flex items-center mb-1'>
                            <FaRegCheckCircle className='text-2xl text-[#DE1215] mr-1' />
                            Your name on our page
                          </li>
                          <li className='flex items-center'>
                            <FaRegCheckCircle className='text-2xl text-[#DE1215] mr-1' />
                            Free Ultimate subscription
                          </li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                <button className="w-full text-sm bg-red-600 text-white py-2 font-semibold flex justify-center items-center gap-2 tracking-wider">
                  SUPPORT <FaRegHeart className='text-white' />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
