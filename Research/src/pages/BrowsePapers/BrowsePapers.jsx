import React, { useState, useEffect } from 'react';
import FilterSideBar from './FilterSideBar';
import PaperCard from './PaperCard';
import { researchBrowse } from '../../services/browseService';
import PaperSearchBar from './PaperSearchBar';
import PaperCardShimmer from './PaperCardShimmer';

const BrowsePapers = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [journalText, setJournalText] = useState('');
  const [authorText, setAuthorText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await researchBrowse();
        if (res && Array.isArray(res.data)) {
          setPapers(res.data);
          setFilteredPapers(res.data);
        } else {
          console.error("Invalid data format:", res);
          setPapers([]);
          setFilteredPapers([]);
        }
      } catch (error) {
        console.error("Failed to fetch papers:", error);
        setPapers([]);
        setFilteredPapers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  useEffect(() => {
    let filtered = papers.filter((paper) => {
      const matchTitle = searchText
        ? paper.title?.toLowerCase().includes(searchText.toLowerCase())
        : true;
      const matchJournal = journalText
        ? paper.journalName?.toLowerCase().includes(journalText.toLowerCase())
        : true;
      const matchAuthors = authorText
        ? paper.authors?.some(author =>
            author.toLowerCase().includes(authorText.toLowerCase())
          )
        : true;
      const matchCategory =
        selectedCategory === 'all'
          ? true
          : paper.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchTitle && matchJournal && matchAuthors && matchCategory;
    });

    setFilteredPapers(filtered);
    setVisibleCount(3);
  }, [searchText, journalText, authorText, papers, selectedCategory]);

  const handleShowMore = () => setVisibleCount(filteredPapers.length);
  const handleShowLess = () => setVisibleCount(3);

  const categories = ['all', 'business', 'psychology', 'design', 'development'];

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col w-full lg:w-2/3 min-h-screen">
        <PaperSearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          journalText={journalText}
          setJournalText={setJournalText}
          authorText={authorText}
          setAuthorText={setAuthorText}
        />

        {/* 🔹 Top Section */}
        <div className="w-full border-b border-[#B5B5B5] mt-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#202020] mb-3">BROWSE OUR PAPERS</h1>
          <div className="flex flex-wrap sm:space-x-6 gap-4 mt-6 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`border-b-2 pb-1 transition ${
                  selectedCategory === cat
                    ? 'border-[#DD1215] text-[#DD1215] font-semibold'
                    : 'border-transparent hover:border-black text-gray-700'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 Bottom Section */}
        <div className="flex flex-1">
          {/* ⬅ Sidebar disabled for now */}
          {/* <div className="w-[30%]">
            <div className="w-[270px] pt-8 sticky pb-20 top-24">
              <FilterSideBar />
            </div>
          </div> */}

          {/* ➡ Right Content */}
          <div className="w-full h-[calc(100vh-150px)] overflow-y-auto pr-1 sm:pr-2 pt-8 pb-20">
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <PaperCardShimmer key={index} />
                ))}
              </>
            ) : (
              <>
                {filteredPapers.length === 0 ? (
                  <p className="text-center text-gray-500 mt-4">No results found.</p>
                ) : (
                  filteredPapers.slice(0, visibleCount).map((paper) => (
                    <PaperCard key={paper._id} paper={paper} />
                  ))
                )}

                {/* Show More / Less */}
                {filteredPapers.length > 0 && (
                  <div className="mt-6 mb-6 text-center">
                    {visibleCount < filteredPapers.length ? (
                      <button
                        className="px-6 py-2 border mb-6 border-black text-sm hover:bg-black hover:text-white transition"
                        onClick={handleShowMore}
                      >
                        Show More
                      </button>
                    ) : (
                      filteredPapers.length > 3 && (
                        <button
                          className="px-6 py-2 mb-6 border border-black text-sm hover:bg-black hover:text-white transition"
                          onClick={handleShowLess}
                        >
                          Show Less
                        </button>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePapers;
