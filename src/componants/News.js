import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static props = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log("Hello i am a Constructor From News COmponants");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }

  async updateNews() {
    this.props.setProgress(10);
    console.log("rendert");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // console.log("rendert")
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({articles : parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false
    // })
    this.updateNews();
  }
  handlePrevClick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //     page: this.state.page - 1,
    //     articles : parsedData.articles,
    //     loading: false
    // })
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    // console.log("next");
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles : parsedData.articles,
    //         loading: false
    //     })
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };

  render() {
    console.log("rendfer");
    return (
      <>
          <h2 className="text-center" style={{ margin: "35px 0px" }}>
            News - Top HeadLines
          </h2>
          {this.state.loading && <Spinner/>}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner/>}
          >
        <div className="container">
          <div className="row my-5">
            {this.state.articles.map((elements) => {
              return (
                <div className="col-md-3" key={elements.url}>
                  <NewsItems
                    title={elements.title ? elements.title.slice(0, 45) : ""}
                    discription={
                      elements.description
                        ? elements.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={elements.urlToImage}
                    newsUrl={elements.url}
                    author={elements.author}
                    date={elements.publishedAt}
                    source={elements.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>
        
      </>
    );
  }
}

export default News;
