import React from 'react';
import { useState } from 'react';
const ReadResearch = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };
  return (
    <div className="bg-[#fdfdfd] py-12 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12">

        {/* Left Section */}
        <div className="lg:w-9/12 w-full max-w-full text-justify">
          <p className="text-xl text-gray-500 italic mb-1">
            <span className="text-red-600 font-semibold">Journal</span> | Date Published
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-left">
            Title Of The Research Paper
          </h1>

          <p className="text-2xl text-gray-700 font-medium mb-2 text-left">Authors</p>

          <div className="flex gap-10 border-y border-gray-200 py-4 mb-6">
            <div>
              <p className="text-4xl  border-l-4 px-3 border-gray-200 text-red-600 font-bold leading-tight">7</p>
              <p className="text-sm text-gray-600">Citations</p>
            </div>
            <div>
              <p className="text-4xl border-l-4 border-gray-200 text-red-600 px-3 font-bold leading-tight">12</p>
              <p className="text-sm text-gray-600">Downloads</p>
            </div>
          </div>

          {/* Abstract */}
          <h2 className="text-2xl font-semibold mb-2 text-left">Abstract</h2>
          <p className="text-gray-800  leading-relaxed text-justify">
            Behavioral psychology has played a key role in shaping modern UX design by helping create
            digital experiences that guide user behavior and build long–term engagement. It is commonly
            used in habit-forming designs, where features like reminders, rewards, and habit loops
            encourage repeated use. At the same time, the growth of adaptive UX systems that use
            predictive analytics to personalize user experiences, has introduced new ways of responding
            to individual user needs in real–time.
          </p>
          <p className="text-gray-800 mb-2 leading-relaxed text-justify">
            This paper explores how behavioral psychology principles are used in user experience design
            for habit formation, and predictive analytics in adaptive UX systems. The study employs a
            literature review of key behavioral models, and case studies from real–world applications to
            identify similarities, differences and implications. By highlighting design patterns, engagement
            techniques, and potential risks, the research aims to offer actionable insights for UX
            designers striving to create effective, ethical, and user–centered digital experiences.
          </p>

          {/* Keywords */}
          <h3 className="text-xl font-semibold mb-1 text-left">Keywords:</h3>
          <p className="text-gray-700 mb-4 text-justify">
            Behavioral Psychology, UX Design, Habit Formation, Adaptive UX, Predictive Analytics, User Engagement.
          </p>

          {/* Introduction Section */}
          {/* Introduction Section */}
          <h2 className="text-xl font-semibold mb-2 text-left">Introduction</h2>

          <div className="relative overflow-hidden transition-all duration-300 ease-in-out">
            <div className={`${isUnlocked ? '' : 'max-h-[180px] overflow-hidden relative'}`}>
              <p className="text-gray-800 leading-relaxed text-justify">
                Behavioral psychology has played a key role in shaping modern UX design by helping create
                digital experiences that guide user behavior and build long–term engagement. It is commonly
                used in habit–forming designs, where features like reminders, rewards, and habit loops
                encourage repeated use. At the same time, the growth of adaptive UX systems that use
                predictive analytics to personalize user experiences, has introduced new ways of responding
                to individual user needs in real–time. This paper explores how behavioral psychology principles
                are used in user experience design, focusing on practical implications, data ethics, and
                measurable outcomes in user-centered digital design environments.
              </p>

              {/* Fade Gradient */}
              {!isUnlocked && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fdfdfd] to-transparent pointer-events-none" />
              )}
            </div>
          </div>

          {/* Styled GET FULL ACCESS Button */}
          {!isUnlocked && (
            <div className="text-center my-6">
              <button
                onClick={handleUnlock}
                className="text-xs uppercase mb-5 tracking-wider font-semibold text-black"
              >
                Get Full Access &gt;
              </button>
            </div>
          )}

          {/* References */}
          <h2 className="text-xl font-semibold mb-3 mt-10 text-left">References</h2>
          <ol className="text-sm text-gray-800 list-decimal list-inside space-y-4 text-justify">
            <li>
              Sun Y, Li WF, Chen NY, et al. Induction chemotherapy plus con-current chemoradiotherapy
              versus concurrent chemoradiotherapy alone in locoregionally advanced nasopharyngeal
              carcinoma: a phase 3, multicentre, randomised controlled trial. <i>Lancet Oncol.</i> 2016;17(11):1509-1520.
              <span className="text-red-600 italic"> doi:10.1016/s1470-2045(16)30410-7</span>
            </li>
            <li>
              Sun Y, Li WF, Chen NY, et al. Induction chemotherapy plus con-current chemoradiotherapy
              versus concurrent chemoradiotherapy alone in locoregionally advanced nasopharyngeal
              carcinoma: a phase 3, multicentre, randomised controlled trial. <i>Lancet Oncol.</i> 2016;17(11):1509-1520.
              <span className="text-red-600 italic"> doi:10.1016/s1470-2045(16)30410-7</span>
            </li>
            <li>
              Sun Y, Li WF, Chen NY, et al. Induction chemotherapy plus con-current chemoradiotherapy
              versus concurrent chemoradiotherapy alone in locoregionally advanced nasopharyngeal
              carcinoma: a phase 3, multicentre, randomised controlled trial. <i>Lancet Oncol.</i> 2016;17(11):1509-1520.
              <span className="text-red-600 italic"> doi:10.1016/s1470-2045(16)30410-7</span>
            </li>
            <li>
              Sun Y, Li WF, Chen NY, et al. Induction chemotherapy plus con-current chemoradiotherapy
              versus concurrent chemoradiotherapy alone in locoregionally advanced nasopharyngeal
              carcinoma: a phase 3, multicentre, randomised controlled trial. <i>Lancet Oncol.</i> 2016;17(11):1509-1520.
              <span className="text-red-600 italic"> doi:10.1016/s1470-2045(16)30410-7</span>
            </li>
            <li>
              Sun Y, Li WF, Chen NY, et al. Induction chemotherapy plus con-current chemoradiotherapy
              versus concurrent chemoradiotherapy alone in locoregionally advanced nasopharyngeal
              carcinoma: a phase 3, multicentre, randomised controlled trial. <i>Lancet Oncol.</i> 2016;17(11):1509-1520.
              <span className="text-red-600 italic"> doi:10.1016/s1470-2045(16)30410-7</span>
            </li>
          </ol>
        </div>

        {/* Right Section */}
        <div className="m-5 w-5/12 ">
          <div className="  p-10 shadow-xl rounded-sm bg-white">
            <h3 className="w-9/12 text-lg font-semibold mb-10">Buy Paper Now</h3>
            <p className="w-9/12 text-2xl font-medium mb-4">49.00</p>
            <button className="mb-15  border border-black px-4 py-2 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition ">
              Get Full Access &gt;
            </button>

            <h3 className="w-9/12 text-lg font-semibold mb-6">View Membership Plans</h3>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-10/12 mb-8 border-l-2 border-gray-200 pl-4 text-sm cursor-pointer hover:text-red-600 transition"
              >
                <p className="font-medium uppercase text-xs tracking-wider">Access via Institution &gt;</p>
                <p className="text-gray-600 mt-1">
                  The Description Of The Plan. How To Use It, Is It Available
                </p>
              </div>
            ))}

            <button className="w-7/12 border border-black px-4 py-2 text-sm font-semibold tracking-wide hover:bg-black hover:text-white transition">
              View All Plans &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadResearch;
