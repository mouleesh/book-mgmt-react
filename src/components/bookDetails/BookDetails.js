import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown, FaArrowLeft } from 'react-icons/fa';
import Comment from './comment/Comment';
import Axios from 'axios';
import { APIserverURL } from '../../constant';
import {NavLink} from 'react-router-dom';
import {Growl} from 'primereact/growl';
import { connect } from 'react-redux';
import { retrieveBookByIdAction } from './../../actions/BookDetailAction';

class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.commentTextForwardRef = React.createRef();

        this.state = {
            image: '',
            isLike: ''
        }
    }
    
    getCurrentLoggedInUser(){
        return localStorage.getItem('username');
    }

    setIsLiked = (bookId) => {
        return Axios.get(APIserverURL.userAPI+'?username=' + this.getCurrentLoggedInUser())
        .then(res => {
            this.setState({
                isLike: res.data[0].likedBooks.indexOf(bookId) > -1
            });
        }).catch(err => {

        });
    }

    componentDidMount() {
        this.props.retrieveBookByIdAction(this.props.match.params.book_id);
        
        this.setImageUrl();
    }

    onLike = () => {
        const bookId = this.state.bookId;
        const payload = {
            toLike: this.state.isLike
        };

        Axios.patch(APIserverURL.bookAPI+ bookId, payload)
        .then(res => {
            this.setState({
                isLike: !this.state.isLike,
                likes: res.data.likes
            });
        }).catch(err => {
            //TODO: handle error here
        });
    }

    onComment = (commentRef) => {
        const commentText = commentRef.current.value;
        if (commentText === '') {
            this.growl.show({ severity: 'error', summary: 'Comment Required', detail: 'Please enter the comment!' });
            return;
        }

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
            commentRef.current.value = '';
        }).catch(err => {
            this.growl.show({ severity: 'error', summary: 'Comment Not Saved', detail: 'Please try later!' });
        });
        
    }

    setImageUrl = () => {
        this.setState({
            image: APIserverURL.bookImageURL + Math.round(Math.random()*1000)
        });
    }

    render() {
        let { bookName, bookId, comments, likes, author, description } = this.props.bookDetail;

        const LikeButtonText = () => { return this.state.isLike ? <FaThumbsDown /> : <FaThumbsUp /> };

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <NavLink id="backToDash" to={'/dashboard'} className="btn btn-primary btn-sm"> <FaArrowLeft /> Back </NavLink>
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
                            <Comment commentRef={this.commentTextForwardRef} comments={comments} bookId={bookId} onComment={this.onComment} />
                        </div>
                    </div>
                </div>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        bookDetail: state.BookDetailReducer.bookDetail
    }
}

const mapDispatchToProps = dispatch => ({
    retrieveBookByIdAction: (bookId) => dispatch(retrieveBookByIdAction(bookId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);