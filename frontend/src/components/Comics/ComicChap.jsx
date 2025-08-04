import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChapter } from "../../services/ComicService.js"; // adjust path as needed

const ComicChap = () => {
  const { comicId } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const getChapters = async () => {
      try {
        const data = await fetchChapter(comicId);
        console.log(data)
        setChapters(data);
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
      }
    };

    getChapters();
  }, [comicId]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 max-w-5xl mx-auto mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          All Chapters
        </h2>
        <div className="text-xs sm:text-sm text-gray-500">
          {chapters.length} chapter{chapters.length !== 1 ? "s" : ""} available
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {chapters.map((chap) => (
          <div
            key={chap._id}
            className="group bg-gray-50 hover:bg-white border-2 border-gray-200 hover:border-red-200 rounded-xl p-3 sm:p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 w-full">
                <div className="w-16 h-23 sm:w-20 sm:h-25 bg-gradient-to-br from-red-500 to-red-700 flex-shrink-0 flex items-center justify-center shadow-md">
                  <img src={chap.chapImage} alt="Chapter" className="w-full h-full object-contain border border-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                      {chap.title}
                    </h3>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                      <span>Chapter {chap.chapNum}</span>
                    </div>
                    {chap.releaseDate && (
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(chap.releaseDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {chap.views && (
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{chap.views > 1000 ? (chap.views / 1000).toFixed(1) + 'K' : chap.views} views</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicChap;
