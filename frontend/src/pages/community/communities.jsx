import React from 'react'
import Banner from './Banner'
import CommunitySection from './CommunitySection'
import TrendingPosts from './TrendingPosts'
import FanArtSpotlight from './FanartSpotlight'
import EventsGallery from './Eventsgallery'
import JoinInnerCircle from './joinInnerCircle'
import UpcommingEvents from '../Home/UpcomingEvents'
import JoinUltimate from '../Home/JoinUltimate'
import Hero from './Hero'
const communities = () => {
  return (
    <div>
      <Banner />
      <CommunitySection/>
      <TrendingPosts/>
      <JoinInnerCircle/>
      <FanArtSpotlight/>
      <UpcommingEvents/>
      <Hero/>
      <EventsGallery/>
      <JoinUltimate/>
    </div>
  )
}

export default communities
