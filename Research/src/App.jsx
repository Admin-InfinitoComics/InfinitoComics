import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { BrowserRouter, Routes } from 'react-router-dom';
import Body from './components/Body';
import Home from './pages/Home/Home';
import ReadResearch from './pages/ReadResearch/ReadResearch';
import Research from './pages/Home/Research';
function App() {

  return (
   <BrowserRouter basename="/" >
    <Routes>
      <Route path="/" element={<Body/>} >
      <Route path="/" element={<Home/>} />
      <Route path="Research" element={<Research/>} />
      <Route path="ReadResearch" element={<ReadResearch/>} />
      
           

      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
