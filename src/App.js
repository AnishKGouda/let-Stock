import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/homepage/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Signup

from "./components/Signup";
import Add from "./components/homepage/Add";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />

        <div >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
           <Route path="/search" element={<Add/>}/>  
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
