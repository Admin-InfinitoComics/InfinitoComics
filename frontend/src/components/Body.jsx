import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import CharacterCarousel from '../pages/Home/CharacterCarousel'
import CharacterSpotlight from '../pages/Home/CharacterSpotlight'
import FanFavourite from '../pages/Home/FanFavourite'
import Spotlight from '../pages/Home/Spotlight'
import PremiumPlans from '../pages/Home/PremiumPlans'
import JoinUltimate from '../pages/Home/JoinUltimate'
import ExclusiveContent from '../pages/Home/ExclusiveContent'

const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <CharacterCarousel/>
      <CharacterSpotlight/>
      <JoinUltimate/>
      <PremiumPlans />
      <FanFavourite />
      <Spotlight />
      <ExclusiveContent/>
      <Footer/>
    </div>
  )
}

export default Body
