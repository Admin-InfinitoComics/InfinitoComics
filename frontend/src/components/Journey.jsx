import React from 'react';

const journeyData = [
    {
        date: 'AUGUST 2022',
        title: 'STARTED AT RAIPUR',
        content:
            'In 2022, Infinito started business at Raipur, Chhattisgarh and grew as a result of collaborative effort and contributions from individuals across India.',
        align: 'left',
    },
    {
        date: 'MAY 2023',
        title: 'CORE TEAM DEVELOPMENT',
        content:
            'With a determined mindset, we embarked on building a robust team to drive the growth of Infinito. Additionally, we achieved our first milestone by generating revenue through services in the AR/CG–XR industry.',
        align: 'right',
    },
    {
        date: 'AUGUST 2024',
        title: 'LONG–RUN PLANNING & INTEGRATION',
        content:
            'With a bold vision and unwavering dedication, we are launching an exciting range of technologies while advancing in-house automation and project pipelines, seamlessly integrating AR/AI, XR, and ML technologies.',
        align: 'left',
    },
    {
        date: 'JANUARY 2025',
        title: 'WE ARE LIVE!',
        content:
            'We are now live and committed to creating impactful solutions that drive the growth and development of the AR/CG–XR industry in India.',
        align: 'right',
    },
];

function Journey() {
    return (
        <div className=" flex justify-center">
            <div className="relative w-11/12 lg:w-2/3 ">
                <h2 className="text-start text-2xl font-bold mb-12 tracking-widest">
                    OUR JOURNEY
                </h2>

                {/* Central Vertical Line */}
                <div className="absolute left-1/2 transform -translate-x-1 bg-black w-[4px] h-fit z-0" />

                {journeyData.map((item, index) => (
                    <div
                        key={index}
                        className="group relative z-10 flex flex-row items-center py-8 sm:py-10 lg:py-16  "
                    >
                        {/* Left Side */}
                        {item.align === 'left' && (
                            <>
                                <div className="w-1/2 md:pr-6 text-right pr-4">
                                    <h3 className="text-red-600 font-bold text-sm sm:text-lg lg:text-xl">{item.title}</h3>
                                    <p className="text-sm sm:text-md text-gray-700 mt-4">{item.content}</p>
                                </div>
                                <div className="block w-1/2 pl-6 text-center text-3xl sm:text-5xl font-bold tracking-wider text-gray-800 leading-tight">
                                    <div>{item.date.split(' ')[0]}</div>
                                    <div>{item.date.split(' ')[1]}</div>
                                </div>

                            </>
                        )}

                        {/* Right Side */}
                        {item.align === 'right' && (
                            <>
                                <div className="block w-1/2 pr-6 text-center text-3xl sm:text-5xl font-bold tracking-wider text-gray-800 ">
                                    <div>{item.date.split(' ')[0]}</div>
                                    <div>{item.date.split(' ')[1]}</div>
                                </div>
                                <div className="w-1/2 pl-2 md:pl-6 right">
                                    <h3 className="text-red-600 font-bold text-sm sm:text-lg lg:text-xl">{item.title}</h3>
                                    <p className="text-sm sm:text-md text-gray-700 mt-4">{item.content}</p>
                                </div>
                            </>
                        )}

                        {/* Red Line Overlay on Hover */}
                        <div className="absolute left-1/2 transform -translate-x-1 w-[4px] h-full bg-black group-hover:bg-red-600 transition-all duration-300" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Journey;
