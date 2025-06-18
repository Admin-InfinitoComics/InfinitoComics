import React from 'react'


const upcomingEvents = () => {
  return (
      <div className="w-full flex justify-center pt-30 pb-15 bg-white">
      <div className="relative w-[1210px] h-[492px] overflow-hidden">
        {/* Event Image */}
        <img
          src="../../../assets/Images/upcomingEvent.png" // replace with your image
          alt="Comic Con Event Banner"
          className="w-full h-full object-center my-4 ml-15 mr-20"
        />

        {/* Countdown Overlay - moved towards right */}
        <div className="absolute bottom-6 right-20 flex gap-4">
          {/* DAYS */}
          <div className='flex flex-col'>
            <div className="flex flex-col items-center justify-center bg-black/70 w-16 h-16 rounded-md text-white text-center">
                <div className="text-3xl font-bold font-sans ">45</div>
          </div>
             <div className="text-sm uppercase text-white font-400 text-center">Days</div>
          </div>

          {/* HOURS */}
           <div className='flex flex-col'>
            <div className="flex flex-col items-center justify-center bg-black/70 w-16 h-16 rounded-md text-white text-center">
                <div className="text-3xl font-bold font-sans">45</div>
          </div>
             <div className="text-sm uppercase text-white font-400 text-center">Hours</div>
          </div>

          {/* MINS */}
           <div className='flex flex-col'>
            <div className="flex flex-col items-center justify-center bg-black/70 w-16 h-16 rounded-md text-white text-center">
                <div className="text-3xl font-bold font-sans">45</div>
          </div>
             <div className="text-sm uppercase text-white font-400 text-center">Mins</div>
          </div>

          {/* SECS */}
           <div className='flex flex-col'>
            <div className="flex flex-col items-center justify-center bg-black/70 w-16 h-16 rounded-md text-white text-center">
                <div className="text-3xl font-bold font-sans">45</div>
          </div>
             <div className="text-sm uppercase text-white font-400 text-center">Secs</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default upcomingEvents