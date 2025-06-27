import React from 'react';
import { Share2 } from 'lucide-react';
import tshirtImage from '../../../assets/Images/tShirts&Collectibles/tshirt.jpg';

const items = [
  {
    id: 1,
    title: 'Studio Ghibli Graphicx',
    price: '₹599.00',
    image: tshirtImage,
    tag: 'NEW RELEASES',
  },
  {
    id: 2,
    title: 'Studio Ghibli Graphicx',
    price: '₹599.00',
    image: tshirtImage,
    tag: 'TSHIRTS',
  },
  {
    id: 3,
    title: 'Studio Ghibli Graphicx',
    price: '₹599.00',
    image: tshirtImage,
    tag: 'COLLECTIBLES',
  },
];

const CollectorShowcase = () => {
  return (
    <div className="bg-white py-20 px-6">
      <div className="w-full">
        {/* Headings */}
        <div className="mb-10 mx-auto md:mx-60">
          <p className="text-[20px] font-medium text-black tracking-wide">
            Exclusive Merch
          </p>
          <h2 className="text-[36px] font-bold tracking-widest uppercase">
            Collector’s Paradise
          </h2>
        </div>

        {/* Card Grid */}
        <div className="flex justify-center gap-10 md:mx-60 mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-[425px] h-[514px] relative bg-gray-200 overflow-hidden shadow-md"
            >
              {/* Background image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Overlay content */}
              <div className="absolute top-4 left-4 z-10 text-black">
                <p className="text-sm">{item.title}</p>
                <p className="text-lg font-bold">{item.price}</p>
              </div>

              {/* Share icon */}
              <button className="absolute top-4 right-4 p-[6px] border border-black bg-white z-10">
                <Share2 className="w-5 h-5 text-black" />
              </button>

              {/* Bottom tag */}
              <div className="absolute bottom-0 w-full z-10">
                <div className="bg-black text-white text-sm py-2 text-center tracking-widest italic -skew-x-[8deg]">
                  <div className="skew-x-[8deg]">{item.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectorShowcase;
