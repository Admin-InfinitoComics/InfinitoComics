import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import Body from './components/Body';
import Home from '../src/pages/Home/Home'
import Login from './pages/Login/Login';
import SignupWrapper from './pages/Signup/SignupWrapper';
import CareerInternship from './pages/Career&Internships/CareerMain'
import Community from './pages/community/communities'

function App() {
  
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        
        <Route path="/"  element={<Body/>} > 
           <Route path="/"  element={<Home/>} />
           <Route path="/login"  element={<Login/>} />
           <Route path="/signup"  element={<SignupWrapper/>} />
           <Route path="/careers" element={<CareerInternship/>} />
           <Route path="/community" element={<Community/>} />

        </Route>
      </Routes>
      </BrowserRouter> 
      </Provider>
  
    </>
  )
}

export default App;
