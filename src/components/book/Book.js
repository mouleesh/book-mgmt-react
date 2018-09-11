import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state={
            book:{}
        }
        this.onShowBookDetails = this.onShowBookDetails.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            book: nextProps.data
        }
    }

    onShowBookDetails = () => {
        this.props.showBookDetails(this.state.book.bookID);
    }

    render() {
        let { bookName, description, author } = this.state.book;
        if (this.props.type) {
            return (
                <React.Fragment>
                    <li>
                        <h3><strong>{bookName}</strong></h3>
                        <p>{description}</p>
                    </li>
                </React.Fragment>
            )
        } else {
            return (
                <div className="container">
                    <div className="card">
                        <div className="card-header"><span><b>{bookName}</b> By {author}</span></div>
                        <div className="card-body"><p>{description}</p></div>
                        <div className="card-footer">
                            <button className="btn btn-primary btn-sm float-right" onClick={this.onShowBookDetails}>View Details</button>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Book;