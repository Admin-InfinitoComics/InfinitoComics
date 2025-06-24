import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar/Navbar';
const Body = () => {
  return (
    <div>
        <Navbar></Navbar>
          <Outlet />   
    </div>
  )
}

export default Body