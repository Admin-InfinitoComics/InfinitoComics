import React, {useState, useEffect}  from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar/Navbar'
import Footer from '../pages/Footer/Footer'
import LogoLoader from '../components/loader/logoLoader'; 

const Body = () => {

  const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); 
  
      return () => clearTimeout(timer);
    }, []);
    if (loading) {
      return <LogoLoader />;
    }

  return (
    <div>      
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
