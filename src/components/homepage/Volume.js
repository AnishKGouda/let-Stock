import React from 'react'

const Volume = (props) => {
 let{difvalue,element,index}=props

 
    return (
    <div>
        <p>{element}<span></span>
    {difvalue[index]}</p></div>
  )
}

export default Volume