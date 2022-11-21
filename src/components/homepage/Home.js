import { useEffect } from "react"
import React from 'react'
import Logger from "./Logger"
import './homepage.css'
import Gainloose from "./Gainloose"
import News from "./News"

const Home = () => {

  let token=sessionStorage.getItem("token")
  return (
    <div className="homebody">
  
   {!token?<Logger />:null}
    <div></div>
   
    <Gainloose/>
    <News/>
    </div>
  )
}

export default Home