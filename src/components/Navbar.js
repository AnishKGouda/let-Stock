import React from 'react';
import {
  Link
  } from "react-router-dom";
import { useState } from "react";
const Navbar = () => {
   
 let token=localStorage.getItem('token')

  const logout=()=>{
    localStorage.removeItem('token')
    window.location.reload()

  }


  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">Let'Stock</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Search">Search</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/About">About</Link>
      </li>
    </ul>
    {token?
  <button className="btn-primary" onClick={logout}>Logout</button>
:null
    }
  </div>

 
</nav>
    </>
  )
}

export default Navbar