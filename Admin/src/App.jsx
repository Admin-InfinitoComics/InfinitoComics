import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Body from './Components/Body';
import CreateBlog from './pages/CreateBlog';
import User from './Pages/UserList/UserList';
import Home from './pages/Home/home';
import FAQManager from './Pages/Faq/FaqManager';
import Login from "./Auth/login"
import Timeline from './Pages/SupportUs/Timeline.jsx'


function App() {
  return (
    <>

    <BrowserRouter basename="/">
      <Routes>
        {/* Main app structure */}
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/createfaq" element={<FAQManager/>} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/users" element={<User/>}> </Route>
          <Route path="/login" element={<Login />} />  
          <Route path="/timeline" element={<Timeline/>} />  

         </Route>  
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
