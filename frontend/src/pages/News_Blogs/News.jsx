import React from 'react'
import JoinUltimate from '../Home/JoinUltimate'
import ArcheryNews from './Archery_News'
import All_news from './All_news'
import FoundationSection from './Foundation_Section'
import ArcherySlider from './ArcherySlider'
import Spotlight from '../../components/spotlight/Spotlight'
const News = () => {
  return (
    <div>
        <ArcheryNews/>
        <ArcherySlider/>
        <Spotlight/>
        <All_news/>
        <FoundationSection/>
        <ArcherySlider/>
        <JoinUltimate/>
    </div>
  )
}

export default News