import React from 'react';
import { Search } from 'lucide-react';

const PaperSearchBar = () => {
  return (
    <div className='w-full bg-gray-100 flex justify-center' >
    <div className=" py-6 w-2/3 ">
      <h2 className="text-2xl font-bold mb-6 tracking-wide uppercase">Search for Papers</h2>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Search by Domain, Topic, Article</label>
          <input
            type="text"
            className="border border-gray-300 rounded-sm px-3 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Journal / Book</label>
          <input
            type="text"
            className="border border-gray-300 rounded-sm px-3 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Authors</label>
          <input
            type="text"
            className="border border-gray-300 rounded-sm px-3 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <button className="bg-red-600 text-white px-6 py-2 rounded-sm flex items-center hover:bg-red-700 transition">
          <Search className="w-4 h-4 mr-2" />
          Search
        </button>
      </div>
    </div></div>
  );
};

export default PaperSearchBar;
