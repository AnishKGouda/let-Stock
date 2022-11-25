import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../NoteContext";
import { useNavigate } from "react-router-dom";
// Step 2 - Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// // Step 3 - Include the fusioncharts library
import FusionCharts from "fusioncharts";

// // Step 4 - Include the chart type
import candlestick from "fusioncharts/fusioncharts.charts";

// // Step 5 - Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// // Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, candlestick, FusionTheme);

const Stock = () => {
  //variables for data
  const context = useContext(NoteContext);
  let navigate = useNavigate();
  let {  setdailydata, dailydata} = context;
  const [qhigh, setqhigh] = useState("");
  const [qlow, setqlow] = useState("");
  const [qopen, setqopen] = useState("");
  const [qclose, setqclose] = useState("");
  const [qchange, setqchange] = useState("");
  const [qprice, setqprice] = useState("");
  const [qchangepercent, setqchangepercent] = useState("");
  const [qvol, setqvol] = useState("");
  const [qlastdate, setqlastdate] = useState("");

  const [chartConfigs, setchartConfigs] = useState();
  //for fetching data
  useEffect(() => {
    fetchdailydata(sessionStorage.getItem('indi'));
    globalQuote(sessionStorage.getItem('indi'));
       
  }, []);
   let stockname=sessionStorage.getItem('stockname')
  // function getCurrentDate(separator = "-") {
  //   let newDate = new Date();
  //   let date = newDate.getDate() - 1;
  //   let month = newDate.getMonth() + 1;
  //   let year = newDate.getFullYear();

  //   return `${year}${separator}${
  //     month < 10 ? `0${month}` : `${month}`
  //   }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  // }
  // let date = getCurrentDate();

  //fetching global quote data

  const globalQuote = async () => {
    let data;
    //console.log(gdata)//
   data=JSON.parse(sessionStorage.getItem('gdata'))

    
      setqopen(data["Global Quote"]["02. open"]);
      setqclose(data["Global Quote"]["08. previous close"]);
      setqhigh(data["Global Quote"]["03. high"]);
      setqlow(data["Global Quote"]["04. low"]);
      setqprice(data["Global Quote"]["05. price"]);
      setqvol(data["Global Quote"]["06. volume"]);
      setqlastdate(data["Global Quote"]["07. latest trading day"]);
      setqchange(data["Global Quote"]["09. change"]);
      setqchangepercent(data["Global Quote"]["10. change percent"]);
    
  };
  let datas = [];
  let count = 1;
  //fetching daily data
  const fetchdailydata = async (element) => {
    let response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${element}&outputsize=compact&apikey=FS77N1CHBPTE25F5`
    );
    setdailydata(await response.json());

    let jsondata = dailydata["Time Series (Daily)"];

   try {
    for (let i in jsondata) {
      let json = {};
      json["open"] = jsondata[i]["1. open"];
      json["high"] = jsondata[i]["2. high"];
      json["low"] = jsondata[i]["3. low"];
      json["close"] = jsondata[i]["4. close"];
      json["x"] = count;
      json["volume"] = jsondata[i]["6. volume"];
      datas.push(json);
      count++;
    }
   } catch (error) {
    
   }
    //console.log(datas);
   
    setchartConfigs({
      type: "candlestick", // The chart type
      width: "1000", // Width of the chart
      height: "800",
      // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
        chart: {
          id:"chart",
        
          theme: "fusion",
          caption: `Daily Stock Price ${element}`,
          subCaption: "Last 2 months",
          numberprefix: "$",
          vNumberPrefix: " ",
          pyaxisname: "Price",
          vyaxisname: "Volume (In Millions)",
          toolTipColor: "#ffffff",
          toolTipBorderThickness: "0",
          toolTipBgColor: "#000000",
          toolTipBgAlpha: "80",
          toolTipBorderRadius: "2",
          toolTipPadding: "5",
        },
        categories: [
          {
            category: [
              {
                label: "2 month ago",
                x: "1",
              },
              {
                label: "1 month ago",
                x: "51",
              },
              {
                label: "Today",
                x: "100",
              },
            ],
          },
        ],
        dataset: [
          { 
            data: datas
              ? datas
              : [
                  {
                    open: "18.74",
                    high: "19.16",
                    low: "18.67 ",
                    close: "18.99",
                    x: "1",
                    volume: "4991285",
                  },
                  {
                    open: "18.74",
                    high: "19.06",
                    low: "18.54",
                    close: "18.82",
                    x: "2",
                    volume: "3615889",
                  },
                  {
                    open: "19.21",
                    high: "19.3",
                    low: "18.59 ",
                    close: "18.65",
                    x: "3",
                    volume: "4749586",
                  },
                  {
                    open: "19.85",
                    high: "19.86",
                    low: "19.12",
                    close: "19.4",
                    x: "4",
                    volume: "4366740",
                  },
                  {
                    open: "20.19",
                    high: "20.21",
                    low: "19.57",
                    close: "19.92",
                    x: "5",
                    volume: "3982709",
                  },
                ],
          },
        ],
      },
    });
   
  };

  const reload=()=>{
       navigate('/')
       setTimeout(() => {
        navigate('/Stock')
       }, 1);
    
  }

  const weeklydata=()=>{
    console.log("will be fetched tomorrow")
  }
  const monthlydata=()=>{
    console.log("will be fetched tomorrow")

  }

  ///todo
  ////generating graphs

  // STEP 3 - Creating the JSON object to store the chart configurations

  //   FusionCharts.ready(function(){
  //     var fusioncharts = new FusionCharts(chartConfigs);
  // fusioncharts.render();
  // });

  ///fetching weekly and  monthly data
  return (
    <>
      <div>
        {sessionStorage.getItem('indi')}---{stockname}
      </div>


      
      <div className="container">
        <h2>global Quote data</h2>
        <div className="container">
          open :{qopen} <br />
          close :{qclose} <br />
          average price per stock :{qprice} <br />
          high :{qhigh} <br />
          low :{qlow} <br />
          volume :{qvol} <br />
          last traded day of this stock: {qlastdate} <br />
          change :{qchange} <br />
          change percentage :{qchangepercent}
        </div>
        <div className="container align-center">
          <button type="button"  className="btn-primary" value="update graph" onClick={reload}>update graph</button>
        </div>
        <div id="chart-container">
          <ReactFC {...chartConfigs} />
        </div>
        <div className="container"> 
        <button className="btn-primary" onClick={weeklydata}>weekly</button>
        <button className="btn-primary" onClick={monthlydata}>monthly</button>

         </div>
      </div>
    </>
  );
};

export default Stock;
