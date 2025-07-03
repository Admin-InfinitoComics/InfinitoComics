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
        <h2 className="text-3xl font-bold text-[#202020] mb-6 tracking-wide uppercase">Search for Papers</h2>

        <div className="flex items-end gap-20 flex-wrap">
          {/* 🔍 Search Input */}
          <div className="flex flex-col w-[320px] relative">
            <label className="text-sm font-semibold text-[#202020] mb-1 ">Search by Domain, Topic, Article</label>
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

          {/* 📘 Journal Input */}
          <div className="flex flex-col w-[320px] relative">
            <label className="text-sm mb-1 font-semibold text-[#202020] ">Journal / Book</label>
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

          {/* 👩‍🏫 Authors Input */}
          <div className="flex flex-col w-[320px] relative">
            <label className="text-sm font-semibold mb-1 text-[#202020] ">Authors</label>
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

          {/* 🔴 Search Button */}
          {/* <div>
            <button
              onClick={onSearch}
              className="bg-[#DD1215] text-white  px-9 py-[9px] text-[12px] h-[38px] w-[150px]  flex items-center gap-2 hover:bg-red-700 transition"
            >
              <Search className="w-3 h-3" />
              SEARCH
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default PaperSearchBar;
