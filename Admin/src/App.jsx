import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Body from './Components/Body';
import CreateBlog from './pages/CreateBlog';
import User from './Pages/UserList/UserList';
import Faq from './Pages/Faq/Faq';
import Home from './pages/Home/home';

function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        {/* Main app structure */}
        <Route path="/" element={<Body/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/createfaq" element={<Faq/>} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/users" element={<User/>}> </Route>
         </Route>  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App