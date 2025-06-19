import React from 'react';
import LandingComponent from './LandingComponent';
import CharacterCarousel from './CharacterCarousel';
import CharacterSpotlight from './CharacterSpotlight';
import TodaySpotlight from './TodaySpotlight';
import HeroSection from './Merch';
import LandingMerch from './LandingMerch';
import JoinUltimate from './JoinUltimate';
import PremiumPlans from './PremiumPlans';
import FanFavourite from './FanFavourite';
import Spotlight from './Spotlight';
import UpcomingEvents from './UpcomingEvents';
import FoundationSection from './FoundationSection';
import ExclusiveContent from './ExclusiveContent';
import NewsletterSection from '../Footer/Newsletter';

const Home = () => {
  return (
    <div>
      <LandingComponent/>
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
    </div>
  )
}

export default Home