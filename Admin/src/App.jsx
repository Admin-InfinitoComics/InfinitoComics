import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Body from './components/Body';
import CreateBlog from './Pages/Blogs/CreateBlog';
import User from './Pages/UserList/UserList';
import Home from './Pages/Home/home.jsx';
import FAQManager from './Pages/Faq/FaqManager';
import Login from "./Auth/login"
import Comic from './Pages/Comic/Comic.jsx'
import Career from './Pages/career/career.jsx'
import ChapterDashboard from './Pages/Comic/ChapterDashboard.jsx';

import TimeLine from './Pages/TimeLine/timeline';

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
          <Route path="/comic" element={<Comic/>} /> 
          <Route path="/comic/:comicId/chapters" element={<ChapterDashboard />} />
          {/* <Route path="/characters" element={<Characters/>} />         */}
          <Route path="/career" element={<Career />} />        
          <Route path="/login" element={<Login />} />   
          <Route path="/timeline" element={<TimeLine />} />     
         </Route>  
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
