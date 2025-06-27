import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './Components/Body';
import CreateBlog from './pages/CreateBlog';
import User from './Pages/UserList/UserList'
function App() {

  return (
    <>

        <BrowserRouter basename="/">
          <Routes>
              
              <Route path="/createblog" element={<CreateBlog/>}> </Route>
              <Route path="/users" element={<User/>}> </Route>
              
          </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
