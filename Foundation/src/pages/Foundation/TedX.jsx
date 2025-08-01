import React, { useState, useEffect } from "react";
import TedXimg1 from '../../assets/images/foundation/TedXimg1.png'
import TedXimg2 from '../../assets/images/foundation/TedXimg2.png'
import TedXimg3 from '../../assets/images/foundation/TedXimg3.png'
import TedXimg4 from '../../assets/images/foundation/TedXimg4.png'
import TedXShimmer from '../../shimmer/Foundation/TedXShimmer'
const TedX = () => {
      const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => setLoading(false), 2400); 
    }, []);
  return  loading?<TedXShimmer/>: (
    <>
          <div className="mb-16">
        <h1 className="font-sans text-center font-bold text-4xl text-red-600 transform scale-y-120">
          INFINITO AT PROFESSIONAL EVENTS
        </h1>
      </div>
    <div>

      <div className="text-center mb-16 ">
        <h1
          className="text-8xl font-black text-red-600 
                 tracking-tighter leading-none
                 [text-shadow:_0_5px_0_#7f1d1d]"
        >
          TED<sup>X</sup>
        </h1>
      </div>

    
            <div className=" mx-80 p-4">
              <p className="text-justify text-lg mx-5 my-2">At <strong className="text-red-600">Infinito</strong>, we believe in merging creativity with purpose by actively participating in world-class professional events like <strong className="text-red-600">TEDx</strong>.
              </p>
              <p className="text-justify text-lg m-5">As proud sponsors, we support platforms that inspire innovation, spark meaningful conversations, and empower communities.
              </p>
              <p className="text-justify text-lg m-5">Beyond sponsorship, we elevate these events by providing <strong className="text-red-600"> Cutting-Edge Photography and Videography Solutions</strong>, ensuring every impactful moment is beautifully captured and shared.
              </p>
              <p className="text-justify text-lg m-5">From the captivating ideas on stage to the dynamic energy behind the scenes, Infinito is dedicated to creating unforgettable experiences that leave a mark on audiences worldwide.
              </p>
              <p className="text-justify text-lg m-5">Our presence was it <strong className="text-red-600">NIT Raipur, Dayal Singh College, Delhi University</strong>
              </p>
            </div>
                     <div className="flex justify-center p-1 m-20">
                            <div className="grid grid-cols-4 gap-6 max-w-7xl">
                              <img
                                src={TedXimg1}
                                alt="Placeholder 1"
                                className="w-[500px] h-48 object-cover   shadow-sm"
                              />
                              <img
                                src={TedXimg2}
                                alt="Placeholder 2"
                                className="w-[500px] h-48 object-cover   shadow-sm"
                              />
                              <img
                                src={TedXimg3}
                                alt="Placeholder 3"
                                className="w-[500px] h-48 object-cover   shadow-sm"
                              />
                              <img
                                src={TedXimg4  }
                                alt="Placeholder 4"
                                className="w-[500px] h-48 object-cover   shadow-sm"
                              />
                    
                              
                            </div>
                          </div>



    </div>
    </>
  );
};

export default TedX;
