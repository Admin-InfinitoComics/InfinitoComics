import React, { useEffect, useState } from 'react';
import { getICBlogs } from '../../services/userServices';
import Trending from '../../constants/Trending';
import { Link } from 'react-router-dom';

const All_news = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getICBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch IC blogs:', error.message);
      }
    };
    fetchBlogs();
  }, []);

  return (
    
    <div className='flex flex-col lg:flex-row p-4 max-h-[1200px] w-full my-8'>
      <div className='flex flex-col lg:flex-row mx-20'>
        <div className='ml-30 h-full w-[80%]'>
          {blogs.map((item, index) => (
            <div key={index} className="flex flex-col lg:flex-row mb-6 pb-4 gap-8">
              <img
                src={item.news?.[0]?.imageUrl}
                alt="img news"
                className='w-full md:w-[500px] h-[250px] object-fill'
              />
              <div className='flex-1'>
                <h3 className="text-xl font-bold text-[#DD1215] mb-5">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.subject}</p>
                <Link to={`/news/${item._id}`} className="text-red-600 font-semibold text-sm mt-10 cursor-pointer">
                READ MORE &gt;
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-[#3C3C3C] mb-6 w-[40%] max-h-[1500px] overflow-y-auto scrollbar-hide mx-20'>
          <h1 className='text-center lg:rounded-3xl mb-4 text-[#FFFFFF] font-black text-2xl'>
            TRENDING NEWS
          </h1>
          <div className='space-y-4 px-10'>
            {Trending.map((item, index) => (
              <div key={index} className='flex flex-col h-40 mb-8'>
                <img
                  src={item.image}
                  alt="Trending news"
                  className='w-full rounded-lg object-cover'
                />
                <p className='text-[#C6C6C6] uppercase whitespace-pre-wrap break-words'>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default All_news;
