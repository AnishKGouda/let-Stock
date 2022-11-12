import React,{useState} from 'react'

const Add = () => {
const [note,setnote]=useState({title:""})

const onChange = (e) => {
  setnote({ ...note, [e.target.name]: e.target.value });
};


const handle=(e)=>{
  e.preventDefault();
  addtodb(note.title);
}
    const addtodb=async(title)=>{
  
     try{      const response = await fetch(`http://localhost:3001/api/stocks/addstock`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    })
    
}
     catch{}

    }


    const search=async()=>{
     //   const response= await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${nsearchbar}&apikey=`)
         console.log()
   
    }


    return (
    <>
      <form className="form-inline my-2  my-lg-0" onSubmit={search}>
      <input className="form-control mr-sm-2" name="searchbar" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success mx-2 my-2 my-sm-0"  type="submit">Search</button>
    </form>

    <input type="text" name="title" onChange={onChange}/>
    <button className="btn-primary" onClick={handle}>add new stock</button>
    </>
  )
}

export default Add
