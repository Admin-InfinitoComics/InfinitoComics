import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import PremiumPlansShimmer from "../../shimmer/landingPageShimmer/PremiumPlansShimmer";
import {
  Gift,
  Leaf,
  LeafyGreen,
  Flower,
  TreeDeciduous,
  CircleCheck,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PremiumPlans = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2400);
  }, []);

  const handleClick = (plan) => {
    console.log(plan);
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
      badge: "Ultimate",
      textColor: "text-white",
      borderColor: "border-black",
      bgColor: "bg-black",
    },
    {
      icon: <Leaf size={80} color="white" />,
      price: "FREE",
      title: "FREE",
      features: ["Limited Comics", "Ad-Supported"],
      badge: "Free",
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
    return loading ? (
      <PremiumPlansShimmer />
    ) : (
      <div
        key={index}
        className="flex flex-col card-shine w-full max-w-[420px] min-h-[640px]" // Increased width here
      >
        <div
          className={`${plan.bgColor} ${plan.textColor} ${plan.borderColor} flex flex-col flex-grow p-5 rounded-t-2xl`}
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 97%, 0 100%)" }}
        >
          <div className="flex flex-col items-center">
            {plan.icon}
            <div className="p-5 text-2xl font-bold">
              ₹{plan.price === "FREE" ? "FREE" : plan.price}
            </div>
            <p className="text-2xl font-semibold border-b border-t text-center">
              {plan.title}
            </p>
          </div>

          <div className="flex flex-col flex-grow justify-between mt-5">
            <div className="space-y-3 mb-4">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <CircleCheck
                    size={24}
                    color={
                      feature.includes("Ad") ||
                      feature.includes("Exclusive") ||
                      feature.includes("No Ads") ||
                      feature.includes("VIP Event Access")
                        ? "gray"
                        : "red"
                    }
                  />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          onClick={() => handleClick(plan.badge)}
          className="w-full h-14 text-white bg-red-500 flex justify-center items-center text-center font-bold rounded-b-2xl cursor-pointer"
          style={{
            clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
          }}
        >
          {plan.badge === "Free" ? "FREE" : "BUY NOW"}
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

      {/* Desktop View: Scrollable Row */}
      <div className="hidden lg:flex justify-center">
        <div className="flex gap-6 overflow-x-auto">
          {plans.map((plan, index) => renderCard(plan, index))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
