/**
 * ShimmerHomePage.jsx
 * Skeleton / shimmer UI for the Infinito landing page
 * ---------------------------------------------------
 * - Fully responsive across mobile, tablet and desktop.
 * - Uses only Tailwind utility classes (+ 1 tiny inline <style> tag).
 * - Replace this component with the real page content once data/images load.
 */

import React from "react";

const landingPageShimmer = () => {
  return (
    /* The whole skeleton pulses gently to signal loading */
    <div className="w-full min-h-screen animate-pulse bg-gray-900 text-white">
      {/* ----------  Top promo strip  ---------- */}
     
      {/* ----------  Hero section skeleton  ---------- */}
      <section className="relative w-full h-[60vh] md:h-[75vh] lg:h-screen overflow-hidden">
        {/* Dark backing for the missing background image */}
        <div className="absolute inset-0 bg-gray-700 shimmer" />

        {/* Semi‑transparent overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-60" />

        {/* Text placeholders */}
        <div className="relative z-10 max-w-7xl h-full mx-auto flex flex-col justify-center px-4 sm:px-6 lg:px-12">
          {/* Main title line */}
          <div className="h-12 w-5/6 sm:w-1/2 lg:w-1/3 bg-gray-600 rounded shimmer mb-4" />

          {/* Subtitle line */}
          <div className="h-12 w-4/6 sm:w-1/2 lg:w-1/3 bg-gray-600 rounded shimmer mb-6" />

          {/* Description block (3 lines tall) */}
          <div className="space-y-2 mb-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-full sm:w-5/6 lg:w-1/2 bg-gray-600 rounded shimmer"
              />
            ))}
          </div>

          {/* CTA button placeholder */}
          <div className="h-10 w-32 bg-gray-600 rounded shimmer" />
        </div>
      </section>

      {/* ----------  Global keyframes & shimmer helper  ---------- */}
      <style>
        {`
          /* Shimmer sweep animation (no external stylesheet needed) */
          @keyframes shimmer {
            0%   { background-position: -700px 0; }
            100% { background-position: 700px 0; }
          }
          /* Apply the moving gradient to any element with the "shimmer" class */
          .shimmer {
            background: linear-gradient(
              90deg,
              rgba(55, 65, 81, 0.9) 25%,
              rgba(75, 85, 99, 0.9) 37%,
              rgba(55, 65, 81, 0.9) 63%
            );
            background-size: 400% 100%;
            animation: shimmer 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default landingPageShimmer;
