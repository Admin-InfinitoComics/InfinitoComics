import React, { useState } from 'react';
import chartDefault from '../../../assets/Images/SupportUs/chartDefault.png';
import chartExpanded from '../../../assets/Images/SupportUs/chartExpanded.png';

function FundsDistribution() {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <div className="flex justify-center items-cente ">
        <div className="w-11/12  lg:w-2/3 h-full bg-white text-center text-gray-800">
          <div className="w-full pt-16 text-black font-sans ">
            <h2 className="text-start text-2xl md:text-[1.9rem] font-bold mb-5">HOW WE DISTRIBUTE OUR FUNDS</h2>

            <div className="flex flex-col lg:flex-row items-center justify-center lg:items-center gap-6">
              {/* Donut Chart */}
              <div className="w-1/2 max-w-[50%] mx-auto lg:mx-0 bg-blue-500">
                <img
                  src={expanded ? chartExpanded : chartDefault}
                  alt="Fund Distribution Chart"
                  className="w-full h-auto"
                />
              </div>

              {/* Fund Categories */}
              <div className="w-full flex-1 space-y-16 ">
                {/* National Development */}
                <div className="relative border-l-4 border-[#DE1215] pl-2 text-start">
                  <span className="text-[#DE1215] absolute -top-7 -left-2 text-xl font-semibold">20%</span>
                  <h3 className="text-xl font-semibold text-black">
                    National Development
                  </h3>
                  {expanded !== 'national' ? (
                    <>
                      <div className="text-md text-[#4B5563] mt-1 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 ">
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-[#DE1215] inline-block"></span>
                          <span>Youth & Sports</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-[#DE1215] inline-block"></span>
                          <span>Environmental Protection</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-red-300 inline-block"></span>
                          <span>Child Protection</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-red-300 inline-block"></span>
                          <span>Social Justice & Women’s Rights</span>
                        </div>
                      </div>


                    </>
                  ) : (
                    <>
                      <ul className="list-none pl-7 text-md mt-2 text-[#4B5563] -space-y-1">
                        <li><span className='text-red-600 border-l-4 border-red-600 -ml-8 py-1 mr-2 pl-1'>20%</span>Youth & Sports</li>
                        <li><span className='text-red-500 border-l-4 border-red-500 -ml-8 py-1 mr-2 pl-1'>20%</span>Environmental Protection</li>
                        <li><span className='text-red-400 border-l-4 border-red-400 -ml-8 py-1 mr-2 pl-1'>20%</span>Child Protection</li>
                        <li><span className='text-red-300 border-l-4 border-red-300 -ml-8 py-1 mr-2 pl-1'>20%</span>Social Justice & Women’s Rights</li>
                      </ul>
                    </>

                  )}
                  {expanded !== 'national' ? (
                    <button
                      onClick={() => setExpanded('national')}
                      className="text-[11px] font-medium tracking-widest mt-2 absolute -bottom-5 -left-2 cursor-pointer hover:underline"
                    >
                      VIEW BREAKDOWN
                    </button>
                  ) : (
                    <button
                      onClick={() => setExpanded(null)}
                      className="text-[11px] font-medium tracking-widest mt-2 absolute -bottom-5 -left-2 cursor-pointer hover:underline"
                    >
                      VIEW LESS
                    </button>
                  )}

                </div>

                {/* Research & Innovation */}
                <div className="relative border-l-4 border-[#693434] pl-1 mt-8 text-start">
                  <span className="text-[#693434] absolute -top-7 -left-2 text-xl font-semibold">35%</span>
                  <h3 className="text-xl font-semibold text-black">
                    Research & Innovation
                  </h3>
                  {expanded !== 'research' ? (
                    <>
                      <div className="text-md text-[#4B5563] grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 ">
                        <div className="flex items-center space-x-1 ">
                          <span className="w-2 h-2 bg-gray-500 inline-block"></span>
                          <span>Future Technologies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-gray-500 inline-block"></span>
                          <span>Drone Technology & Robotics</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-gray-500 inline-block"></span>
                          <span>Social & Economic Research</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <ul className="list-none pl-8 text-md mt-2 text-[#4B5563] -space-y-1 ">
                        <li><span className='text-[#693434] border-l-4 border-[#693434] -ml-8 py-1 mr-2 pl-1'>20%</span>Future Technologies</li>
                        <li><span className='text-[#9d6c6c] border-l-4 border-[#9d6c6c] -ml-8 py-1 mr-2 pl-1'>20%</span>Drone Technology & Robotics</li>
                        <li><span className='text-[#bd9c9c] border-l-4 border-[#bd9c9c] -ml-8 py-1 mr-2 pl-1'>20%</span>Social & Economic Research</li>
                      </ul>
                    </>
                  )}
                  {expanded !== 'research' ? (
                    <button
                      onClick={() => setExpanded('research')}
                      className="text-[11px] font-medium tracking-widest mt-2 absolute -bottom-5 -left-2 cursor-pointer hover:underline"
                    >
                      VIEW BREAKDOWN
                    </button>
                  ) : (
                    <button
                      onClick={() => setExpanded(null)}
                      className="text-[11px] font-medium tracking-widest mt-2 absolute -bottom-5 -left-2 cursor-pointer hover:underline"
                    >
                      VIEW LESS
                    </button>
                  )}
                </div>

                {/* Development of Infinito Universe */}
                <div className="relative border-l-4 border-gray-400 pl-1 mt-8 text-start">
                  <span className="text-gray-400 absolute -top-7 -left-2 text-xl font-semibold">45%</span>
                  <h3 className="text-xl font-semibold text-black">
                    Development of Infinito Universe
                  </h3>
                  {expanded !== 'development' ? (
                    <>
                    <div className="text-md text-[#4B5563] grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 ">
                        <div className="flex items-center space-x-1 ">
                          <span className="w-2 h-2 bg-gray-400 inline-block"></span>
                          <span>Content Production</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-2 h-2 bg-gray-400 inline-block"></span>
                          <span>Technology Improvement</span>
                        </div>
                      </div>

                    </>
                  ) : (
                    <>
                      <ul className="list-none pl-4 text-md mt-2 text-[#4B5563] -space-y-1  ml-4">
                        <li><span className='text-gray-500 border-l-4 border-gray-500 -ml-8 py-1 mr-2 pl-1'>20%</span>Content Production</li>
                        <li><span className='text-gray-400 border-l-4 border-gray-400 -ml-8 py-1 mr-2 pl-1'>20%</span>Technology Improvement</li>
                      </ul>

                    </>
                  )}
                  {expanded !== 'development' ? (
                    <button
                      onClick={() => setExpanded('development')}
                      className="text-[11px] font-medium tracking-widest mt-2 absolute -bottom-5 -left-2 cursor-pointer hover:underline"
                    >
                      VIEW BREAKDOWN
                    </button>
                  ) : (
                    <button
                      onClick={() => setExpanded(null)}
                      className="text-[11px] font-medium tracking-widest mt-2 absolute -bottom-5 -left-2 cursor-pointer hover:underline"
                    >
                      VIEW LESS
                    </button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FundsDistribution;

