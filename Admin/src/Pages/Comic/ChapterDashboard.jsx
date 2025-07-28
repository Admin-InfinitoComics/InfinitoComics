import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChapterDashboard = () => {
  const { comicId } = useParams();

  const [chapterData, setChapterData] = useState({});

  const handleChange = (e) => {

  };

  const handleSubmit = async (e) => {
    
  };

  return (
    <div className="p-8 max-w-2xl mx-auto mt-20 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Add Chapter to Comic</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Chapter Title"
          value={chapterData.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="chapterNumber"
          placeholder="Chapter Number"
          value={chapterData.chapterNumber}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Add Chapter
        </button>
      </form>
    </div>
  );
};

export default ChapterDashboard;
