// src/components/LandingPage.jsx
import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-hidden relative">
      {/* 🔵 Animated Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-5 animate-ping"
          style={{ animationDuration: "10s" }}
        ></div>
      </div>

      {/* ✅ Center Glassmorphic Welcome Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-center rounded-2xl shadow-2xl p-10 w-full max-w-md transition-all duration-300 hover:shadow-indigo-500/20">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-indigo-200 drop-shadow">
            Welcome to the Admin Panel
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            You are successfully <span className="text-teal-300 font-semibold">logged in</span>!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
