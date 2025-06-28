import React from 'react'
import IronMan from '../../../assets/Images/IronMan.png' // Adjust the path as necessary
const Spotlight = () => {
  return (
    <>
    <div className="w-full px-50 py-12 bg-[#171717] h-[500px]">
      <div className='flex flex-col lg:flex-row gap-20 h-full'>
        <div className='text-white flex-1 flex-col justify-center '>
          <h1 className='uppercase text-8xl font-extrabold tracking-widest mb-16'>Spotlight</h1>
          <div className='w-full bg-white h-1 mb-16'></div>
          <h2 className='uppercase text-2xl font-bold'>Ryan Gosling</h2>
          <p className='mb-8'>First off, damn, ryan gosling. He looks so bad in that suit. Haha lol Also I dont know what to write here. So sorry. T_T. Byeeeee Also, I know, that you know, that i know, that you know, that i know, that you know, that i know!</p>
          <button className='border-2 px-8 py-2'>SEE MORE</button>
        </div>

        <div className='w-full flex-1 h-full'>
          <img src="https://ik.imagekit.io/3zs8cpwg3/image.png?updatedAt=1750751571477" 
          alt="Spotlight image" 
          className='h-full w-full'/>
        </div>

      </div>
    </div>
    </>
  )
}

export default Spotlight