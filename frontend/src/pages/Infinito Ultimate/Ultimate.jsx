import React from 'react'
import CharacterCarousel from '../Home/CharacterCarousel'
import Carousel from './Carousel'
import PremiumPlans from './PremiumPlans'
import NewComicsWeekly from './newComicsWeekly'
import JoinUltimate from '../Home/JoinUltimate'
import CreatorAccess from './CreatorAccess'
import MembershipKitCard from './MembershipKitCard'
import faq from '../../../../Research/src/pages/ReadResearch/ReadResearch'

const Ultimate = () => {
  return (
    <div>
      <Carousel/>
      <PremiumPlans/>
      <NewComicsWeekly/>
      <CreatorAccess/>
      <MembershipKitCard/>
      <JoinUltimate/>

    </div>
  )
}

export default Ultimate
