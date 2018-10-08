import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state={
            book:{}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            book: nextProps.data
        }
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
                            <NavLink className="btn btn-primary btn-sm float-right" to={`/book-details/${this.state.book.id}`}>View Details</NavLink>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Book;