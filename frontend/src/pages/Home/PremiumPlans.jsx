import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import {
  Gift,
  Leaf,
  LeafyGreen,
  Flower,
  TreeDeciduous,
  CircleCheck,
} from "lucide-react";

import PremiumPlansShimmer from "../../shimmer/landingPageShimmer/PremiumPlansShimmer";
import { BASE_URL } from "../../utils/constants.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PremiumPlans = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2400); // demo delay
  }, []);

  // Razorpay integration
  const handleBuyClick = async (type) => {
    try {
      const token = localStorage.getItem("authtoken");

      const res = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("RESPONSE FROM BACKEND: ", res.data.data);
      const data = res.data.data;

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Infinito Comics",
        description: "Test transaction",
        order_id: data.orderId,
        prefill: {
          name: data.notes.name,
          email: data.notes.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

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

  // This is your desktop plan layout
  const desktopPlans = (
    <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-5 p-16 min-h-[600px] px-4 lg:px-32 gap-10">
      {/* Example: INFINITO ULTIMATE KIT PLAN */}
      <div className="flex flex-col w-full lg:w-[35%] h-auto lg:h-[750px] md:ml-60 ">
        <div
          className="flex flex-col items-center w-full h-[90%] text-white bg-slate-900 p-5 border border-black"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 96%, 0 100%)",
          }}
        >
          <div>
            <Gift size={80} color="currentColor" />
          </div>
          <div className="p-5">
            <span className="m-2 text-2xl font-bold">₹1900</span>
            <span className="line-through text-sm text-gray-400">₹2199</span>
          </div>
          <p className="text-2xl font-semibold border-b border-t">
            INFINITO ULTIMATE KIT
          </p>
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
        <div
          className="w-full h-14 lg:h-[10%] text-white bg-red-500 flex justify-center items-center text-center border border-black"
          style={{
            clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          <strong>Special Offer</strong>
        </div>
      </div>
      {/* TODO: Add other plans here like Monthly, Annual, etc., following same structure */}
    </div>
  );

  // This will be the cards shown in mobile slider
  const mobilePlans = [
    {
      title: "INFINITO ULTIMATE KIT",
      price: "₹1900",
      oldPrice: "₹2199",
      features: [
        "Comics of your choice",
        "Surprise superhero toy",
        "Infinito T-shirt",
        "Superhero Stickers",
        "Digital wall paintings",
      ],
      icon: <Gift size={80} color="currentColor" />,
      dark: true,
    },
    {
      title: "MONTHLY",
      price: "₹129",
      features: [
        "Unlimited Comics",
        "Premium Content",
        "Animated Series",
        "Free Online Games",
        "Ad-Supported",
      ],
      icon: <LeafyGreen size={80} color="currentColor" />,
      dark: false,
    },
  ];

  const renderCard = (plan) => (
    <div
      className={`flex flex-col items-center w-full h-full p-5 border ${
        plan.dark ? "bg-slate-900 text-white" : "bg-slate-50"
      }`}
    >
      <div>{plan.icon}</div>
      <div className="p-5">
        <span className="m-2 text-2xl font-bold">{plan.price}</span>
        {plan.oldPrice && (
          <span className="line-through text-sm text-gray-400">
            {plan.oldPrice}
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold border-b border-t">{plan.title}</p>
      <div className="m-5">
        {plan.features.map((feat, i) => (
          <span key={i} className="flex flex-row m-3 gap-2">
            <CircleCheck size={24} color="red" /> {feat}
          </span>
        ))}
      </div>
    </div>
  );

  if (loading) return <PremiumPlansShimmer />;

  return (
    <div className="w-full mt-5 p-4 lg:p-16">
      {/* Buy button */}
      <button
        onClick={() => handleBuyClick("Monthly")}
        className="bg-rose-500 hover:bg-red-600 cursor-pointer px-4 py-2 mb-5"
      >
        Buy Monthly
      </button>

      {/* Desktop view */}
      <div className="hidden lg:block">{desktopPlans}</div>

      {/* Mobile & Tablet View Carousel */}
      <div className="block lg:hidden">
        <Slider {...responsiveSliderSettings}>
          {mobilePlans.map((plan, index) => (
            <div key={index} className="px-2">
              <div className="mx-auto h-[640px]">{renderCard(plan)}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PremiumPlans;
