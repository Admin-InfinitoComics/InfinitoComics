import React from 'react'
import banner from '../../assets/images/foundation/banner.png'

const Banner = () => {
  return (
    <div className='w-full min-h-[600px]'>
      <img src={banner} alt="banner" 
      className="w-full h-[600px] object-cover object-center"/>
    </div>
  )
}

export default Banner
