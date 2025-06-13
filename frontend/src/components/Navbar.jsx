import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="text-white font-sans">
      <div className="bg-[#202020] text-white text-sm py-2 px-30 border-b border-gray-500 flex justify-between items-center">
        <div>
            Use code <span className="font-bold">INFIN25</span> to get 25% off on our shop!
        </div>
        <div className='flex gap-20 pl-4'>
            <Link to="/shop"className="hover:underline">Shop</Link>
            <Link to="/foundation" className="hover:underline">Foundation</Link>
            <Link to="/research" className="hover:underline">Research</Link>
            <Link to="/funding"className="hover:underline">Funding</Link>
        </div>
      </div>
      <div className="bg-[#202020] py-4 px-30 flex items-center justify-between">
        <button className="border px-4 py-1 text-sm uppercase">
          Log In | Sign Up &gt;
        </button>
        <div>
        <img
            src="../../assets/Logo (1).png"
            alt="Infinito-logo"
        />
        </div>
        <div className="flex items-center gap-4">
          <input
          type="text"
          placeholder="INFINITO ULTIMATE >"
          className="bg-[#FFFFFF] border-black text-black placeholder-black px-8 py-2 focus:outline-none"
        />
          <FiSearch className="text-white text-xl cursor-pointer hover:text-gray-300" />
        </div>
      </div>
      <div className="bg-[#202020] border-t border-white/20 text-sm">
        <div className="flex justify-center space-x-6 py-2 uppercase tracking-wide">
          <Link to="/" className="hover:underline">Home</Link>
          <span>|</span>
          <Link to="comics" className="hover:underline">Comics</Link>
          <span>|</span>
          <Link to="characters" className="hover:underline">Characters</Link>
          <span>|</span>
          <Link to="community" className="hover:underline">Community</Link>
          <span>|</span>
          <Link to="news" className="hover:underline">Blogs & News</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
