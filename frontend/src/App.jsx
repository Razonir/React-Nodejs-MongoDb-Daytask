import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import History from "./pages/History/History";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Setting from "./pages/Setting/Setting";
import Contact from "./pages/Contact/Contact";
function App() {
  return (
    <div className="fullpage">
      <div className="fullpage-content">
        <h1>DayTask</h1>
      </div>
      <div className="iphone">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/History" element={<History />}></Route>
            <Route path="/setting" element={<Setting />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path='*' element={<Home />}></Route>

          </Routes>
        </BrowserRouter>

      </div>
      <div className="fullpage-content">
        <h1>DayTask</h1>
      </div>
    </div>
  );
}

export default App;
