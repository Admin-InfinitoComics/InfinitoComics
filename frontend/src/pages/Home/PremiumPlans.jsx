import React from "react";
import {
  Gift,
  Leaf,
  LeafyGreen,
  Flower,
  TreeDeciduous,
  CircleCheck,
} from "lucide-react";

const PremiumPlans = () => {
  return (
    // Responsive layout: stacked on mobile, horizontal on large screens
    <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-5 p-16 min-h-[600px] px-4 lg:px-32 gap-10">

      {/* 🟥 INFINITO ULTIMATE KIT PLAN */}
      <div className="flex flex-col w-full lg:w-[35%] h-auto lg:h-[700px] gap-2">
        {/* Card with product details */}
        <div className="flex flex-col items-center w-full h-[90%] bg-slate-50 p-5 border border-black"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 94%, 0 100%)",
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
          <p className="text-lg">
            <strong>First 10,000 customers get exclusive gifts!!</strong>
          </p>
        </div>
        {/* Offer label */}
        <div className="w-full h-[10%] text-white bg-red-500 flex justify-center items-center text-center border border-black"
        style={{
          clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
        }}>
          <strong>Special Offer</strong>
        </div>
      </div>

      {/* 🟩 FREE PLAN */}
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[700px]">
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
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[700px]">
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
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[700px]">
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
      <div className="flex flex-col w-full lg:w-[20%] h-auto lg:h-[700px] gap-2">
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
        <div className="w-full h-[10%] text-white bg-red-500 flex justify-center items-center text-center border border-black"
          style={{
          clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)",
        }}
        >
          <strong>Best Offer</strong>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
