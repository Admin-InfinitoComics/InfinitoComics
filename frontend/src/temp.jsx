import React from 'react'

const temp = () => {
  return (
    <div className='w-50 min-h-[700px] bg-slate-0 flex flex-col m-10'>
      
      {/* First clipped div with black border */}
      <div
        className='w-full min-h-[600px] bg-slate-400 border border-black'
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 94%, 0 100%)",
        }}
      ></div>

      {/* Second clipped div with black border */}
      <div
        className='w-full min-h-[100px] bg-slate-400 border  border-black'
        style={{
          clipPath: "polygon(0 38%, 100% 0, 100% 100%, 0 100%)",
        }}
      ></div>
    </div>
  )
}

export default temp
