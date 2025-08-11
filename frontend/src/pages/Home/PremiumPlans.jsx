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
import Slider from "react-slick";
import PremiumPlansShimmer from "../../shimmer/landingPageShimmer/PremiumPlansShimmer";
import { BASE_URL } from "../../utils/constants.js";

const PremiumPlans = () => {
  const [loading, setLoading] = useState(true);
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2400); // simulate loading
    verifyPremiumUser();
  }, []);

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
        description: `${type} Membership Purchase`,
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
      name: "Monthly",
      price: "₹129",
      features: ["Unlimited Comics", "Premium Content", "Animated Series"],
      icon: <LeafyGreen size={80} />,
      color: "red",
    },
    {
      name: "Annual",
      price: "₹999",
      features: ["Unlimited Comics", "Premium Content", "VIP Event Access"],
      icon: <TreeDeciduous size={80} color="white" />,
      color: "white",
    },
  ];

  const renderCard = (plan) => (
    <div className="bg-slate-900 text-white p-5 border border-black">
      <div className="flex flex-col items-center">
        {plan.icon}
        <div className="p-5">
          <span className="m-2 text-2xl font-bold">{plan.price}</span>
        </div>
        <p className="text-2xl font-semibold border-b border-t">{plan.name}</p>
        <div className="m-5">
          {plan.features.map((feature, i) => (
            <span key={i} className="flex flex-row m-3 gap-2">
              <CircleCheck size={24} color={plan.color} /> {feature}
            </span>
          ))}
        </div>
        <button
          onClick={() => handleBuyClick(plan.name)}
          className="bg-rose-500 hover:bg-red-600 cursor-pointer px-4 py-2"
        >
          Buy {plan.name}
        </button>
      </div>
    </div>
  );

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
        settings: { slidesToShow: 2, centerMode: false, centerPadding: "0px" },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, centerMode: true, centerPadding: "20px" },
      },
    ],
  };

  if (loading) return <PremiumPlansShimmer />;

  return (
    <div className="w-full mt-5 p-4 lg:p-16">
      {/* Mobile View - Slider */}
      <div className="block lg:hidden">
        <Slider {...responsiveSliderSettings}>
          {plans.map((plan, index) => (
            <div key={index} className="px-2">
              <div className="mx-auto h-[640px]">{renderCard(plan)}</div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop View - Static Cards */}
      <div className="hidden lg:flex flex-wrap justify-center gap-10">
        {plans.map((plan, index) => (
          <div key={index} className="w-[20%]">{renderCard(plan)}</div>
        ))}
      </div>
    </div>
  );
};

export default PremiumPlans;
