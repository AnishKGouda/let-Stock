import React,{useContext} from 'react';
import NoteContext from "../NoteContext";
import { Link } from "react-router-dom";
const Searchele = (props) => {
   let {symbol,name}=props
   let context = useContext(NoteContext);
   const { setindi ,setstockname } = context;

   const setname=(symbol,name)=>{

    setindi(symbol)
    setstockname(name)
   }

   const addtodb=async(symbol,name)=>{
  
    try{      const response = await fetch(`http://localhost:3001/api/stocks/addstock`, {
     method: 'POST',
     headers: {
       "auth-token": sessionStorage.getItem('token'),
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({title:symbol,name:name})

   })
   console.log(response.status)
   
}
    catch{}

   }
  
 
  return (
    <div className='container my-3'> 
        <p> <Link to="/Stock" onClick={()=>setname(symbol,name)}>{symbol}   --- {name} </Link> <button className="btn-primary" onClick={()=>addtodb(symbol,name)}>add to favourite</button> </p>
    </div>
  )
}

export default Searchele