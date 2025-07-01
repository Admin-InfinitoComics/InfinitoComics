import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body'
import CreateBlog from './pages/CreateBlog';
import { Navigate } from 'react-router-dom';
import User from './Pages/UserList/UserList'
import AdminPublishResearch from './pages/Research/ResearchPage';

function App() {
  return (
    <>
    <BrowserRouter basename="/">
      <Routes>
        {/* Redirect root to /signin */}
        <Route path="/" element={<Body/>} />
        {/* SignIn page */}
        {/* <Route path="/signin" element={<SignIn />} /> */}
        {/* Main app structure */}
        <Route path="/app" element={<Body/>} />
        {/* Create blog at /createblog */}
        <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/users" element={<User/>}> </Route>
          <Route path="/postResearch" element={<AdminPublishResearch/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App