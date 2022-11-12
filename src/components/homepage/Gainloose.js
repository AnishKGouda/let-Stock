import React, { useEffect,useState } from "react";

const Gainloose = () => {


  let famous ={}

  const host="http://localhost:3001"
      const [stocks, setstock] = useState(famous)
      //get all notes
      const getstocks= async ()=>{

        const response= await fetch(`${host}/api/stocks/fetchall`,
        {
          method:'GET',
          headers:{"auth-token":localStorage.getItem('token')}
        })
        let json=await response.json()
      //console.log(json)
        let newjson={}
      let counter=0
        for (let i=0;i<json.length;i++){
         // console.log(i) 
          let value=json[i]
            value= value["title"]   
               
           newjson[i]=value
                
         }
         console.log(newjson)

        setstock(newjson)
        
      
       
      }
   
  
  let gainers = 0;

  //console.log(stocks)
  const myObj =stocks
  //functions for getting dates
  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate() - 1;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  function getYesterdayDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate() - 2;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }

  //declaring objects and arrays for storing data
  let diffarr = {};
  let vollarr = {};
  let opennarr = {};
  let highharr = {};
  let lowwarr = {};
  let closeearr = {};
  let closearr = [];
  let difvalue = [];
  let volarr = [];
  let openarr = [];
  let higharr = [];
  let lowarr = [];
  let called = 0;
  //getting dates for data drilling
  let date = getCurrentDate();
  let ydate = getYesterdayDate();
  
  
  const fetchcompanies = async () => {
    
    //for loop that jumps +5 ....api convienience
    for (let i = called; i <= Object.keys(myObj).length; i++) {
      gainers++;
      //fetching values
      let response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${myObj[i]}&outputsize=compact&apikey=FS77N1CHBPTE25F5`
      );
      let data = await response.json();

      let value = data["Time Series (Daily)"][`${date}`]["4. close"];
      let yvalue = data["Time Series (Daily)"][`${ydate}`]["4. close"];
      let vol = data["Time Series (Daily)"][`${date}`]["7. dividend amount"];
      volarr.push(vol);
      let high = data["Time Series (Daily)"][`${date}`]["2. high"];
      higharr.push(high);
      let low = data["Time Series (Daily)"][`${date}`]["2. low"];
      lowarr.push(low);
      let open = data["Time Series (Daily)"][`${date}`]["2. open"];
      openarr.push(open);
      let diff = value - yvalue;
      difvalue.push(diff);
      closearr.push(value);

      //creating objects for pushing close,open ,high etc values
      diffarr[`${myObj[i]}`] = diff;
      opennarr[`${myObj[i]}`] = open;
      highharr[`${myObj[i]}`] = high;
      lowwarr[`${myObj[i]}`] = low;
      vollarr[`${myObj[i]}`] = vol;
      closeearr[`${myObj[i]}`] = value;

      if (gainers >= called + 5) {
        break;
      }
    }
    //sorting  arrays of values
    let diffkey = Object.keys(diffarr).sort(function (a, b) {
      return diffarr[b] - diffarr[a];
    });
    difvalue = difvalue.sort((a, b) => b - a);

    let volkey = Object.keys(vollarr).sort(function (a, b) {
      return vollarr[b] - vollarr[a];
    });
    volarr = volarr.sort((a, b) => b - a);

    let highkey = Object.keys(highharr).sort(function (a, b) {
      return highharr[b] - highharr[a];
    });
    higharr = higharr.sort((a, b) => b - a);

    called += 5;
    console.log(diffkey)
    console.log(difvalue)
   
   
  };
   
  



  return (
    <div>
      Gainloose
      <button className="btn-primary" onClick={fetchcompanies}>
        {" "}
        click
      </button>
      <button className="btn-primary" onClick={getstocks}>to fetch from db</button>
      


    </div>
  );
};

export default Gainloose;
