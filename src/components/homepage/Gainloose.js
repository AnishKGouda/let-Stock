import React,{ useEffect }from 'react';



const Gainloose = () => {

    let gainers=0
    let famous='{"0":"AAPL","1":"MSFT","2":"AMZN","3":"TSLA","4":"GOOGL","5":"GOOG","6":"BRK.B","7":"UNH","8":"JNJ","9":"XOM","10":"JPM","11":"META","12":"V","13":"PG","14":"NVDA","15":"HD","16":"CVX","17":"LLY","18":"MA","19":"ABBV","20":"PFE","21":"MRK","22":"PEP","23":"BAC","24":"KO"}'
    const myObj = JSON.parse(famous);
    
    function getCurrentDate(separator='-'){

      let newDate = new Date()
      let date = newDate.getDate()-1;
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();
      
      return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
      }
      
      function getYesterdayDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate()-2;
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
        }
  

    const fetchcompanies=async()=>{
      let diffarr={}
      let difvalue=[]
    
      for(let i in myObj){
    gainers++
    let response= await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${myObj[i]}&outputsize=compact&apikey=FS77N1CHBPTE25F5`)
    let data=await response.json()
    let date=getCurrentDate()
    let ydate=getYesterdayDate()
    let value=data["Time Series (Daily)"][`${date}`]["4. close"]
    let yvalue=data["Time Series (Daily)"][`${ydate}`]["4. close"]
    let diff=value-yvalue
    difvalue.push(diff)
    diffarr[`${myObj[i]}`]=diff
    
  
    if(gainers>=3){
      break
    }  
    }
    let keysSorted = Object.keys(diffarr).sort(function(a,b){return diffarr[b]-diffarr[a]})
    console.log(difvalue.sort((a,b) => b - a))
    console.log(keysSorted); 
    
    }
    
    useEffect(() => {
     
    }, [])
    
    return (
    <div>Gainloose
     <button className="btn-primary" onClick={fetchcompanies}> click</button>
     <button className="btn-primary" onClick={getCurrentDate}></button>
    </div>
  )
}

export default Gainloose