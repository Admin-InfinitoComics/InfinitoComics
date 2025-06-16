import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import CharacterCarousel from '../pages/Home/CharacterCarousel'
import CharacterSpotlight from '../pages/Home/CharacterSpotlight'
import Spotlight from '../pages/Home/Spotlight'
import HeroSection from '../pages/Home/Merch'
import LandingMerch from '../pages/Home/LandingMerch'
const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <CharacterCarousel/>
      <CharacterSpotlight/>
      <Spotlight/>
      <HeroSection/>
      <LandingMerch/>
      <Footer/>
    </div>
  )
}

export default Body
