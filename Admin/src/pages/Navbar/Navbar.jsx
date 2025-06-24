import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo or Brand */}
        <Link to="/" className="text-2xl font-extrabold text-red-500 tracking-tight">
          Infinito Comics Admin
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-red-400 transition">Home</Link>
          <Link to="/create-news" className="hover:text-red-400 transition">Publish News</Link>
          <Link to="/all-news" className="hover:text-red-400 transition">All Articles</Link>
          <Link to="/about" className="hover:text-red-400 transition">About</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {/* Optional: implement mobile menu here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
