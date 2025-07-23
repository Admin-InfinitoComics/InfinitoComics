import React from 'react'
import CharacterCarousel from '../Home/CharacterCarousel'
import Carousel from './Carousel'
import PremiumPlans from './PremiumPlans'
import NewComicsWeekly from './NewComicsWeekly'
import JoinUltimate from '../Home/JoinUltimate'
import CreatorAccess from './CreatorAccess'
import MembershipKitCard from './MembershipKitCard'
import Faqs from './Faqs'

const Ultimate = () => {
  return (
    <div>
      <Carousel/>
      {/* <PremiumPlans/> */}
      <NewComicsWeekly/>
      <CreatorAccess/>
      <MembershipKitCard/>
      <Faqs/>
      <JoinUltimate/>

    </div>
  )
}

export default Ultimate
