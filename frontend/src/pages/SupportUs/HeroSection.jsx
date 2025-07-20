import React, { useState } from 'react';
import { FaRegCheckCircle, FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { createSupport } from '../../services/supportUs.js'
import { useParams } from 'react-router-dom';

import {
  summaryStats,
  donationAmounts,
  supporterPerks,
  donateBoxImg,
  bgImage
} from '../../constants/heroSectionData.js';

function HeroSection() {
  const [selectedTab, setSelectedTab] = useState("one-time");
  const { token } = useParams()
  // const token = useSelector((state) => state.user?.token);
  console.log("Token: ",token);


  const userName = useSelector((state) => state.user.name);

  //donation details
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [displayName, setDisplayName] = useState(userName);
  const [selectedMonthlyAmount, setSelectedMonthlyAmount] = useState(null);



  const handleSupportSubmit = async () => {
  // Step 1: Determine selected amount
  const amount = selectedTab === "one-time"
    ? parseInt(customAmount || selectedAmount?.replace(/[₹,\s]/g, ""))
    : parseInt(selectedMonthlyAmount?.replace(/[₹,\s]/g, ""));

  // Step 2: Validate amount
  if (!amount || isNaN(amount)) {
    alert("Please select or enter a valid amount.");
    return;
  }

  // Step 3: Construct payload
  const supportData = {
    supportType: selectedTab,
    amount,
    displayName: selectedTab === "monthly" ? displayName?.trim() : undefined
  };

  try {
    // Step 4: Call API
    const response = await createSupport(supportData, token);
    console.log("Support Success:", response.data);

    alert("Thank you for your support!");
    
    // Optionally reset
    setSelectedAmount(null);
    setCustomAmount('');
    setSelectedMonthlyAmount(null);
    setDisplayName('');
  } catch (error) {
    console.error("Support Error:", error?.response?.data || error);
    alert(error?.response?.data?.message || "Something went wrong.");
  }
};

  // console.log("selectedAmount: ", selectedAmount);
  // console.log("customAmount: ", customAmount);
  // console.log("displayName: ", displayName);
  // console.log("selectedMonthlyAmount: ", selectedMonthlyAmount);

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
                  <p className="text-2xl sm:text-3xl font-bold text-center">{summaryStats.totalContribution}</p>
                  <p className="text-sm sm:text-md">Monthly Contributions!</p>
                </div>
                <div className='flex flex-col items-center justify-center px-5'>
                  <p className="text-2xl sm:text-3xl font-bold">{summaryStats.individuals}</p>
                  <p className="text-sm sm:text-md">Individuals</p>
                </div>
                <div className='flex flex-col justify-center items-center px-5 '>
                  <p className="text-2xl sm:text-3xl font-bold">{summaryStats.corporates}</p>
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
                      className={`flex-1 py-2 text-center font-semibold transition cursor-pointer ${selectedTab === tab ? "bg-red-600 text-white" : "text-[#DE1215] bg-white"
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

                    {/* <div className="grid grid-cols-3 gap-3 mb-4 text-[#DE1215]">
                      {donationAmounts.map((amount, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedAmount(amount)}
                          className={`border py-2 text-sm font-semibold hover:bg-[#DE1215] hover:text-white ${amount === "₹ 1500" ? "bg-red-600 text-white" : "border-[#DE1215]"
                            }`}
                        >
                          {amount}
                        </button>
                      ))}
                    </div> */}

                    {/* <div className='flex justify-between mb-4 gap-3'>
                      <input
                        placeholder='Please enter Amount (INR)'
                        type="number"
                        className='w-2/3 border border-gray-300 px-4 py-3 text-sm'
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                      />
                      <button className='w-1/3 border border-[#DE1215] text-[#DE1215] lg:px-10 text-sm hover:bg-[#DE1215] hover:text-white font-semibold cursor-pointer'>
                        CUSTOM
                      </button>
                    </div> */}

                    <div className="grid grid-cols-3 gap-3 mb-4 text-[#DE1215]">
                      {donationAmounts.map((amount, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedAmount(amount);
                            setCustomAmount('');
                          }}
                          className={`border py-2 text-sm font-semibold hover:bg-[#DE1215] hover:text-white hover:cursor-pointer
        ${selectedAmount === amount ? "bg-red-600 text-white" : "border-[#DE1215]"}`}
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
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null); // Reset preset selection
                        }}
                      />
                      <button
                        className={`w-1/3 border text-sm lg:px-10 font-semibold cursor-pointer 
      ${customAmount ? "bg-red-600 text-white border-red-600" : "border-[#DE1215] text-[#DE1215] hover:bg-[#DE1215] hover:text-white"}`}
                      >
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
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full py-3 px-5 text-[0.8rem] mb-4 border border-gray-300"
                    />
                    <p className="text-xs mb-4 mt-[-0.9rem] text-gray-950 text-start">
                      *You’ll show up anonymously if you leave this blank.
                    </p>

                    <div className="grid grid-cols-3 gap-3 mb-4 text-[#DE1215]">
                      {donationAmounts.map((amount, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedMonthlyAmount(amount)}
                          className={`border py-2 text-sm font-semibold hover:bg-[#DE1215] hover:text-white cursor-pointer 
        ${selectedMonthlyAmount === amount ? "bg-red-600 text-white" : "border-[#DE1215]"}`}
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
                        <img src={donateBoxImg} className='h-[6rem]' alt="" />
                        <ul className="list-none ml-2 mt-2 text-base">
                          {supporterPerks.map((perk, idx) => (
                            <li key={idx} className='flex items-center mb-1'>
                              <FaRegCheckCircle className='text-2xl text-[#DE1215] mr-1' />
                              {perk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                <button
                  onClick={handleSupportSubmit}
                  className="w-full text-sm bg-red-600 text-white py-2 font-semibold flex justify-center items-center gap-2 tracking-wider">
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
