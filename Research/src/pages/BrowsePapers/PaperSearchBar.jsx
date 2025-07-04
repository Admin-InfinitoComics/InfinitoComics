import React from 'react';
import { Search, X } from 'lucide-react';

const PaperSearchBar = ({
  searchText,
  setSearchText,
  journalText,
  setJournalText,
  authorText,
  setAuthorText,
  onSearch,
}) => {
  const handleClear = (fieldSetter) => {
    fieldSetter('');
    setTimeout(() => onSearch(), 0);
  };

  return (
    <div className="w-full bg-gray-100  py-6 ">
      <div className="flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-6 tracking-wide uppercase">
          Search for Papers
        </h2>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 🔍 Domain/Topic/Article */}
          <div className="flex flex-col relative">
            <label className="text-sm font-semibold text-[#202020] mb-1">
              Search by Domain, Topic, Article
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border bg-white border-gray-300 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-8"
            />
            {searchText && (
              <X
                className="absolute right-2 top-[36px] w-4 h-4 text-gray-500 cursor-pointer"
                onClick={() => handleClear(setSearchText)}
              />
            )}
          </div>

          {/* 📘 Journal/Book */}
          <div className="flex flex-col relative">
            <label className="text-sm font-semibold text-[#202020] mb-1">
              Journal / Book
            </label>
            <input
              type="text"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              className="border bg-white border-gray-300 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-8"
            />
            {journalText && (
              <X
                className="absolute right-2 top-[36px] w-4 h-4 text-gray-500 cursor-pointer"
                onClick={() => handleClear(setJournalText)}
              />
            )}
          </div>

          {/* 👩‍🏫 Authors */}
          <div className="flex flex-col relative">
            <label className="text-sm font-semibold text-[#202020] mb-1">
              Authors
            </label>
            <input
              type="text"
              value={authorText}
              onChange={(e) => setAuthorText(e.target.value)}
              className="border bg-white border-gray-300 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 pr-8"
            />
            {authorText && (
              <X
                className="absolute right-2 top-[36px] w-4 h-4 text-gray-500 cursor-pointer"
                onClick={() => handleClear(setAuthorText)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperSearchBar;
