import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import news from '../../constants/news';
import Trending from '../../constants/Trending';
import { FaRegUserCircle } from "react-icons/fa";
const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedNews = news[parseInt(id) || 0];

  if (!selectedNews) return <div>Article not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-0.5 flex flex-col lg:flex-row gap-8">
      <div className="flex-2">
        <button onClick={() => navigate(-1)} className="text-sm hover:underline mb-8">
          ← Back to Blogs & News
        </button>

        <h1 className="text-5xl font-bold text-[#DD1215] mb-2">
          {selectedNews.title}
        </h1>

        <p className="text-[#1111111] text-lg mb-4">
          {selectedNews.subject}
        </p>
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <FaRegUserCircle />
          <p>
            By <span className="font-semibold">{selectedNews.author}</span> - {selectedNews.date}
          </p>
        </div>
        <div className='flex flex-col lg:flex-row gap-20'>
          <div className='flex-1'>
        {selectedNews.news1.map((item, idx) => (
          <div key={idx} className="mb-6 flex-col">
            <img
              src={item.imageurl}
              alt="news"
              className="w-150 mx-left  rounded-lg mb-4"
            />
            <pre className="text-gray-800 whitespace-pre-line text-justify">{item.description}</pre>
          </div>
        ))}
        </div>
        <div className='bg-[#3C3C3C] mb-6'>
          <h1 className='text-center lg:rounded-3xl mb-4 text-[#FFFFFF] font-black text-2xl'>TRENDING NEWS</h1>
          {
            Trending.map((item, index) => (
              <div key={index} className='mb-4 flex-col ml-8 mr-8'>
                <img 
                src={item.image} 
                alt="Trending news" 
                className='w-80 rounded-lg'
                />
                <pre className='text-[#C6C6C6] uppercase'>{item.title}</pre>
              </div>
            ))
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
