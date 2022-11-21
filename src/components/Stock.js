import React, { useContext, useState, useEffect } from "react";
import NoteContext from "./NoteContext";
const Stock = () => {
  const context = useContext(NoteContext);
  let { indi, stockname } = context;
  const [open, setopen] = useState("");
  const [high, sethigh] = useState("");
  const [low, setlow] = useState("");
  const [close, setclose] = useState("");
  const [divident, setdivident] = useState("");
  const [volume, setvolume] = useState("");

  useEffect(() => {
    dailydata(context.indi);
  }, []);

  function getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate() - 2;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
  }
  let date = getCurrentDate();

  const dailydata = async (element) => {
    let response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${element}&outputsize=compact&apikey=FS77N1CHBPTE25F5`
    );
    try {
      let data = await response.json();
      setopen(data["Time Series (Daily)"][`${date}`]["1. open"]);
      sethigh(data["Time Series (Daily)"][`${date}`]["2. high"]);
      setlow(data["Time Series (Daily)"][`${date}`]["3. low"]);
      setclose(data["Time Series (Daily)"][`${date}`]["4. close"]);
      setvolume(data["Time Series (Daily)"][`${date}`]["6. volume"]);
      setdivident(data["Time Series (Daily)"][`${date}`]["7. dividend amount"]);
    } catch (error) {}
  };

  return (
    <>
      <div>
        {indi}---{stockname}
      </div>
      <div className="container ">
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
    </>
  );
};

export default Stock;
