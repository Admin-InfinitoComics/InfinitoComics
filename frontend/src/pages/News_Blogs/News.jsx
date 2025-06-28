import React from 'react'
import JoinUltimate from '../Home/JoinUltimate'
import ArcheryNews from './Archery_News'
import All_news from './All_news'
import FoundationSection from './Foundation_Section'
const News = () => {
  return (
    <div>
        <ArcheryNews/>
        <All_news/>
        <FoundationSection/>
        <JoinUltimate/>
    </div>
  )
}

export default News