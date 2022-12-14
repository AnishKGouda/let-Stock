import React,{useEffect} from 'react'
import { json } from 'react-router-dom'

const Profile = () => {

let json
useEffect(() => {
  fetchuserdata()

},[])

const fetchuserdata=async()=>{
  const response = await fetch(`https://let-stock.vercel.app/api/auth/getuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    } 
  }
  )
   json=await  response.json()
   console.log(json)

} 
  
  return (
    <>Profile
    <div className="container">pic</div>
    <div className="container">Name :{json.name}</div>
    <hr />
    <div className="container">account verified :{json.verified}</div>
    </>
  )
}

export default Profile