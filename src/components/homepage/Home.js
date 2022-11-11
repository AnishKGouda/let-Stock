import { useEffect } from "react"
import React from 'react'
import Logger from "./Logger"
import './homepage.css'
import Gainloose from "./Gainloose"
const Home = () => {

  let token=localStorage.getItem("token")
  return (
    <div className="homebody">
  
   {!token?<Logger />:null}
    <div>Home</div>
    <Gainloose/>
    </div>
  )
}

export default Home