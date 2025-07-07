import React, { useState } from 'react';

function StoryCard({ title, date, content }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col justify-center text-center lg:text-left border-r-2 border-red-500 pr-8 pt-16">
      <h3 className="text-red-600 font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm font-semibold mb-3 tracking-wider">{date}</p>

      {/* Conditionally clamp or show full text */}
      <p
        className={`text-sm text-gray-800 leading-relaxed mb-4 ${
          !expanded ? 'line-clamp-3' : ''
        }`}
      >
        {content}
      </p>

      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="bg-red-600 text-white text-sm px-5 py-2 tracking-wider self-center lg:self-start hover:bg-red-700 transition"
      >
        {expanded ? 'SHOW LESS' : 'READ MORE'} &gt;
      </button>
    </div>
  );
}
