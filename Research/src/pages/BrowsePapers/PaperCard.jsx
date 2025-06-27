import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaperCard = ({ paper }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-7  mb-6 w-[100%]">
      <h2 className="text-lg font-semibold">{paper.title}</h2>
      <p className="text-red-600 font-medium">{paper.journalName}</p>
      <p className="text-sm mb-2">{paper.authors && Array.isArray(paper.authors)
    ? paper.authors.join(', ')
    : paper.authors}</p>
      <p className="text-sm text-gray-700 line-clamp-2 border-l-2 pl-2 whitespace-pre-wrap">
        {paper.abstract}
      </p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500"> {(() => {
    const date = new Date(paper.datePublished);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  })()}</p>
        <button
          onClick={() => navigate(`/paper/${paper._id}`)}
          className="border px-4 py-1 text-sm font-medium rounded hover:bg-black hover:text-white transition"
        >
          VIEW PAPER &gt;
        </button>
      </div>
    </div>
  );
};

export default PaperCard;
