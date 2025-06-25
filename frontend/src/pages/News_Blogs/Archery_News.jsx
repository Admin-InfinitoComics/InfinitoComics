import React, {useEffect, useState} from "react";
import { latestBlog } from "../../services/userServices";
import { Link } from "react-router-dom";
const ArcheryNews = () => {
    const [title, setTitle] = useState("WORLD ARCHERY CUP")
    const [subject, setSubject] = useState("Archery’s premier annual international circuit, the Hyundai Archery World Cup, enters its 19th season in 2025, with four stages in Centra Florida (USA), Shanghai (China), Antalya (Turkiye), and Madrid (Spain) from April to July, before the grand final in Nanjing (China) in October.")
    const [id, setId] = useState(":id");
    useEffect(() => {
      const getblog = async () => {
        try {
         const latest = await latestBlog();
          if (latest) {
            setTitle(latest.title);
            setSubject(latest.subject);
            setId(latest._id);
          }
        } catch (error) {
          console.error("Failed to fetch blog:", error.message);
        }
      }
      getblog();
    },[])
  return (
    <div className="ml-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-extrabold">LATEST UPDATES</h2>
        <Link to={`/news/${id}`} className="text-[#DD1215] font-bold text-sm cursor-pointer mr-50">
          VIEW MORE &gt;
        </Link>
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-start gap-6">
        <div className="bg-[#D9D9D9] w-full md:w-[500px] h-[250px]"></div>
        <div className="flex flex-col gap-2 max-w-xl">
          <h1 className="text-[#DD1215] text-3xl">
            {title}
          </h1>
          <p className="text-gray-700 text-sm leading-relaxed mt-5">
            {subject}
          </p>
          <Link to="/news/:id" className="text-red-600 font-semibold text-sm mt-10 cursor-pointer">
            READ MORE &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArcheryNews;
