import React from 'react';
import {
    Link
    } from "react-router-dom";
import './logger.css';

const logger = () => {
  return (
    <div className='logger'>
    <span className='loginbtn primary'><Link to="/Login" className='btn primary'>Login</Link></span>
    <span className='signupbtn primary  '><Link to="/Signup"  className='btn primary'>Signup</Link></span>
</div>
  )
}

export default logger