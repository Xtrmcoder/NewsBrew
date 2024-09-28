import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async () => {
        try {
            props.setProgress(10);
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
            setLoading(true);
            let data = await fetch(url);
            props.setProgress(30);
            let parsedData = await data.json();
            props.setProgress(70);
            setArticles(parsedData.articles || []);
            setTotalResults(parsedData.totalResults || 0);
            setLoading(false);
            props.setProgress(100);
        } catch (error) {
            console.error("Failed to fetch news articles:", error);
            setArticles([]);
            setLoading(false);
            alert("Failed to fetch news articles. Please try again later.");
        }
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category || 'General')} - NewsBrew`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {   
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setPage(nextPage);
        setArticles(articles.concat(parsedData.articles || []));
        setTotalResults(parsedData.totalResults || 0);
    };
    
    return (
        <div style={{ margin: '35px 0px', marginTop: '140px' }}>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < (totalResults || 0)}
                loader={<Spinner />}
            > 
                <div className="container">
                    <div className="row">
                        {articles && articles.length > 0 ? (
                            articles.map((element) => (
                                <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title || ""} description={element.description || ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            ))
                        ) : (
                            <p>No articles available.</p>
                        )}
                    </div>
                </div> 
            </InfiniteScroll>
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    apiKey: '' // Ensure this is passed in the props
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired, // Mark apiKey as required
}

export default News;
