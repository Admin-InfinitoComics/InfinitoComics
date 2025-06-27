import React from 'react';
import { Search, X } from 'lucide-react';

const PaperSearchBar = ({
  searchText,
  setSearchText,
  journalText,
  setJournalText,
  authorText,
  setAuthorText,
  onSearch
}) => {

  const handleClear = (fieldSetter) => {
    fieldSetter(''); // clear the input
    setTimeout(() => onSearch(), 0); // wait for state to update before searching
  };

  return (
    <div className="w-full bg-gray-100 flex justify-between">
      <div className="flex flex-col py-6">
        <h2 className="text-2xl font-bold mb-6 tracking-wide uppercase">Search for Papers</h2>

        <div className="flex items-end gap-4 flex-wrap">
          {/* 🔍 Search Input */}
          <div className="flex flex-col w-[250px] relative">
            <label className="text-sm mb-1 font-medium">Search by Domain, Topic, Article</label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-gray-300 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-8"
            />
            {searchText && (
              <X
                className="absolute right-2 top-[36px] w-4 h-4 text-gray-500 cursor-pointer"
                onClick={() => handleClear(setSearchText)}
              />
            )}
          </div>

          {/* 📘 Journal Input */}
          <div className="flex flex-col w-[200px] relative">
            <label className="text-sm mb-1 font-medium">Journal / Book</label>
            <input
              type="text"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              className="border border-gray-300 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-8"
            />
            {journalText && (
              <X
                className="absolute right-2 top-[36px] w-4 h-4 text-gray-500 cursor-pointer"
                onClick={() => handleClear(setJournalText)}
              />
            )}
          </div>

          {/* 👩‍🏫 Authors Input */}
          <div className="flex flex-col w-[200px] relative">
            <label className="text-sm mb-1 font-medium">Authors</label>
            <input
              type="text"
              value={authorText}
              onChange={(e) => setAuthorText(e.target.value)}
              className="border border-gray-300 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-8"
            />
            {authorText && (
              <X
                className="absolute right-2 top-[36px] w-4 h-4 text-gray-500 cursor-pointer"
                onClick={() => handleClear(setAuthorText)}
              />
            )}
          </div>

          {/* 🔴 Search Button */}
          <div>
            <button
              onClick={onSearch}
              className="bg-red-600 text-white px-5 py-[9px] text-sm rounded-sm flex items-center gap-2 hover:bg-red-700 transition"
            >
              <Search className="w-4 h-4" />
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperSearchBar;
