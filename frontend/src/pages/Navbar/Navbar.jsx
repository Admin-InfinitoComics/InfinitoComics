// 📁 src/components/Header.jsx
import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import logo from "../../../assets/logo.png";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  // State to handle mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="text-white font-sans">
      {/* Top Promo & Links Section */}
      <div className="border-b bg-[#202020] border-gray-600 text-sm px-4 sm:px-8 py-4 flex flex-col md:flex-row justify-around items-center gap-40">
        {/* Promo Text */}
        <div className="mb-2 md:mb-0 text-center">
          Use code <strong>INFINT10</strong> to get 10% off on our shop!
        </div>
<<<<<<< HEAD

        {/* Navigation Links */}
        <div className="hidden md:flex gap-16 text-[1rem] text-gray-300">
          <Link to="/blogs" className="hover:text-white font-bold">
            Blogs & News
          </Link>
          <Link to="/foundation" className="hover:text-white font-bold">
            Foundation
          </Link>
          <Link to="/research" className="hover:text-white font-bold">
            Research
          </Link>
          <Link
            to="/support"
            className="hover:text-white font-bold flex items-center gap-1"
          >
            <Heart className="mx-1" /> Support Us
          </Link>
=======
        <div className="flex gap-20 pl-4">
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/foundation" className="hover:underline">Foundation</Link>
          <Link to="/researchPlans" className="hover:underline">Research</Link>
          <Link to="/funding" className="hover:underline">Funding</Link>
>>>>>>> 5978535fbd6e4f121abbec39e0835a191f564074
        </div>
      </div>

      {/* Middle Section: Logo, Buttons, Mobile Menu */}
      <div className="bg-[#202020] px-4 sm:px-8 py-1 flex items-center justify-between md:justify-around gap-4">
        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Login Button (only on desktop) */}
        <Link to="/login">
          <button className="hidden md:block border border-white px-6 py-3 uppercase text-md hover:bg-white hover:text-black transition tracking-wider">
            Log In | Sign Up &gt;
          </button>
        </Link>

        {/* Logo Centered */}
        <Link to='/'>
        <div className="text-center ">
          <img src={logo} alt="infinto" className=" w-auto" />
        </div>
        </Link>
        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          {/* Premium Button (hidden on mobile) */}
          {/* Search input visible from md and up */}
          <input
            type="search"
            placeholder="Infinito Ultimate >"
            className="hidden md:block bg-white text-black px-6 py-4 text-xs sm:text-sm uppercase font-semibold placeholder-gray-500 hover:bg-gray-200 transition tracking-widest w-full max-w-xs rounded"
          />

          {/* Search Button */}
          <button className="border border-white p-2.5 hover:bg-white hover:text-black transition">
            <FiSearch size={24} />
          </button>
        </div>
      </div>

      {/* Bottom Nav (hidden on mobile) */}
      <div className="hidden md:block bg-[#171717] text-sm text-gray-300 px-4 sm:px-8 py-3">
        <ul className="flex flex-wrap justify-center gap-10 items-center">
          <li>
            <Link
              to="/characters"
              className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer"
            >
              Characters
            </Link>
          </li>
          <li>
            <Link
              to="/comics"
              className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5"
            >
              Comics
            </Link>
          </li>
          <li>
            <Link
              to="/animation"
              className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5"
            >
              Animation
            </Link>
          </li>
          <li>
            <Link
              to="/games"
              className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5"
            >
              Games
            </Link>
          </li>
          <li>
            <Link
              to="/community"
              className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5"
            >
              Community
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="uppercase tracking-wider font-semibold hover:text-white cursor-pointer border-l border-gray-600 px-5 flex items-center gap-2"
            >
              <ShoppingBag /> Shop
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#171717] text-sm text-gray-300 px-4 py-6 space-y-4">
          <Link to="/characters" className="block font-bold hover:text-white">
            Characters
          </Link>
          <Link to="/comics" className="block font-bold hover:text-white">
            Comics
          </Link>
          <Link to="/animation" className="block font-bold hover:text-white">
            Animation
          </Link>
          <Link to="/games" className="block font-bold hover:text-white">
            Games
          </Link>
          <Link to="/community" className="block font-bold hover:text-white">
            Community
          </Link>
          <Link to="/about" className="block font-bold hover:text-white">
            About Us
          </Link>
          <Link
            to="/shop"
            className="block font-bold hover:text-white flex items-center gap-2"
          >
            <ShoppingBag /> Shop
          </Link>
          <Link to="/blogs" className="block font-bold hover:text-white">
            Blogs & News
          </Link>
          <Link to="/foundation" className="block font-bold hover:text-white">
            Foundation
          </Link>
          <Link to="/research" className="block font-bold hover:text-white">
            Research
          </Link>
          <Link
            to="/support"
            className="block font-bold hover:text-white flex items-center gap-2"
          >
            <Heart /> Support Us
          </Link>
          <button className="w-full border border-white px-6 py-3 uppercase text-md hover:bg-white hover:text-black transition tracking-wider">
            Log In | Sign Up &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
