import React from "react";
import PTI from "../../assets/images/foundation/PTI.png";
import groupPic from "../../assets/images/foundation/groupPic.png";
const PressTrust = () => {
  return (
    <div>

      <div>
        <div>
          <h1 className="font-sans text-center font-bold text-4xl text-red-600 transform scale-y-120">
            PTI - PRESS TRUST OF INDIA
          </h1>
        </div>

        <span className="flex justify-center items-center w-full h-full">
          <img src={PTI} alt="PTI" className="max-w-full h-auto" />
        </span>
      </div>

        <div className=" mx-80 p-4 ">
            <p className="text-justify text-lg mb-8">INFINITO extends its heartfelt gratitude to the <strong className="text-red-600">Press Trust of India (PTI) </strong>for entrusting us with the opportunity to provide <strong className="text-red-600">Technical Support</strong>. It is an honor to collaborate with one of India's most prestigious and trusted news organizations. We are also proud to host Online connection to honorable Transport Minister <strong className="text-red-600">Sri Nitin Gadkari Ji.</strong></p>


            <p className="text-justify text-lg">We are committed to delivering top-notch support and ensuring seamless operations for PTI across the country. This partnership reflects our dedication to excellence and our vision of empowering India's media and entertainment industry with innovative solutions.</p>

            
                    <span className="flex justify-center items-center w-full h-full my-18">
                      <img src={groupPic} alt="image" className="max-w-full h-auto" />
                    </span>
        </div>

    </div>
  );
};

export default PressTrust;
