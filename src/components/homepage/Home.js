import { useEffect,useState } from "react"
import React from 'react'
import Logger from "./Logger"
import './homepage.css'
import Gainloose from "./Gainloose"
import News from "./News"

const Home = () => {
  //dfghjk cvb
const [seed, setseed] = useState()
useEffect(() => {
 setseed(Math.random())
}, [])

  let token=sessionStorage.getItem("token")
  return (
    <div id={seed} className="homebody">
  
   {!token?<Logger  />:null}
    <div></div>
   
    <Gainloose/>
    <News/>
    </div>
  )
}

export default Home