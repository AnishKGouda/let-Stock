import React,{useState} from 'react'
import NoteContext from './NoteContext'

const StockState = (props) => {
    const [indi, setindi] = useState("")
    const [stockname, setstockname] = useState("")

    return (
    <>  <NoteContext.Provider value={{indi,setindi,stockname,setstockname}}>
    {props.children}

</NoteContext.Provider></>
  )
}

export default StockState