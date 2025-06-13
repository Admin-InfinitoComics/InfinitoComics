import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignupPage from './pages/login/Signup'
import Login from './pages/login/login'
function App() {
  
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
