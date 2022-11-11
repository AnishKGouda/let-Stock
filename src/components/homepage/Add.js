import React from 'react'

const Add = () => {
   

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
    </>
  )
}

export default Add
