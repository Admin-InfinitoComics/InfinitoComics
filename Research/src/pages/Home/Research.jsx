import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import "./Research.css";
import ResearchCards from "./ResearchCards";

export default function Research() {
  const [faqData, setFaqData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loadingFaq, setLoadingFaq] = useState(true);
  const [errorFaq, setErrorFaq] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
  const fetchFAQs = async () => {
    try {
      console.log("🔥 useEffect started");

      const res = await axios.get("http://localhost:3000/faq");
      console.log("✅ API Response:", res);

      const data = res.data.data;
      if (!Array.isArray(data)) {
        console.error("❌ Unexpected data format");
        setErrorFaq("Invalid FAQ format");
        return;
      }

      setFaqData(data);
    } catch (err) {
      console.error("❌ Error fetching FAQs", err);
      setErrorFaq("Fetch failed");
    } finally {
      setLoadingFaq(false);
    }
  };

  fetchFAQs();
}, []);


  const cardImages = [
    "/img1.jpg",
    "/img2.jpg",
    "/img3.jpg",
    "/img4.jpg",
    "/img5.jpg",
    "/img6.jpg",
  ];

  return (
    <>
      {/* Hero Section */}
<div className="pt-10 pb-10 relative">
  <div className="relative flex flex-col md:flex-row items-center md:items-stretch">
    
    {/* Left Text Section */}
    <div className="flex flex-col md:flex-row w-full mx-auto bg-black overflow-hidden h-auto md:h-80 relative z-10">
      <div className="px-6 py-6 md:ml-[8rem] text-white flex flex-col justify-center w-full md:w-1/2">
        <h3 className="text-2xl md:text-4xl font-extrabold mb-4 flex items-center gap-2">
          <img
            src="../../../assets/Images/Foundation Logo.png"
            alt="logo"
            className="w-36 md:w-40 h-20 object-contain"
          />
        </h3>
        <h3 className="text-xl md:text-3xl font-bold leading-relaxed max-w-md">
          Make your research seamless.
        </h3>
        <p className="text-sm md:text-base">
          Get easy access to our wide range of papers, all at once!
          <br />
          Join Research Plus today to unlock them all.
        </p>
        <a
          href="#"
          className="uppercase mt-4 text-sm md:text-md tracking-widest font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 w-max rounded"
        >
          Join Now &rsaquo;
        </a>
      </div>
    </div>

    {/* Right image */}
    <div className="w-full md:absolute md:top-[-40px] md:right-[280px] max-w-[700px] z-20 px-6 md:px-0 mt-6 md:mt-0">
      <img
        src="../../../assets/Images/research/research+.png"
        alt="Research"
        className="w-full h-[280px] md:h-[420px] object-cover shadow-xl rounded-md"
      />
    </div>
  </div>
</div>

      <div>
        <ResearchCards/>
      </div>

      {/* Main Content */}
<div className="min-h-screen bg-white py-15 px-4 md:px-10 text-center">
  <h2 className="text-4xl font-semibold text-black">
    Over <span className="text-red-600 font-bold">50+</span> Papers Across Major Fields
  </h2>
  <p className="text-md text-black mb-10">
    Get a wide range of papers for your research.
  </p>

{/* Cards */}
<div className="max-w-6xl mx-auto mb-15">
  <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-10">
    {cardImages.map((src, i) => (
      <div
        key={i}
        className="w-full h-60 sm:w-52 bg-[#D9D9D9] overflow-hidden shadow-sm"
      >
        <img
          src={src}
          alt={`card-${i}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>


  {/* FAQ Section with updated styling */}
  <div className="max-w-10/12 mx-auto pt-20 text-left">
    <h3 className="flex justify-center text-4xl font-bold mb-4">
      Frequently Asked Questions
    </h3>
    {loadingFaq ? (
      <p className="text-center text-gray-500">Loading FAQs...</p>
    ) : errorFaq ? (
      <p className="text-center text-red-500">{errorFaq}</p>
    ) : faqData.length === 0 ? (
      <p className="text-center">No FAQs available.</p>
    ) : (
      <div className="divide-y-2 divide-[#7D7D7D]">
        {faqData.map((faq, index) => (
          <div key={faq._id || index}>
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-4 text-2xl font-bold text-black"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {openIndex === index && (
              <div className="pb-4 text-xl font-semibold text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
</div>
    </>
  );
}
