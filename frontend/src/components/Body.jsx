import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import CharacterCarousel from '../pages/Home/CharacterCarousel'
import CharacterSpotlight from '../pages/Home/CharacterSpotlight'
import NewsletterSection from '../pages/Footer/Newsletter'
import DashboardPage from '../pages/Home/Dashboard'


const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <CharacterCarousel/>
      <CharacterSpotlight/>
      {/* <DashboardPage/> */}
      <NewsletterSection/>
      <Footer/>
    </div>
  )
}

export default Body
