import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Body from './Components/Body'
import CreateBlog from './pages/CreateBlog'
import SignIn from './pages/login/login'

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Redirect root to /signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        {/* SignIn page */}
        <Route path="/signin" element={<SignIn />} />
        {/* Main app structure */}
        <Route path="/app" element={<Body/>} />
        {/* Create blog at /createblog */}
        <Route path="/createblog" element={<CreateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App