import React,{useState} from 'react'
import NoteContext from './NoteContext'

const StockState = (props) => {
    const [indi, setindi] = useState("")
    const [stockname, setstockname] = useState("")
    const [diffkey, setdiffkey] = useState([]);
    const [diffvalue, setdiffvalue] = useState([]);
    const [volarr, setvolarr] = useState([]);
    const [volkey, setvolkey] = useState([]);
    const [gdata, setgdata] = useState([])
  const [dailydata, setdailydata] = useState({})
  const [forgotemail, setforgotemail] = useState("")

    return (
    <>  <NoteContext.Provider value={{forgotemail,setforgotemail,indi,setindi,stockname,setstockname,diffkey,diffvalue,volarr,volkey,setdiffkey,setdiffvalue,setvolarr,setvolkey,gdata,setgdata,dailydata,setdailydata}}>
    {props.children}

</NoteContext.Provider></>
  )
}

export default StockState