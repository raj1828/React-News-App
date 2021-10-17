import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {   
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
      }
    static props = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
      }

    constructor(){
        super();
        console.log("Hello i am a Constructor From News COmponants")
        this.state = {
            articles : [],
            loading : false,
            page: 1
        }
    }
    async componentDidMount(){
        console.log("rendert")
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1f65c922edd424d92cf8a10f6d33b33&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles : parsedData.articles, 
            totalResults: parsedData.totalResults,
            loading: false
        })
    }
    handlePrevClick = async ()=>{
        console.log("Previous");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1f65c922edd424d92cf8a10f6d33b33&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles : parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async ()=>{
        console.log("next");
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){      
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b1f65c922edd424d92cf8a10f6d33b33&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles : parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        console.log("rendfer")
        return (
            <div>
                <div className="container my-5">
                    <h2 className="text-center" style={{margin:'35px 0px'}}>News - Top HeadLines</h2>
                    {this.state.loading && <Spinner/>}
                    <div className="row my-5">
                    {!this.state.loading && this.state.articles.map((elements)=>{
                        return <div className="col-md-3" key={elements.url}>
                            <NewsItems title={elements.title?elements.title.slice(0, 45):""} discription={elements.description?elements.description.slice(0, 88):""} imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt}/>
                        </div>
                    })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News
