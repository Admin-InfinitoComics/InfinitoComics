import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../services/userServices';
import { Link } from 'react-router-dom';

const AllNewsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage => currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage => currentPage + 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center text-[#302626] mb-10">All News & Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        currentBlogs.map((blog) => (
          <Link to={`/news/${blog._id}`} key={blog._id} className="block w-full mb-4">
            <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              {blog.news?.[0]?.imageUrl && (
                <img
                  src={blog.news[0].imageUrl}
                  alt={blog.title}
                  className="w-full md:w-64 h-40 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#DD1215] mb-2">{blog.title}</h2>
                <p className="text-gray-700 text-sm">{blog.subject}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}

      
      {blogs.length > blogsPerPage && (
        <div className="flex justify-center mt-8 gap-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1 ? "bg-[#DD1215] text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages ? "bg-gray-300" : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllNewsPage;
