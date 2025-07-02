import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { BrowserRouter, Routes } from 'react-router-dom';
import Body from './components/Body';
import Home from './pages/Home/Home';
import ResearchPlans from './pages/Home/Research'
import ReadResearch from './pages/ReadResearch/ReadResearch';
import Paper from './pages/BrowsePapers/Paper';
function App() {

  return (
   <BrowserRouter basename="/" >
    <Routes>
      <Route path="/" element={<Body/>} >
      <Route path="/" element={<Home/>} />
      <Route path="ResearchPlans" element={<ResearchPlans/>} />
      <Route path="ReadResearch" element={<ReadResearch/>} />\
      <Route path="/browseResearch" element={<Paper/>} />
      
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
