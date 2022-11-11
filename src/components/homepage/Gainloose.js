import React, { useEffect } from "react";

const Gainloose = () => {
  let gainers = 0;
  let famous =
    '{"0":"AAPL","1":"MSFT","2":"AMZN","3":"TSLA","4":"GOOGL","5":"GOOG","6":"BRK.B","7":"UNH","8":"JNJ","9":"XOM","10":"JPM","11":"META","12":"V","13":"PG","14":"NVDA","15":"HD","16":"CVX","17":"LLY","18":"MA","19":"ABBV","20":"PFE","21":"MRK","22":"PEP","23":"BAC","24":"KO"}';
  const myObj = JSON.parse(famous);
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

    let openkey = Object.keys(opennarr).sort(function (a, b) {
      return opennarr[b] - opennarr[a];
    });
    openarr = openarr.sort((a, b) => b - a);

    let closekey = Object.keys(closeearr).sort(function (a, b) {
      return closeearr[b] - closeearr[a];
    });
    closearr = closearr.sort((a, b) => b - a);

    called += 5;


   
  };
   
  

  useEffect(() => {}, []);

  return (
    <div>
      Gainloose
      <button className="btn-primary" onClick={fetchcompanies}>
        {" "}
        click
      </button>
      <button className="btn-primary" onClick={getCurrentDate}></button>
    </div>
  );
};

export default Gainloose;
