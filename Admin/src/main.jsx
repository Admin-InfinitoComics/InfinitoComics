import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Career from './Pages/career/career.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Career />
  </StrictMode>,
)
