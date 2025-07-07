import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import { addUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';

function App() {

   const dispatch = useDispatch();

useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const fromMain = urlParams.get("from");

  if (fromMain === "main" && window.opener) {
    console.log(" Requesting user from main app");
    window.opener.postMessage("request-user", "http://localhost:3001");

    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:3001") return;

      if (event.data?.type === "user-data") {
        try {
          const userData = JSON.parse(event.data.payload);
          dispatch(addUser(userData));
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("Got user from 3001:", userData);
        } catch (err) {
          console.error("Failed to parse user", err);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Proper cleanup
    return () => window.removeEventListener("message", handleMessage);
  }
}, [dispatch]);


  return (
    <>
    <Body/>

    </>
  )
}

export default App
