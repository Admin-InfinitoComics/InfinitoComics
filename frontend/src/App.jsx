import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import Body from './components/Body';
import Loggedin from './components/Homepage-loggedin/Body';
import Premium from './components/Homepage-premium/Body';
import Home from '../src/pages/Home/Home';
import Login from './pages/login/login'
import SignupWrapper from './pages/Signup/SignupWrapper';
import News from './pages/News_Blogs/News';
import CareerInternship from './pages/Career&Internships/CareerMain'
import Community from './pages/community/communities'
import ForgotPassword from './pages/login/ForgotPassword';
import ResetPassword from './pages/login/ResetPassword';
import DashboardPage from './pages/Home/Dashboard';
import FeedbackForm from './pages/FeedbackForm/Feedback';
import News_Display from './pages/News_Blogs/News_Display';
import SupportUs from './pages/SupportUs/Index.jsx'
import Ultimate from './pages/Infinito Ultimate/Ultimate';
import { useEffect } from 'react';
import Jobs from './pages/Career&Internships/jobs'
import AllNewsPage from './pages/News_Blogs/AllNewsDisplayPage';

function App() {
useEffect(() => {
  const listener = (event) => {
    const allowedOrigins = ["http://localhost:3003", "http://localhost:3004"];
    if (!allowedOrigins.includes(event.origin)) return;

    if (event.data === "request-user") {
      const user = localStorage.getItem("user");
      if (user) {
        event.source.postMessage(
          { type: "user-data", payload: user },
          event.origin
        );
        console.log(" Sent user to:", event.origin, user);
      }
    }
  };

  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}, []);


  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        
        <Route path="/"  element={<Body/>} > 
          <Route path="/"  element={<Home/>} />
          <Route path="/login"  element={<Login/>} />
          <Route path="/loggedin"  element={<Loggedin/>} />
          <Route path="/Premium"  element={<Premium/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />    
          <Route path="/Feedback" element={<FeedbackForm/>} /> 
          <Route path="/Dashboard" element={<DashboardPage/>} /> 
          <Route path="/Reset-password" element={<ResetPassword/>} />
          <Route path="/signup"  element={<SignupWrapper/>} />
          <Route path="/news" element = {<News/>} />
           <Route path="/news/:id" element = {<News_Display/>} /> 
           <Route path="/"  element={<Home/>} />
            <Route path="/login"  element={<Login/>} />
             <Route path="/loggedin"  element={<Loggedin/>} />
           <Route path="/Premium"  element={<Premium/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />    
            <Route path="/Feedback" element={<FeedbackForm/>} /> 
            <Route path="/Dashboard" element={<DashboardPage/>} /> 
            <Route path="/Reset-password" element={<ResetPassword/>} />
           <Route path="/signup"  element={<SignupWrapper/>} />
           <Route path="/careers" element={<CareerInternship/>} />
           <Route path="/careers/apply" element={<Jobs/>} />
           <Route path="/community" element={<Community/>} />
           <Route path="/support-us" element={<SupportUs/>} />
<<<<<<< HEAD
           <Route path="/ultimate" element={<Ultimate/>} />
            <Route path="/all-news" element={<AllNewsPage />} />
=======

           <Route path="/ultimate" element={<Ultimate/>} />
            <Route path="/all-news" element={<AllNewsPage />} />

>>>>>>> f4ee27f5a0e25bed22b5e18debf717c9bd0638e1


        </Route>
      </Routes>
      </BrowserRouter> 
      </Provider>
  
    </>
  )
}

export default App;
