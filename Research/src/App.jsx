import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { BrowserRouter, Routes } from 'react-router-dom';
import Body from './components/Body';
import Home from './pages/Home/Home';
import ResearchPlans from '../../frontend/src/pages/Research/Research';
function App() {

  return (
   <BrowserRouter basename="/" >
    <Routes>
      <Route path="/" element={<Body/>} >
      <Route path="/" element={<Home/>} />
      <Route path="ResearchPlans" element={<ResearchPlans/>} />
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
