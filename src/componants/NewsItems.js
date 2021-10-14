import React, { Component } from 'react'

export class NewsItems extends Component {
    
    render() {
        let {title, discription, imageUrl, newsUrl} = this.props;
        return (
            <div>
                <div className="card" >
                    <img src={!imageUrl?"https://s.w-x.co/in-galaxy_8.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{discription}...</p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
