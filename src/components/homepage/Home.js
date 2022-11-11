import { useEffect } from "react"
import React from 'react'
import Logger from "./Logger"
import './homepage.css'
import Gainloose from "./Gainloose"
import Add from "./Add"
const Home = () => {

  let token=localStorage.getItem("token")
  return (
    <div className="homebody">
  
   {!token?<Logger />:null}
    <div>Home</div>
    <Add/>
    <Gainloose/>
    </div>
  )
}

export default Home