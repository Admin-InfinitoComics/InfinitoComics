import React from 'react';
import membershipKitImage from '../../../assets/Images/Ultimate/MembershipKitImage.png';
import membershipKitRight from '../../../assets/Images/Ultimate/MembershipKitRight.png';  // Replace with actual path

const MembershipKitCard = () => {
  return (
    <div className='flex justify-center mt-28 px-4'>
      <div className="flex flex-col md:flex-row w-[90%] max-w-[80.625rem] justify-between items-center gap-6 bg-white px-10 py-12 shadow-md border">
        
        {/* Left Image */}
        <div className="md:w-[55%] w-full h-[25rem] flex items-center">
          <img
            src={membershipKitImage}
            alt="Membership Kit"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Details */}
<div className="md:w-[40%] w-full h-[25rem] mt-[0.2rem] pt-0.5 flex items-center">
  <img
    src={membershipKitRight} // Replace with actual image path
    alt="Infinito Kit Details"
    className="w-full h-full object-contain"
  />
</div>

      </div>
    </div>
  );
};

export default MembershipKitCard;
