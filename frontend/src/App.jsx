import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import Body from './components/Body';
import Loggedin from './components/Homepage-loggedin/Body';
import Premium from './components/Homepage-premium/Body';
import Home from '../src/pages/Home/Home'
import Login from './pages/Login/Login';
import SignupWrapper from './pages/Signup/SignupWrapper';
import ForgotPassword from './pages/login/ForgotPassword';
import ResetPassword from './pages/login/ResetPassword';
import DashboardPage from './pages/Home/Dashboard';
import FeedbackForm from './pages/FeedbackForm/Feedback';


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
   

        </Route>
      </Routes>
      </BrowserRouter> 
      </Provider>
  
    </>
  )
}

export default App;
