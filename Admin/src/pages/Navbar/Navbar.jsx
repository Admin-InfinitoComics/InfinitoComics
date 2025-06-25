import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="bg-red-600 text-white uppercase font-bold px-4 py-2 rounded-lg text-xl tracking-wider"
        >
          INFINITO
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 uppercase font-semibold text-sm">
          <Link
            to="/"
            className="text-white hover:text-red-500 transition duration-200 px-3 py-2"
          >
            HOME
          </Link>
          <Link
            to="/comics"
            className="text-white hover:text-red-500 transition duration-200 px-3 py-2"
          >
            COMICS
          </Link>
          <Link
            to="/characters"
            className="text-white hover:text-red-500 transition duration-200 px-3 py-2"
          >
            CHARACTERS
          </Link>
          <Link
            to="/community"
            className="text-white hover:text-red-500 transition duration-200 px-3 py-2"
          >
            COMMUNITY
          </Link>
          <Link
            to="/createblog"
            className="text-white hover:text-red-500 transition duration-200 px-3 py-2"
          >
            BLOGS & NEWS
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {/* Hamburger icon */}
            <div className="w-6 h-6 flex flex-col justify-between space-y-1">
              <span className="block h-0.5 w-full bg-white"></span>
              <span className="block h-0.5 w-full bg-white"></span>
              <span className="block h-0.5 w-full bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-95 backdrop-blur-lg absolute w-full left-0 top-full py-4 shadow-lg animate-slideDown">
          <div className="flex flex-col space-y-4 px-6 uppercase font-semibold text-sm">
            <Link
              to="/"
              onClick={toggleMenu}
              className="text-white hover:text-red-500 transition"
            >
              HOME
            </Link>
            <Link
              to="/comics"
              onClick={toggleMenu}
              className="text-white hover:text-red-500 transition"
            >
              COMICS
            </Link>
            <Link
              to="/characters"
              onClick={toggleMenu}
              className="text-white hover:text-red-500 transition"
            >
              CHARACTERS
            </Link>
            <Link
              to="/community"
              onClick={toggleMenu}
              className="text-white hover:text-red-500 transition"
            >
              COMMUNITY
            </Link>
            <Link
              to="/createblog"
              onClick={toggleMenu}
              className="text-white hover:text-red-500 transition"
            >
              BLOGS & NEWS
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;