import React, { useState, useEffect } from "react";


import axios from "axios";
import {
  Gift,
  Leaf,
  LeafyGreen,
  Flower,
  TreeDeciduous,
  CircleCheck,
} from "lucide-react";

import PremiumPlansShimmer from "../../shimmer/landingPageShimmer/PremiumPlansShimmer";
import { BASE_URL } from '../../utils/constants.js'


const PremiumPlans = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {

    // fetch data / preload hero image ...
    setTimeout(() => setLoading(false), 2400); // demo
  }, []);


  //3rd api call of razorpay
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, [])

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      } else {
        setIsUserPremium(false);
      }
    } catch (error) {
      console.error("Error verifying premium user:", error);
      setIsUserPremium(false);
    }
  };

  console.log("isUserPremium: ", isUserPremium)

  // Razorpay integration
  const handleBuyClick = async (type) => {
    try {
      const token = localStorage.getItem("authtoken");

      const res = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = res.data.data;
      console.log("RESPONSE FROM BACKEND: ", data);

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "Infinito Comics",
        description: `${type} Membership Purchase`,
        order_id: data.orderId,
        theme: {
          color: "#3399cc"
        },
        handler: verifyPremiumUser
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment: ", error);
      alert("Something went wrong while creating the order. Please try again!");
    }
  };


  return loading ? <PremiumPlansShimmer /> : (
    <>
      <button onClick={() => handleBuyClick("Monthly")} className="bg-rose-500 hover:bg-red-600 cursor-pointer px-4 py-2">
        Buy Monthly
      </button>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-5 p-16 min-h-[600px] px-4 lg:px-32 gap-10">

        {/* 🟥 INFINITO ULTIMATE KIT PLAN */}
        <div className="flex flex-col w-full lg:w-[35%] h-auto lg:h-[750px] md:ml-60 ">
          {/* Card with product details */}
          <div className="flex flex-col items-center w-full h-[90%] text-white bg-slate-900 p-5 border border-black"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 96%, 0 100%)",
            }}
          >
            <div><Gift size={80} color="currentColor" /></div>
            <div className="p-5">
              <span className="m-2 text-2xl font-bold">₹1900</span>
              <span className="line-through text-sm text-gray-400">₹2199</span>
            </div>
            <p className="text-2xl font-semibold border-b border-t">
              INFINITO ULTIMATE KIT
            </p>
            {/* Features */}
            <div className="m-5">
              <span className="flex flex-row m-5 gap-2">
                <CircleCheck size={24} color="red" /> Comics of your choice
              </span>
              <span className="flex flex-row m-5 gap-2">
                <CircleCheck size={24} color="red" /> Surprise superhero toy
              </span>
              <span className="flex flex-row m-5 gap-2">
                <CircleCheck size={24} color="red" /> Infinito T-shirt
              </span>
              <span className="flex flex-row m-5 gap-2">
                <CircleCheck size={24} color="red" /> Superhero Stickers
              </span>
              <span className="flex flex-row m-5 gap-2">
                <CircleCheck size={24} color="red" /> Digital wall paintings
              </span>
            </div>
            <p className="text-lg whitespace-nowrap overflow-hidden text-ellipsis">
              <strong>First 10,000 customers get exclusive gifts!!</strong>
            </p>

          </div>
          {/* Offer label */}
          <div className="w-full h-14 lg:h-[10%] text-white bg-red-500 flex justify-center items-center text-center border border-black"
            style={{
              clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)",
            }}>
            <strong>Special Offer</strong>
          </div>

        </div>

        {/* 🟩 FREE PLAN */}
        <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px] ">
          <div className="w-full h-full bg-slate-50 border border-black">
            <div className="flex flex-col items-center w-full h-full bg-slate-50 p-5">
              <div><Leaf size={80} color="currentColor" /></div>
              <div className="p-5">
                <span className="m-2 text-2xl font-bold">FREE</span>
              </div>
              <p className="text-2xl font-semibold border-b border-t">FREE</p>
              {/* Features */}
              <div className="m-5">
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="gray" /> Limited Comics
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="gray" /> Ad-Supported
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 🟨 MONTHLY PLAN */}
        <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px]">
          <div className="w-full h-full bg-slate-50 border border-black">
            <div className="flex flex-col items-center w-full h-full bg-slate-50 p-5">
              <div><LeafyGreen size={80} color="currentColor" /></div>
              <div className="p-5">
                <span className="m-2 text-2xl font-bold">₹129</span>
              </div>
              <p className="text-2xl font-semibold border-b border-t">MONTHLY</p>
              {/* Features */}
              <div className="m-5">
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Unlimited Comics
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Premium Content
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Animated Series
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Free Online Games
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="gray" /> Ad-Supported
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 🟪 HALF YEAR PLAN */}
        <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px]">
          <div className="w-full h-full bg-slate-50 border border-black">
            <div className="flex flex-col items-center w-full h-full bg-slate-50 p-5">
              <div><Flower size={80} color="currentColor" /></div>
              <div className="p-5">
                <span className="m-2 text-2xl font-bold">₹599</span>
              </div>
              <p className="text-2xl font-semibold border-b border-t">HALF YEAR</p>
              {/* Features */}
              <div className="m-5">
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Unlimited Comics
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Premium Content
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Animated Series
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Free Online Games
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="gray" /> Ad-Supported
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 🟦 ANNUAL PLAN */}
        <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[750px] md:mr-60 ">
          <div className="w-full h-[90%] bg-gray-900  border border-black"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 100%)",
            }}
          >
            <div className="flex flex-col items-center w-full h-full text-white p-5">
              <div><TreeDeciduous size={80} color="white" /></div>
              <div className="p-5">
                <span className="m-2 text-2xl font-bold">₹999</span>
              </div>
              <p className="text-2xl font-semibold border-b border-t">ANNUAL</p>
              {/* Features */}
              <div className="m-5">
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Unlimited Comics
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Premium Content
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Animated Series
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="red" /> Free Online Games
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="gray" /> Exclusive Releases
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="gray" /> No Ads
                </span>
                <span className="flex flex-row m-3 gap-2">
                  <CircleCheck size={24} color="gray" /> VIP Event Access
                </span>
              </div>
            </div>
          </div>
          {/* Offer label */}
          <div className="w-full h-14 lg:h-[10%] text-white bg-red-500 flex justify-center items-center text-center border border-black"
            style={{
              clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <strong>Best Offer</strong>
          </div>
        </div>
  const responsiveSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="w-full mt-5 p-4 lg:p-16">
      {/* Mobile & Tablet View Carousel */}
      <div className="block lg:hidden">
        <Slider {...responsiveSliderSettings}>
          {plans.map((plan, index) => (
            <div key={index} className="px-2">
              <div className="mx-auto h-[640px]">{renderCard(plan, index)}</div>
            </div>
          ))}
        </Slider>
      </div>


      </div>
    </>
  );
};

export default PremiumPlans;
