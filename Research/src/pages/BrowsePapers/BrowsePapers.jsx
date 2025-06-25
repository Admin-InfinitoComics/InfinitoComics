import React, { useState } from 'react';
import FilterSideBar from './FilterSideBar';
import PaperCard from './PaperCard';

const mockPapers = [
  {
    id: 1,
    title: 'Title Of The Research Paper',
    journal: 'Journal Name',
    authors: 'Authors',
    content:
      "Content Stuff. One Day Spiderman Ate A Spider, He Choked On It. He Died. You Think That’s The End. NAAAAH! One Day Spiderman Ate A Spider, He Choked On It, He Died. You Think That’s The End.",
    date: 'June 25, 2025',
  },
  {
    id: 2,
    title: 'Another Great Paper',
    journal: 'Advanced Research Journal',
    authors: 'Dr. Jane Doe, Dr. John Smith',
    content:
      "This paper explores the use of quantum computing in solving large-scale optimization problems. The results indicate a significant improvement over traditional algorithms.",
    date: 'May 12, 2025',
  },
  {
    id: 3,
    title: 'AI Ethics in Practice',
    journal: 'Machine Learning Today',
    authors: 'Alice K., Bob M.',
    content:
      "Exploration of ethics in artificial intelligence systems deployed in real-world scenarios, including case studies and implications.",
    date: 'April 5, 2025',
  },
  {
    id: 4,
    title: 'More Research on AI',
    journal: 'Journal Name',
    authors: 'Dr. X, Dr. Y',
    content:
      "Further thoughts on artificial intelligence and its impact on society. This study focuses on user interaction and implications of automation.",
    date: 'March 20, 2025',
  },
  {
    id: 5,
    title: 'Design Systems & UX',
    journal: 'Design Monthly',
    authors: 'Lisa R., Mike D.',
    content:
      "A comprehensive guide to designing scalable systems with a UX-first approach.",
    date: 'February 8, 2025',
  },
  {
    id: 6,
    title: 'Neuroscience & Behavior',
    journal: 'Cognitive Sciences',
    authors: 'Professor Mindy Lee',
    content:
      "Understanding human behavior through the lens of neuroscience. Experiments and models discussed.",
    date: 'January 28, 2025',
  }
];

const BrowsePapers = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount(mockPapers.length);
  };

  const handleShowLess = () => {
    setVisibleCount(3);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center">
      <div className="flex flex-col h-screen w-2/3">

        {/* 🔹 Top Section */}
        <div className="w-full  py-6 border-b border-[#B5B5B5] mt-5">
          <h1 className="text-3xl font-bold mb-3">BROWSE OUR PAPERS</h1>
          <div className="flex space-x-6 text-sm">
            <button className="border-b-2 border-transparent hover:border-black transition pb-1 text-gray-700">Business</button>
            <button className="border-b-2 border-red-600 pb-1 text-red-600 font-semibold">Psychology</button>
            <button className="border-b-2 border-transparent hover:border-black transition pb-1 text-gray-700">Design</button>
          </div>
        </div>

        {/* 🔹 Bottom Section */}
        <div className="flex flex-1 overflow-y-auto overflow-x-hidden">
          
          {/* ⬅ Left Sidebar */}
          <div className="w-[30%] mb-10">
            <div className="w-[270px] pt-8">
              <FilterSideBar />
            </div>
          </div>

          {/* ➡ Right Content */}
          <div className="w-[70%] mb-10">
            <div className="flex-1 pt-8">
              {mockPapers.slice(0, visibleCount).map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}

              {/* Button Section */}
              <div className="mt-6 mb-6 text-center">
                {visibleCount < mockPapers.length ? (
                  <button
                    className="px-6 py-2 border mb-6 border-black text-sm hover:bg-black hover:text-white transition"
                    onClick={handleShowMore}
                  >
                    Show More
                  </button>
                ) : (
                  <button
                    className="px-6 py-2 mb-6 border border-black text-sm hover:bg-black hover:text-white transition"
                    onClick={handleShowLess}
                  >
                    Show Less
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BrowsePapers;
