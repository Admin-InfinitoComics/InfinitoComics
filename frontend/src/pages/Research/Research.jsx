import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "What is Infinito Ultimate?",
    answer:
      "Infinito Ultimate gives you unlimited comics, premium content, animated series, free online games, exclusive releases, VIP event access, and a 100% ad–free reading experience.",
  },
  {
    question: "What all is included in Infinito Ultimate? ",
    answer:
      "Infinito Ultimate gives you unlimited comics, premium content, animated series, free online games, exclusive releases, VIP event access, and a 100% ad–free reading experience.",
  },
  {
    question: "How can I cancel my subscription?",
    answer:
      "You can cancel your subscription anytime from your account settings or contact our support team for help.",
  },
  {
    question: "What devices is Infinito Ultimate available on?",
    answer:
      "Infinito Ultimate is available on web, iOS, Android, and selected smart TVs.",
  },
  {
    question: "Is this suitable for kids?",
    answer:
      "Yes, Infinito Ultimate has a wide selection of kid-friendly content with parental controls.",
  },
];

export default function ResearchPlans() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      {/* Section with padding from navbar */}
      <div className="pt-30 pb-30 relative">
        <div className="relative flex flex-col md:flex-row items-center md:items-stretch">
          {/* Black background section with text */}
          <div className="flex flex-col md:flex-row w-full mx-auto bg-black overflow-hidden h-80 relative z-10">
            <div className="ml-33 text-white px-25 flex flex-col justify-center w-full md:w-1/2">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4 flex flex-wrap items-center">
                <img
                  src="../../../assets/Images/Foundation Logo.png"
                  alt="logo"
                  className="w-130 h-20 object-fill"
                />
              </h3>
              <h3 className="text-3xl font-bold  leading-relaxed max-w-md">
                Make your research seamless.
              </h3>
              <p>
                Get easy access to our wide range of papers, all at once!<br/>
                Join Research Plus today to unlock them all.
              </p>

              <a
            href="#"
            className="uppercase mt-4 text-md tracking-widest font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 w-max "
            >
            Join Now &rsaquo;
            </a>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full  md:absolute md:top-[-40px] md:right-[280px] max-w-[700px] z-20">
            <img
              src="../../../assets/Images/research/research+.png"
              alt="Archers"
              className="w-full h-[420px] object-cover shadow-xl"
            />
          </div>
        </div>
      </div>

      

      {/* Main content */}
      <div className="min-h-screen bg-white py-10  px-4 md:px-10  text-center">
        <h2 className="text-4xl  font-semibold text-black">
          Over <span className="text-red-600 font-bold">50+</span> Papers Across Major Fields
        </h2>
        <p className="text-md mt-5 text-black mb-6">
          Get a wide range of papers for your research.
        </p>
        
        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-10 mb-12 mx-auto">
          {cardImages.map((src, i) => (
            <div key={i} className="w-50 h-60 bg-[#D9D9D9] overflow-hidden shadow-sm">
              <img src={src} alt={`card-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-9/12 mx-auto pt-20 text-left">
          <h3 className="flex justify-center text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h3>
          <div className="divide-y-2 divide-[#7D7D7D]">
            {faqData.map((faq, index) => (
              <div key={index}>
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
        </div>
      </div>
    </>
  );
}
