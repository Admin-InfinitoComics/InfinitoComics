// NewsDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { getBlogsById } from '../../services/userServices'; 
import Trending from '../../constants/Trending';

const NewsDetails = () => {
  const { id } = useParams();
  console.log("id", id)
  const navigate = useNavigate();
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogsById(id);
        setSelectedNews(blog.data);
      } catch (error) {
        console.error("Failed to fetch blog:", error.message);
      }
    };

    fetchBlog();
  }, [id]);

  if (!selectedNews) return <div className="text-center mt-10">Article not found</div>;

  console.log(selectedNews.title, selectedNews.subject, selectedNews.authorName)

  return (
    <div className="max-w-6xl mx-auto p-0.5 flex flex-col lg:flex-row gap-8">
      <div className="flex-2">
        <button onClick={() => navigate(-1)} className="text-sm hover:underline mb-8">
          ← Back to Blogs & News
        </button>

        <h1 style={{ fontFamily: 'DM Sans', fontWeight: '900', color: '#DD1215', fontSize:'3rem' }}>
          {selectedNews.title}
        </h1>

        <p style={{ fontFamily: 'DM Sans', fontWeight: '500', color: '#111111', marginBottom : '1rem' , fontSize:'1.2rem'}}>
          {selectedNews.subject}
        </p>

        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <FaRegUserCircle className='text-3xl'/>
          <p className='text-xl'>
            By <span className="font-semibold">{selectedNews.authorName}</span>&nbsp;&nbsp; -   &nbsp;&nbsp;
            {new Date(selectedNews.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-20'>
          <div className='flex-1'>
           {selectedNews.news?.map((item, idx) => (
            <div key={idx} className="mb-6 flex-col">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt="news"
                  className="w-200 mx-left rounded-lg mb-4"
                />
              )}
              <p
                style={{
                  fontFamily: 'DM Sans',
                  fontWeight: '500',
                  color: '#111111',
                  marginBottom: '1.50rem',
                  fontSize: '1.2rem',
                }}
              >
                {item.story}
              </p>
            </div>
          ))}
          </div>

          <div className='bg-[#3C3C3C] mb-6'>
            <h1 className='text-center lg:rounded-3xl mb-4 text-[#FFFFFF] font-black text-2xl'>TRENDING NEWS</h1>
            {Trending.map((item, index) => (
              <div key={index} className='mb-4 flex-col ml-8 mr-8'>
                <img 
                  src={item.image} 
                  alt="Trending news" 
                  className='w-80 rounded-lg'
                />
                <pre className='text-[#C6C6C6] uppercase'>{item.title}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
