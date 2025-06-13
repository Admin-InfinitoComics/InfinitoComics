import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from '../src/utils/appStore';
import Body from './components/Body';
import SignupPage from './pages/Login/Signup'
import Home from '../src/pages/Home/Home'
import Login from './pages/Login/Login';

function App() {
  
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        
        <Route path="/"  element={<Body/>} > 
           <Route path="/"  element={<Home/>} />
           <Route path="/login"  element={<Login/>} />
           <Route path="/signup"  element={<SignupPage/>} />
        </Route>
      </Routes>
      </BrowserRouter> 
      </Provider>
  
    </>
  )
}

export default App;
