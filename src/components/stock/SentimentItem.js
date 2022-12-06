import React from 'react'

const SentimentItem = (props) => {
  let {title,description,imageUrl,newsUrl,author,date,source,sentiment,sentiment_score}=props
   let year=date.substring(0,4);
   let month=date.substring(4,6);
   let day=date.substring(6,8);
   date=year+"-"+month+"-"+day;
    return (
    <div> <div className="my-3">
    <div className="card">
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
        }
        }>

            <span className="badge rounded-pill bg-danger text-light"> {source} </span>
        </div>
        <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className="card-title">{title}  </h5>
            <p className="card-text">{description}</p>
           <p> <p> sentiment---{sentiment}
<br />
sentiment   score---{sentiment_score}

<br /> on {date}
</p></p>

  
<p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} </small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
    </div>
</div></div>
  )
}

export default SentimentItem