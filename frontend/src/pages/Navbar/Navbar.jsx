import React from 'react';
import { FiSearch, FiUser } from 'react-icons/fi'; // <-- Added FiUser
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserIcon from '../../../assets/Images/UserIcon.png'; // <-- Import User Icon

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  return (
    <div className="text-white font-sans">
      {/* Top Banner */}
      <div className="bg-[#202020] text-white text-sm py-2 px-30 border-b border-gray-500 flex justify-between items-center">
        <div>
          Use code <span className="font-bold">INFIN25</span> to get 25% off on our shop!
        </div>
        <div className="flex gap-20 pl-4">
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/foundation" className="hover:underline">Foundation</Link>
          <Link to="/researchPlans" className="hover:underline">Research</Link>
          <Link to="/funding" className="hover:underline">Funding</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#202020] py-4 px-30 flex items-center justify-between">
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
            src="../../assets/Logo (1).png"
            alt="Infinito-logo"
          />
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="INFINITO ULTIMATE"
            className="bg-white/10 border border-white text-white placeholder-white px-6 py-3 rounded w-64 focus:outline-none"
          />
          <FiSearch className="text-white text-xl cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Bottom Nav */}
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
