import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Body from './components/Body';
import CreateBlog from './pages/Blogs/CreateBlog.jsx';
import User from './Pages/UserList/UserList';
import Home from './Pages/Home/home.jsx';
import FAQManager from './Pages/Faq/FaqManager';
import Login from "./Auth/login"
import Characters from './Pages/Characters/CharacterManager.jsx'
import Career from './Pages/career/career'
import Comic from './Pages/Comic/Comic.jsx'
import ChapterDashboard from './Pages/Comic/ChapterDashboard.js';

import TimeLine from './Pages/TimeLine/timeline';
import ComicChap from './pages/Comic/comicChapters.jsx'

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
          <Route path='/chapters/:chapId/open' element={<ChapterDashboard></ChapterDashboard>}></Route>
          <Route path="/chapters/:chapId/edit" element={<ChapterDashboard></ChapterDashboard>}></Route>
          {/* <Route path="/characters" element={<Characters/>} />         */}
          <Route path="/career" element={<Career />} />        
          <Route path="/login" element={<Login />} />   
          <Route path="/timeline" element={<TimeLine />} />   
          <Route path='/comicChap/:comicId/chapters' element={<ComicChap></ComicChap>}></Route>  
         </Route>  
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
