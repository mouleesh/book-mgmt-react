import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaArrowLeft } from 'react-icons/fa';
import Comment from './components/Comment';

export class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.isLiked = this.props.LikedBooks.indexOf(this.props.bookDetails)

        this.state = {
            image: '',
            isLike: this.isLiked > -1 ? true : false
        }

        this.onLike = this.onLike.bind(this);
    }

    onLike() {
        this.setState({
            isLike: !this.state.isLike
        }, () => {
            this.props.onLike(this.props.bookDetails.bookID, this.state.isLike);
        });
    }

    render() {
        let { bookName, bookID, comments, likes, author, description } = this.props.bookDetails;

        const LikeButtonText = () => { return this.state.isLike ? <FaThumbsDown /> : <FaThumbsUp /> };

        return (
            <div>
                <button id="backToDash" className="btn btn-primary btn-sm" onClick={this.props.backToDashboard}> <FaArrowLeft /> Back </button>
                <div className="container" style={{padding: "10px 0 0 0"}} >
                    <div className="row">
                        <div className="col-md-4">
                            <img id="bookImage" src="https://loremflickr.com/320/240/book" alt="Book Cover" />
                        </div>
                        <div className="col-md-8">
                            <h3> {bookName} </h3>
                            <p> Author: {author}</p>

                            <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                <button className="btn btn-primary btn-sm">
                                    Likes: {likes}
                                </button>

                                <button type="button" className="btn btn-primary btn-sm" onClick={this.onLike}>
                                    <LikeButtonText />
                                </button>
                            </div>
                        </div>
                    </div>
                    <br /> <br />
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Description:</h5>
                            <p>{description}</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <Comment comments={comments} bookID={bookID} addBookComment={this.props.addBookComment} />
                        </div>
                    </div>
                </div>
            </div>);
    }
}


