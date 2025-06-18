import React from 'react'
// import { Outlet } from 'react-router-dom'
import Navbar from '../../pages/Navbar/Navbar'
import CharacterCarousel from '../../pages/Home/CharacterCarousel'
import { Outlet } from 'react-router-dom'
import FanFavourites from '../../pages/Home/FanFavourite'
import CharacterSpotlight from '../../pages/Home/CharacterSpotlight'
import TodaySpotlight from '../../pages/Home/TodaySpotlight'
import MerchHeroSection from '../../pages/Home/Merch'
import JoinUltimate from '../../pages/Home/JoinUltimate'

import Footer from '../../pages/Footer/Footer'

 import UpcomingEvents from '../../pages/Home/UpcomingEvents'
 import FoundationSection from '../../pages/Home/FoundationSection'
 import NewsletterSection from '../../pages/Footer/Newsletter'

import LandingMerch from '../../pages/Home/LandingMerch'
import PremiumPlans from '../../pages/Home/PremiumPlans'
import Spotlight from '../../pages/Home/Spotlight'

import ExclusiveContent from '../../pages/Home/ExclusiveContent'
const Body = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <FanFavourites/>
        <CharacterSpotlight/>
          <TodaySpotlight/>
        <CharacterCarousel/>
        <MerchHeroSection/>
           <LandingMerch/>
        <JoinUltimate/>
        <PremiumPlans/>
             <FanFavourites/>
             <Spotlight/>
               <UpcomingEvents/>
               
      <FoundationSection/>
               
      <ExclusiveContent/>
       <NewsletterSection/>
      <Footer/>  

 

    
        
    
    </div>
  )
}

export default Body
