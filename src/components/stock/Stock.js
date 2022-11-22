import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../NoteContext";

const Stock = () => {

//variables for data
  const context = useContext(NoteContext);

  let { indi, stockname,setdailydata,dailydata,setdata,data } = context;
  const [open, setopen] = useState("");
  const [high, sethigh] = useState("");
  const [low, setlow] = useState("");
  const [close, setclose] = useState("");
  const [divident, setdivident] = useState("");
  const [volume, setvolume] = useState("");
const [qhigh, setqhigh] = useState("")
const [qlow, setqlow] = useState("")
const [qopen, setqopen] = useState("")
const [qclose, setqclose] = useState("")
const [qchange, setqchange] = useState("")
const [qprice, setqprice] = useState("")
const [qchangepercent, setqchangepercent] = useState("")
const [qvol, setqvol] = useState("")
const [qlastdate, setqlastdate] = useState("")









//for fetching data
  useEffect(() => {
    fetchdailydata(context.indi);
    globalQuote(context.indi)
  }, []);


  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate() - 1;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }
  let date = getCurrentDate();

//fetching global quote data

  const globalQuote= async (element)=>{
    let response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${element}&apikey=FS77N1CHBPTE25F5`
    );
    setdata ( await response.json());
  try {
    
  
    setqopen( data["Global Quote"]["02. open"])
    setqclose(data["Global Quote"]["08. previous close"])
     setqhigh(data["Global Quote"]["03. high"])
     setqlow(data["Global Quote"]["04. low"])
     setqprice(data["Global Quote"]["05. price"])
     setqvol(data["Global Quote"]["06. volume"])
     setqlastdate( data["Global Quote"]["07. latest trading day"])
   setqchange(data["Global Quote"]["09. change"])
     setqchangepercent(data["Global Quote"]["10. change percent"])
    
  } catch (error) {
    
  }

  }
  //fetching daily data
  const fetchdailydata = async (element) => {
    let response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${element}&outputsize=compact&apikey=FS77N1CHBPTE25F5`
    );
    setdailydata ( await response.json());
    try {
       
      setopen(dailydata["Time Series (Daily)"][`${date}`]["1. open"]);
      sethigh(dailydata["Time Series (Daily)"][`${date}`]["2. high"]);
      setlow(dailydata["Time Series (Daily)"][`${date}`]["3. low"]);
      setclose(dailydata["Time Series (Daily)"][`${date}`]["4. close"]);
      setvolume(dailydata["Time Series (Daily)"][`${date}`]["6. volume"]);
      setdivident(dailydata["Time Series (Daily)"][`${date}`]["7. dividend amount"]);
    } catch (error) {}
  };

  ///todo
  ////generating graphs 

///fetching weekly and  monthly data  
  return (
    <>
      <div>
        {indi}---{stockname}
      </div>
      <div className="container ">
       <h2>daily series data</h2>

        <div className="container">
          open :{open} <br />
          close :{close} <br />
          high :{high} <br />
          low :{low}
        </div>
        <div className="container">
          total volume :{volume}
          <br /> dividend amount :{divident}
        </div>
      </div>
      <div className="container"><h2>global Quote data</h2>
      <div className="container">
         open :{qopen} <br />
         close :{qclose}  <br />
        average price per stock :{qprice} <br />
         high :{qhigh}  <br />
         low :{qlow}   <br />
         volume :{qvol}   <br />
         last traded day of this stock: {qlastdate}  <br />
         change :{qchange}   <br />
         change percentage :{qchangepercent}

      </div>
    


<div className="graph">

<h3 align='center'>graph section
</h3>
</div>




       
      </div>
    </>
  );
};

export default Stock;
