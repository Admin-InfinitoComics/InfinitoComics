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
import AllNewsPage from './pages/News_Blogs/AllNewsDisplayPage';
function App() {
  
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
           <Route path="/community" element={<Community/>} />
            <Route path="/all-news" element={<AllNewsPage />} />

        </Route>
      </Routes>
      </BrowserRouter> 
      </Provider>
  
    </>
  )
}

export default App;
