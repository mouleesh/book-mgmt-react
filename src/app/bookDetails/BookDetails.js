import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaArrowLeft } from 'react-icons/fa';
import Comment from './comment/Comment';
import Axios from 'axios';

export class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '',
            bookName: '',
            bookId: '',
            comments: [],
            likes: '',
            author: '',
            description: '',
            isLike: ''
        }
    }
    
    getCurrentLoggedInUser(){
        localStorage.setItem('username', 'tino'); //TODO, remove this once this is done at login phase.
        return localStorage.getItem('username');
    }

    setIsLiked = (bookId) => {
        return Axios.get('https://my-json-server.typicode.com/vcoderz/lms-json-api/user?username=' + this.getCurrentLoggedInUser())
        .then(res => {
            this.setState({
                isLike: res.data[0].likedBooks.indexOf(bookId) > -1
            });
        }).catch(err => {

        });
    }

    componentDidMount() {
        const bookId = this.props.match.params.book_id;
        
        this.getBookDetailsByBookID(bookId).then(res => {
            const {bookName, author, description, likes, comments} = res.data;
            
            this.setState({
                bookId,
                bookName,
                author,
                description,
                likes,
                comments
            });

            this.setIsLiked(bookId);
        }).catch(err => {
            //TODO: handle error here
        });
        this.getImageUrl();
    }

    getBookDetailsByBookID(bookId) {
        return Axios.get('https://my-json-server.typicode.com/vcoderz/lms-json-api/book/'+ bookId);
    }

    onLike = () => {
        const bookId = this.state.bookId;
        const payload = {
            toLike: this.state.isLike
        };

        Axios.patch('https://my-json-server.typicode.com/vcoderz/lms-json-api/book/'+ bookId, payload)
        .then(res => {
            this.setState({
                isLike: !this.state.isLike,
                likes: res.data.likes
            });
        }).catch(err => {
            //TODO: handle error here
        });
    }

    onComment = (commentText) => {
        const bookId = this.state.bookId;
        const payload = {
            description: commentText,
            commentedAt: (new Date()).toLocaleString(),
            username: this.getCurrentLoggedInUser()
        };

        Axios.patch('https://my-json-server.typicode.com/vcoderz/lms-json-api/book/'+ bookId, payload)
        .then(res => {
            const updatedComments = [...this.state.comments, payload];
    
            this.setState({
                comments: updatedComments
            });
        }).catch(err => {
            //TODO: handle error here
        });
        
    }

    getImageUrl = () => {
        this.setState({
            image: "https://picsum.photos/320/240/?image=" + Math.round(Math.random()*1000)
        });
    }

    render() {
        let { bookName, bookId, comments, likes, author, description } = this.state;

        const LikeButtonText = () => { return this.state.isLike ? <FaThumbsDown /> : <FaThumbsUp /> };

        return (
            <div>
                <div className="container" style={{padding: "10px"}} >
                    <div className="row">
                        <div className="col-md-4">
                            <img id="bookImage" src={this.state.image} alt="Book Cover" />
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
                            <Comment comments={comments} bookId={bookId} onComment={this.onComment} />
                        </div>
                    </div>
                </div>
            </div>);
    }
}


