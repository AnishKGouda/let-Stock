import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'

const News = () => {
    const [articles, setArticles] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const api="5beeaf5b46fa43218177b1a7a1ec5891"
    const updateNews = async ()=> {
        const url = ` https://newsapi.org/v2/everything?q=stocks&apiKey=${api}&pageSize=6`; 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)

    }

    useEffect(() => {
        updateNews(); 
      // eslint-disable-next-line
    }, [])
 
    return (
    <> <div className="container ">
                         
    <div className="row">
        {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
        })}
    </div>
    </div> </>
  )
}

export default News