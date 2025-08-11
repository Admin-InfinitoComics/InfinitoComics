import Slider from "react-slick";
import "../Infinito Ultimate/Research.css";
import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { BASE_URL } from "../../utils/constants.js";
import {
  Gift,
  Leaf,
  LeafyGreen,
  Flower,
  TreeDeciduous,
  CircleCheck,
} from "lucide-react";

const PremiumPlans = () =>{
  const [isUserPremium, setIsUserPremium] = useState(false);
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      setIsUserPremium(res.data.isPremium || false);
    } catch (error) {
      console.error("Error verifying premium user:", error);
      setIsUserPremium(false);
    }
  };
  const handleBuyClick = async (type) => {

    console.log(type)
    try {
      const token = localStorage.getItem("authtoken");
      const res = await axios.post(
       `${BASE_URL}/payment/create`,
        { membershipType: type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.data;
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "Infinito Comics",
        description:` ${type} Membership Purchase`,
        order_id: data.orderId,
        theme: { color: "#3399cc" },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment: ", error);
      alert("Something went wrong while creating the order. Please try again!");
    }
  };
  const plans = [
    {
      icon: <Gift size={80} color="currentColor" />,
      price: 1900,
      originalPrice: "₹2199",
      title: "INFINITO ULTIMATE KIT",
      features: [
        "Comics of your choice",
        "Surprise superhero toy",
        "Infinito T-shirt",
        "Superhero Stickers",
        "Digital wall paintings",
      ],
      badge: "UltimateKit",
      textColor: "text-white",
      borderColor: "border-black",
      bgColor: "bg-black",
    },
    {
      icon: <Leaf size={80} color="white" />,
      price: "FREE",
      title: "FREE",
      features: ["Limited Comics", "Ad-Supported"],
      badge: "FREE",
      textColor: "text-white",
      borderColor: "border-black",
      bgColor: "bg-gray-900",
    },
    {
      icon: <LeafyGreen size={80} color="white" />,
      price: 129,
      title: "MONTHLY",
      features: [
        "Unlimited Comics",
        "Premium Content",
        "Animated Series",
        "Free Online Games",
        "Ad-Supported",
      ],
      badge: "Monthly",
      textColor: "text-white",
      borderColor: "border-black",
      bgColor: "bg-gray-900",
    },
    {
      icon: <Flower size={80} color="white" />,
      price: 599,
      title: "HALF YEAR",
      features: [
        "Unlimited Comics",
        "Premium Content",
        "Animated Series",
        "Free Online Games",
        "Ad-Supported",
      ],
      badge: "HalfYear",
      textColor: "text-white",
      borderColor: "border-black",
      bgColor: "bg-gray-900",
    },
    {
      icon: <TreeDeciduous size={80} color="white" />,
      price: 999,
      title: "ANNUAL",
      features: [
        "Unlimited Comics",
        "Premium Content",
        "Animated Series",
        "Free Online Games",
        "Exclusive Releases",
        "No Ads",
        "VIP Event Access",
      ],
      badge: "Annual",
      textColor: "text-white",
      borderColor: "border-black",
      bgColor: "bg-gray-900",
    },
  ];

  const renderCard = (plan, index) => {
    return (
      <div
        key={index}
        className={`flex flex-col card-shine 
          ${plan.title === "INFINITO ULTIMATE KIT" ? "lg:w-[380px]" : "lg:w-[300px]"} 
          w-full sm:w-[90%] mx-auto min-h-fit`}
      >
        <div
          className={`${plan.bgColor} ${plan.textColor} ${plan.borderColor} flex flex-col flex-grow p-6 rounded-t-2xl`}
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 100%)" }}
        >
          <div className="flex flex-col items-center">
            {plan.icon}
            <div className="p-5 text-2xl font-bold text-center">
              ₹{plan.price}
              {plan.originalPrice && (
                <span className="ml-2 line-through text-sm text-gray-400">
                  {plan.originalPrice}
                </span>
              )}
            </div>
            <p className="text-2xl font-semibold border-b border-t text-center break-words">
              {plan.title}
            </p>
          </div>

          <div className="flex flex-col flex-grow justify-between mt-5">
            <div className="space-y-3 mb-4">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <CircleCheck
                    size={24}
                    color={
                      feature === "Limited Comics" ||
                      feature === "VIP Event Access"
                        ? "white"
                        : feature.includes("Ad") ||
                          feature.includes("Exclusive") ||
                          feature.includes("No Ads")
                        ? "gray"
                        : "red"
                    }
                  />
                  <span className="break-words">{feature}</span>
                </div>
              ))}

              {plan.title === "INFINITO ULTIMATE KIT" && (
                <div className="mt-4 w-full">
                  <h2 className="font-bold text-white text-md text-center px-2 leading-snug">
                    First 10,000 customers get exclusive gifts!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() =>{
             handleBuyClick(plan.badge)
             
          }}
          className="w-full h-14 text-white bg-red-500 flex justify-center items-center text-center font-bold rounded-b-2xl hover:cursor-pointer"
          style={{
            clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          {plan.badge=="FREE" ? "FREE" : "BUY NOW"}
        </div>
      </div>
    );
  };

  const responsiveSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="w-full mt-5 p-4 lg:p-16">
      <div className="block lg:hidden">
        <Slider {...responsiveSliderSettings}>
          {plans.map((plan, index) => (
            <div key={index} className="px-2">
              {renderCard(plan, index)}
            </div>
          ))}
        </Slider>
      </div>

      <div className="hidden lg:flex justify-center">
        <div className="flex gap-6 overflow-x-auto">
          {plans.map((plan, index) => renderCard(plan, index))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
