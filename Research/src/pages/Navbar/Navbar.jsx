import React, { useState } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from '../../../assets/Images/UserIcon.png';

const Navbar = () => {
  const navigate = useNavigate();
  const user = null;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="text-white font-sans">
      {/* Top Banner */}
      <div className="bg-[#202020] text-white text-sm py-2 px-4 lg:px-32 border-b border-gray-500 flex justify-between items-center">
        <div>
          Use code <span className="font-bold">INFIN10</span> to get 10% off on our shop!
        </div>
        <div className="hidden lg:flex gap-20 pl-4">
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/foundation" className="hover:underline">Foundation</Link>
          <Link to="/researchPlans" className="hover:underline">Research</Link>
          <Link to="/funding" className="hover:underline">Funding</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#202020] py-4 px-4 lg:px-32 flex items-center justify-between">
        {/* ----------- Mobile Navbar ----------- */}
        <div className="flex items-center justify-between w-full lg:hidden">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 border border-white"
          >
            {menuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>

          {/* Logo */}
          <img
            src="/assets/Images/research/researchLOGO.png"
            alt="Infinito Logo"
            className="h-8"
          />

          {/* Search Icon */}
          <div className="p-2 border border-white">
            <FiSearch className="text-xl" />
          </div>
        </div>

        {/* ----------- Desktop Navbar ----------- */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Auth Button or User Greeting */}
          {user ? (
            <div className="flex items-center gap-2 border border-white px-4 py-2 uppercase text-sm">
              <img src={UserIcon} alt="User Icon" className="w-5 h-5 " />
              <span className="tracking-wide">Hi, {user.name}!</span>
            </div>
          ) : (
            <button
              className="border px-4 py-1 text-sm uppercase"
              onClick={() => navigate('/login')}
            >
              Log In | Sign Up &gt;
            </button>
          )}

          {/* Logo */}
          <div>
            <img
              src="/assets/Images/research/researchLOGO.png"
              alt="Infinito-logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Search */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="INFINITO ULTIMATE"
              className="bg-white border border-white font-bold text-black placeholder-[#202020] px-6 py-2 w-64 focus:outline-none"
            />
            <div className="p-2 border-2 border-white cursor-pointer hover:bg-white hover:text-black transition">
              <FiSearch className="text-white text-xl hover:text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Mobile Dropdown Menu (optional if you want to toggle links) */}
      {menuOpen && (
        <div className="bg-[#202020] px-4 pb-4 lg:hidden space-y-2">
          <Link to="/shop" className="block text-sm hover:underline" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/foundation" className="block text-sm hover:underline" onClick={() => setMenuOpen(false)}>Foundation</Link>
          <Link to="/researchPlans" className="block text-sm hover:underline" onClick={() => setMenuOpen(false)}>Research</Link>
          <Link to="/funding" className="block text-sm hover:underline" onClick={() => setMenuOpen(false)}>Funding</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
