import React, { Component } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import './Dashboard.css';
import BookList from './bookList/BookList';
import Analytics from './analytics/LikeAnalytics';
import { AddBook } from './addbook/AddBook';
import { BookDetails } from '../bookDetails/BookDetails';
import Panel from './panel/Panel';
import BookSearch from './bookSearch/bookSearch';
import Axios from 'axios';

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

    static getDerivedStateFromProps({ favBookIds, username }, perviousState) {
        return {
            favBookIds: favBookIds,
            username: username
        }
    }

    componentDidMount() {
        
        this.getBookDetails().then((response) => {
            this.setFavouriteBookDetailsAndSetData(response.data);
        }).catch((err) => {
        });
    }

    getBookDetails = () => {
        return Axios.get('https://my-json-server.typicode.com/vcoderz/lms-json-api/book');
    }

    setFavouriteBookDetailsAndSetData = (bookDetails) => {
        const favouriteBooks = bookDetails.filter((book) => {    
            return this.state.favBookIds.indexOf(book.id) !== -1;
        })

        this.setState({
            books: bookDetails,
            favouriteBooks: favouriteBooks
        });
    }

    search(searchText) {
        this.setState({ queryText: searchText });
    }

    addBook(newBook = {}) {
        this.setState({
            books: [
                ...this.state.books,
                newBook
            ]
        })
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
                <div className="container-fluid">
                    <div className="row">
                        <BookSearch search={this.search} queryText={this.state.queryText} showBookDetails={this.showBookDetails} filteredBooks={filteredBooks} ></BookSearch>
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