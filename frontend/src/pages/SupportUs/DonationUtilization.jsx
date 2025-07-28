import React, { useState, useEffect } from 'react';
import { getAllStories } from '../../services/supportUs.js';
import { TbArrowBigRightLines, TbArrowBigLeftLines } from "react-icons/tb";

function DonationUtilization() {
  const [activeStory, setActiveStory] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const [visibleCount, setVisibleCount] = useState(2);

  const handleSwipe = (direction) => {
    if (direction === 'left' && activeStory < stories.length - 1) {
      setActiveStory(activeStory + 1);
      setExpanded(false);
    } else if (direction === 'right' && activeStory > 0) {
      setActiveStory(activeStory - 1);
      setExpanded(false);
    }
  };

  const [expandedStories, setExpandedStories] = useState({});
  const toggleExpand = (index) => {
    setExpandedStories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  //fetching stories from db
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const allStories = await getAllStories();
        setStories(allStories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    console.log("Stories on support us page: ", stories)
  }, [stories]);


  return (
    <div className="flex justify-center items-center ">
      <div className="w-11/12 lg:w-2/3 bg-white text-gray-800">

        {/* Heading */}
        <div className="text-start lg:text-center mb-12">
          <h2 className="text-2xl md:text-[1.9rem] font-bold tracking-widest md:mb-1 lg:mb-2">
            THIS IS HOW WE UTILIZE
          </h2>
          <p className="text-md md:text-xl font-medium text-gray-700 uppercase tracking-widest">
            Your Funds
          </p>
        </div>

        {/* --------- SMALL SCREENS: SWIPE VIEW --------- */}
        <div className="block lg:hidden relative">
          <div className="px-6 pb-16 transition-all duration-500 ease-in-out">
            <h3 className="text-red-600 font-semibold text-lg mb-1">
              {stories[activeStory]?.title}
            </h3>
            <p className="text-sm font-bold mb-4 tracking-wider">
              {stories[activeStory]?.eventDate &&
                new Date(stories[activeStory].eventDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).toUpperCase()}
            </p>

            <img
              src={stories[activeStory]?.imageUrl}
              alt={`Story ${activeStory + 1}`}
              className="w-full h-76 sm:h-84 lg:h-88 object-cover " loading='lazy'
            />
            <p className={`text-sm text-gray-700 leading-relaxed mb-4 ${!expanded ? 'line-clamp-3' : ''}`}>
              {stories[activeStory]?.description}
            </p>
            <button
              className="w-fit bg-red-600 text-white text-sm px-4 py-2 tracking-wider hover:bg-red-700 font-semibold cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'SHOW LESS' : 'READ MORE'} &gt;
            </button>
          </div>


          {/* Swipe Buttons */}
          <div className="flex justify-between px-6 mt-2">
            <button
              className="text-red-600 text-sm font-semibold"
              onClick={() => handleSwipe('right')}
              disabled={activeStory === 0}
            >
              {/* ◀ */}
              <TbArrowBigLeftLines />
            </button>
            <button
              className="text-red-600 text-sm font-semibold"
              onClick={() => handleSwipe('left')}
              disabled={activeStory === stories?.length - 1}
            >
              {/* ▶ */}
              <TbArrowBigRightLines />
            </button>
          </div>

          {/* Red Progress Bar */}
          <div className=" my-6 h-[3px] bg-red-100 mx-12 ">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${((activeStory + 1) / stories?.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* --------- LARGE SCREENS: GRID VIEW WITH VIEW MORE --------- */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-x-6 ">
          {stories?.slice(0, visibleCount).map((story, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 ? (
                <>
                  <div className="col-span-2 lg:grid lg:grid-cols-2 gap-x-6 group">
                    {/* Left Text Side */}
                    <div className="relative flex flex-col justify-center items-end text-center lg:text-right pr-8 pt-12">
                      <div
                        className="absolute top-0 right-0 w-[3px] h-full bg-black transition-all duration-300 group-hover:bg-red-600"
                      ></div>
                      <h3 className="text-red-600 font-semibold text-2xl mb-1">{story.title}</h3>
                      <p className="text-sm font-bold mb-4 tracking-wider">
                        {stories[activeStory]?.eventDate &&
                          new Date(stories[activeStory].eventDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }).toUpperCase()}
                      </p>
                      <p className={`text-md text-gray-700 leading-relaxed mb-6 ${!expandedStories[index] ? 'line-clamp-3' : ''}`}>
                        {story.description}
                      </p>
                      <button
                        onClick={() => toggleExpand(index)}
                        className="bg-red-600 font-semibold text-white text-sm px-5 py-2 tracking-wider hover:bg-red-700 transition w-fit cursor-pointer"
                      >
                        {expandedStories[index] ? 'SHOW LESS >' : 'READ MORE >'}
                      </button>
                    </div>

                    {/* Right Image Side */}
                    <div className="pt-12 ">
                      <img src={story?.imageUrl} alt={`Story ${index + 1}`} className="w-full h-76 sm:h-84 lg:h-88 object-cover " loading='lazy' />
                    </div>
                  </div>

                </>
              ) : (
                <>
                  <div className="col-span-2 lg:grid lg:grid-cols-2 gap-x-6 group">
                    <div className="relative pt-12 pr-8">
                      <div
                        className="absolute top-0 right-0 w-[3px] h-full bg-black transition-all duration-300 group-hover:bg-red-600"

                      ></div>
                      <img src={story?.imageUrl} alt={`Story ${index + 1}`} className="w-full h-76 sm:h-84 lg:h-88 object-cover " loading='lazy' />
                    </div>
                    <div className="flex flex-col justify-center text-left pt-12">
                      <h3 className="text-red-600 font-semibold text-2xl mb-1">{story.title}</h3>
                      <p className="text-sm font-bold mb-4 tracking-wider">
                        {stories[activeStory]?.eventDate &&
                          new Date(stories[activeStory].eventDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }).toUpperCase()}
                      </p>
                      <p className={`text-md text-gray-700 leading-relaxed mb-6 ${!expandedStories[index] ? 'line-clamp-3' : ''}`}>
                        {story.description}
                      </p>

                      <button
                        onClick={() => toggleExpand(index)}
                        className="bg-red-600 font-semibold text-white text-sm px-5 py-2 tracking-wider hover:bg-red-700 transition w-fit cursor-pointer"
                      >
                        {expandedStories[index] ? 'SHOW LESS >' : 'READ MORE >'}
                      </button>

                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* VIEW MORE Button (only for large screens) */}
        {visibleCount < stories?.length && (
          <div className="hidden lg:block text-center mb-16 pt-16">
            <button
              className="text-red-600 border-2 border-red-600 text-sm px-4 py-2 font-semibold tracking-widest transition cursor-pointer hover:text-white hover:bg-red-600"
              onClick={() => setVisibleCount(prev => Math.min(prev + 2, stories.length))}
            >
              VIEW MORE &gt;
            </button>
          </div>
        )}

        {/* End of Stories Message */}
        {visibleCount >= stories?.length && (
          <div className="hidden lg:block text-center mb-16 mt-16">
            <p className="text-gray-500 text-sm italic tracking-wider mt-5">
              You've reached the end of the stories for now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonationUtilization;
