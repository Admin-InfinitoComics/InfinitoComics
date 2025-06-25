import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaperCard = ({ paper }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-7  mb-6 w-[100%]">
      <h2 className="text-lg font-semibold">{paper.title}</h2>
      <p className="text-red-600 font-medium">{paper.journal}</p>
      <p className="text-sm mb-2">{paper.authors}</p>
      <p className="text-sm text-gray-700 line-clamp-2 whitespace-pre-wrap">
        {paper.content}
      </p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">{paper.date}</p>
        <button
          onClick={() => navigate(`/paper/${paper.id}`)}
          className="border px-4 py-1 text-sm font-medium rounded hover:bg-black hover:text-white transition"
        >
          VIEW PAPER &gt;
        </button>
      </div>
    </div>
  );
};

export default PaperCard;
