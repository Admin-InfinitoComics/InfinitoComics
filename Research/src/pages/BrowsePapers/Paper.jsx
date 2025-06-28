import React from 'react'
import PaperSearchBar from './PaperSearchBar'
import BrowsePapers from './BrowsePapers'
import ResearchPlans from '../Home/Research'
import InfinitoCarousel from './InfinitoResearch'
// import InfinitoResearch from './InfinitoResearch'


const Paper = () => {
  return (
    <div>
      {/* <InfinitoResearch/> */}
      <InfinitoCarousel/>
      <BrowsePapers/>
    </div>
  )
}

export default Paper
