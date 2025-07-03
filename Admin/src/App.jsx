import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Body from "./Components/Body";
import CreateBlog from "./pages/CreateBlog";
import User from "./Pages/UserList/UserList";
import Login from "./Auth/login"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          {/* Main app structure */}
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          {/* Create blog at /createblog */}
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/users" element={<User />}>
            {" "}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
