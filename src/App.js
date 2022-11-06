import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';


const App = () => {

  return (
    <>
    
    <Router>
     <Navbar/>
     
     <div className="container">
    <Routes>
      <Route path="/" element={ <Home />} />
       <Route path="/about" element={<About/> } />
      {/* // <Route path="/Login" element={<Login/> } />
      // <Route path="/Signup" element={<Signup/> } />
      // <Route path="/search" element={<Search/>}/>  */}
      
    </Routes>
    </div>
  </Router>
  </>  

  )
}

export default App
