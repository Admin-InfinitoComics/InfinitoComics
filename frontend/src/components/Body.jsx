import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import CharacterCarousel from '../pages/Home/CharacterCarousel'
import CharacterSpotlight from '../pages/Home/CharacterSpotlight'
import UpcomingEvents from '../pages/Home/UpcomingEvents'
import FoundationSection from '../pages/Home/FoundationSection'
import NewsletterSection from '../pages/Footer/Newsletter'
import DashboardPage from '../pages/Home/Dashboard'
import TodaySpotlight from '../pages/Home/TodaySpotlight'
import HeroSection from '../pages/Home/Merch'
import LandingMerch from '../pages/Home/LandingMerch'
import Spotlight from '../pages/Home/Spotlight'
import JoinUltimate from '../pages/Home/JoinUltimate'
import PremiumPlans from '../pages/Home/PremiumPlans'
import FanFavourite from '../pages/Home/FanFavourite'
import ExclusiveContent from '../pages/Home/ExclusiveContent'
const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <CharacterCarousel/>
      <CharacterSpotlight/>
      <TodaySpotlight/>
      <HeroSection/>
      <LandingMerch/>
      <JoinUltimate/>
      <PremiumPlans/>
      <FanFavourite/>
      <Spotlight/>
      <UpcomingEvents/>
      <FoundationSection/>
      <ExclusiveContent/>
      {/* <DashboardPage/> */}
      <NewsletterSection/>
      <Footer/>
    </div>
  )
}

export default Body
