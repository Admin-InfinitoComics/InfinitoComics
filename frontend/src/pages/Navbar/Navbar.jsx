import React from 'react';
import { FiSearch } from 'react-icons/fi';
import logo from '../../../assets/logo.png'; 
import {Heart,ShoppingBag} from 'lucide-react'

const Header = () => {
  return (
    <div className=" text-white font-sans">
      {/* Top promo and links */}
      <div className="border-b bg-[#202020] border-gray-600 text-sm px-4 sm:px-8 py-4 flex flex-col md:flex-row justify-around items-center">
        {/* Promo text */}
        <div className="mb-2 md:mb-0 text-center">
          Use code <strong>INFINT10</strong> to get 10% off on our shop!
        </div>

        {/* Navigation links */}
        <div className="flex gap-16 text-[1rem] text-gray-300">
          <a href="#" className="hover:text-white"><b>Blogs & News</b></a>
          <a href="#" className="hover:text-white"><b>Foundation</b></a>
          <a href="#" className="hover:text-white"><b>Research</b></a>
          <a href="#" className="hover:text-white flex items-center gap-1"><Heart className='mx-1' /><b> Support Us</b></a>
        </div>
      </div>



      {/* Middle section with login, logo and buttons */}
      <div className="bg-[#202020] px-4 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-around gap-4 h-20">
        {/* Login button */}
        <button className="border border-white px-6 py-3 uppercase text-md  hover:bg-white hover:text-black transition mx-20 tracking-wider">
          Log In | Sign Up &gt;
        </button>

        {/* Logo */}
        <div className="text-center ">
          <img src={logo} alt="infinto" />
        </div>

        {/* Right side buttons */}
        <div className="flex gap-5 items-center mx-20 ">
          <button className="bg-white text-black px-6 py-4 text-xs sm:text-sm uppercase font-semibold hover:bg-gray-200 transition tracking-widest">
            Infinito Ultimate &gt;
          </button>
          <button className="border border-white py-2.5 px-2 hover:bg-white hover:text-black transition">
            <FiSearch size={28} />
          </button>
        </div>
      </div>




      {/* Bottom nav menu */}
      <div className="bg-[#171717] text-sm  text-gray-300 px-4 sm:px-8 py-3">
  <ul className="flex flex-wrap justify-center gap-10 items-center ">
    {/* Individual static menu links */}

    <li className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer first:border-none first:pl-0">
      Characters
    </li>
    <li className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5">
      Comics
    </li>
    <li className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5">
      Animation
    </li>
    <li className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5">
      Games
    </li>
    <li className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5">
      Community
    </li>
    <li className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5">
      About Us
    </li>
    <li className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5">
       <span className="flex items-center gap-2">
    <ShoppingBag  />
    Shop
  </span>
    </li>
  </ul>
</div>

    </div>
  );
};

export default Header;