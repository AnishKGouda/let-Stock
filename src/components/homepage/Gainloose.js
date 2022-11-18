import React, { useEffect,useState } from "react";
import Volume from "./Volume";

import {
  Link
  } from "react-router-dom";
const Gainloose = () => {


  let famous ={}
 // let stocknameobj={}

  const host="http://localhost:3001"
      const [stocks, setstock] = useState(famous)
      const [stocknameobj,setstocknameobj]=useState({})
      //get all notes
      const getstocks= async ()=>{

        const response= await fetch(`${host}/api/stocks/fetchall`,
        {
          method:'GET',
          headers:{"auth-token":localStorage.getItem('token')}
        })
        let json=await response.json()
      console.log(json)
        let newjson={}
    
        for (let i=0;i<json.length;i++){
         // console.log(i) 
          let value=json[i]
          let name=value["name"] 
            value= value["title"]   
          
           stocknameobj[value]=name
           newjson[i]=value
                
         }
         console.log(newjson)
        console.log(stocknameobj)
        setstock(newjson)
        
      
       
      }
   
  
  let gainers = 0;

  //console.log(stocks)
  const myObj =stocks
  //functions for getting dates
  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate() - 2;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  function getYesterdayDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate() - 3;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  //declaring objects and arrays for storing data
  let diffarr = {};
  let vollarr = {};
//  let opennarr = {};
 // let highharr = {};
 // let lowwarr = {};
 // let closeearr = {};
 // let closearr = [];
  let difvalue = [];


 // let openarr = [];
 // let higharr = [];
 // let lowarr = [];
  const [diffkey, setdiffkey] = useState([])
  const [diffvalue, setdiffvalue] = useState([])
  const [volarr, setvolarr] = useState([])
  const [volkey, setvolkey] = useState([])
  
  let called = 0;
  //getting dates for data drilling
  let date = getCurrentDate();
 // console.log(date)
  let ydate = getYesterdayDate();
  /////

   //have to put this function in a try catch to solve date error

  ///

  const fetchcompanies = async () => {
   
    try{
    //for loop that jumps +5 ....api convienience
    for (let i = called; i < Object.keys(myObj).length; i++) {
      gainers++;
      //fetching values
      let response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${myObj[i]}&outputsize=compact&apikey=FS77N1CHBPTE25F5`
      );
      let data = await response.json();

      let value = data["Time Series (Daily)"][`${date}`]["4. close"];

      let yvalue = data["Time Series (Daily)"][`${ydate}`]["4. close"];
      let vol = data["Time Series (Daily)"][`${date}`]["6. volume"];
      volarr.push(vol);
      //let high = data["Time Series (Daily)"][`${date}`]["2. high"];
      //higharr.push(high);
      //let low = data["Time Series (Daily)"][`${date}`]["2. low"];
      //lowarr.push(low);
      //let open = data["Time Series (Daily)"][`${date}`]["2. open"];
     // openarr.push(open);
      let diff = value - yvalue;
      difvalue.push(diff);
      //closearr.push(value);

      //creating objects for pushing close,open ,high etc values
      diffarr[`${myObj[i]}`] = diff;
      //opennarr[`${myObj[i]}`] = open;
      //highharr[`${myObj[i]}`] = high;
      //lowwarr[`${myObj[i]}`] = low;
      vollarr[`${myObj[i]}`] = vol;
     // closeearr[`${myObj[i]}`] = value;

      if (gainers > called + 5) {
        break;
      }
    }
    //sorting  arrays of values
     setdiffkey(Object.keys(diffarr).sort(function (a, b) {
      return diffarr[b] - diffarr[a];
    }))
    setdiffvalue(difvalue.sort((a, b) => b - a));

    setvolkey( Object.keys(vollarr).sort(function (a, b) {
      return vollarr[b] - vollarr[a];
    }));
    setvolarr ( volarr.sort((a, b) => b - a));
    
    // let highkey = Object.keys(highharr).sort(function (a, b) {
    //   return highharr[b] - highharr[a];
    // });
    // higharr = higharr.sort((a, b) => b - a);

    called += 5;
    

   } catch{}
   console.log(diffkey)
//    let element=document.getElementById("byvolume")

//    for (let i=0;i<=diffkey.length;i++){
     
//      element.innerHTML=`<p>${diffkey[i]}</p>`
//  }
  };
  const taketoInd=(element)=>{

  }
  



  return (
    <div >
      Gainloose
      <button className="btn-primary" onBlur={getstocks} onClick={fetchcompanies}>
        {" "}
        click
      </button>
     {/* <button className="btn-primary" onClick={getstocks}>to fetch from db</button> */}
      
      <div className="container " ><h3>trending by change in market</h3>
      <table>
      <tr>
        <th>name</th>
        <th>symbol</th>
        <th>change</th>
      </tr>
         {
              diffkey.map((element,Index)=>{
                return(
                  <tr key={Index}> <Link onClick={()=>taketoInd(element)}>
                  <td>{stocknameobj[element]}</td>    </Link> <td>{element}</td> <td>{diffvalue[Index]}</td>
              
                  </tr> 
                )
              })
            }
            </table>
                         
  </div>
  
  <div className="container " ><h3>trending by change in market</h3>
      <table>
      <tr>
        <th>name</th>
        <th>symbol</th>
        <th>change</th>
      </tr>
         {
              volkey.map((element,Index)=>{
                return(
                  <tr key={Index}>
                  <td>{stocknameobj[element]}</td> <td>{element}</td> <td>{volarr[Index]}</td>
                
                  </tr> 
                )
              })
            }
            </table>
                         
  </div>
    </div>
  );
};

export default Gainloose;
