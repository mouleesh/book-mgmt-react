import React, { Component } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import './Dashboard.css';
import BookList from './bookList/BookList';
import Analytics from './analytics/LikeAnalytics';
import { AddBook } from './addbook/AddBook';
import Panel from './panel/Panel';
import BookSearch from './bookSearch/bookSearch';
import Axios from 'axios';
import { Growl } from 'primereact/growl';
import { growlData, APIserverURL } from '../../constant';
import {getUserDetails} from './../common/services/UserService';
import {getBookDetails} from './../common/services/BookService';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            favBookIds: [],
            favouriteBooks: [],
            queryText: '',
            username: ''
        }
        this.search = this.search.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    componentDidMount() {
        getUserDetails().then((response) => {
            this.setUserDetails(response.data[0]);
            return getBookDetails();
        }).then((response) => {
            this.setBookDetails(response.data);
        }).catch((err) => {
            console.log(err);
        });

        //this state property on the location will be set only when we are redirecting from the login formsubmit. 
        if(this.props.location.state && this.props.location.state.showLoginSuccessGrowl){
            this.growl.show(growlData.loginSuccess);
            this.props.history.replace({
                pathname: '/dashboard',
                state: {}
            });
        }
    }

    /**
     * This functions is to make axios call to get book details
     */
    getBookDetails = () => {
        return Axios.get(APIserverURL.bookAPI);
    }
    
    /**
     * This functio will set the state for book
     * @param  {object} bookDetails
     */
    setBookDetails = (bookDetails) => {
        const favouriteBooks = bookDetails.filter((book) => {
            return this.state.favBookIds.indexOf(book.id) !== -1;
        })

        this.setState({
            books: bookDetails,
            favouriteBooks: favouriteBooks
        });
    }

    setUserDetails = (userDetails) => {
            this.setState({
                favBookIds: userDetails.likedBooks
            });
    }

    search(searchText) {
        this.setState({ queryText: searchText });
    }

    /**
     * This function is to add a new book and update the state
     * @param {object} newBook 
     */
    addBook(newBook = {}) {
        this.setState({
            books: [...this.state.books, newBook]
        });
        this.postBookDetailsInServer(newBook);
    }

    /**
     * @param  {object} newBook
     * This function will post the book details in server 
     */
    postBookDetailsInServer = (newBook) => {
        Axios.post(APIserverURL.bookAPI, newBook)
            .then(res => {
                if (res.status === 201) {
                    this.growl.show(growlData.bookAdded);
                } else {
                    this.removeBookOnPostFailure(newBook.id);
                }
            }).catch(() => {
                this.removeBookOnPostFailure(newBook.id);
            });
    }

    /**
     * @param  {string} bookID
     * This function will reomve book details from state if the post is failed in API server
     */
    removeBookOnPostFailure = (bookID) => {
        const updatedBooks = this.state.books.filter((book) => {
            if (book.bookID !== bookID) {
                return book;
            }
        })
        this.setState({
            books: updatedBooks
        }), () => {
            this.growl.show(growlData.bookRemoved);
        };
    }

    render() {
        let filteredBooks = [];
        let allBooks = this.state.books;
        let queryText = this.state.queryText;

        allBooks.forEach(function (item) {
            if (item.bookName.toLowerCase().indexOf(queryText.toLowerCase()) !== -1) {
                filteredBooks.push(item);
            }
        });
        return (
            <React.Fragment>
                <Growl ref={el => { this.growl = el }} />
                <div className="container-fluid">
                    <div className="row">
                        <BookSearch search={this.search} queryText={this.state.queryText} filteredBooks={filteredBooks} ></BookSearch>
                        <div className="col dash-col das-col-alt">
                            <Panel sectionID="favourites" sectionHeading="Favourite Books">
                                <div className="list">
                                    <ul id="favlist-ul">
                                        <BookList showBookDetails={this.showBookDetails} favBooks={this.state.favouriteBooks} />
                                    </ul>
                                </div>
                            </Panel>
                            <Panel sectionID="analytics" sectionHeading="Analytics">
                                <Analytics className="analytics-chart" books={this.state.books} />
                            </Panel>
                        </div>
                    </div>
                </div>
                <AddBook bookDetails={this.state.books} addBook={this.addBook} />
                <FaPlusCircle className="addBtn" data-toggle="modal" data-target="#bookModal" />
            </React.Fragment>
        );
    }
}

export default Dashboard;