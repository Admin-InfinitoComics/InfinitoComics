import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar/Navbar';
import Home from '../pages/Home/home';
const Body = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />   

    </div>
  )
}

export default Body