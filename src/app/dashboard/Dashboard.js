import React, { Component } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { bookDetails } from '../../constant';
import './Dashboard.css';
import Search from './search/Search'
import BookList from './bookList/BookList';
import Analytics from './analytics/LikeAnalytics';
import { AddBook } from './addbook/AddBook';
import { BookDetails } from '../bookDetails/BookDetails';
import BookSearch from './bookSearch/bookSearch';
import SectionWrapper from './sectionWrapper/SectionWrapper';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: bookDetails,
            favBookIds: [],
            favouriteBooks: [],
            queryText: '',
            showBookDetails: false,
            bookDetailObj: '',
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
        let favouriteBooks = bookDetails.filter((book) => {
            return this.state.favBookIds.indexOf(book.bookId) !== -1;
        })

        this.setState({
            books: bookDetails,
            favouriteBooks: favouriteBooks
        });
    }

    search(searchText) {
        this.setState({ queryText: searchText });
    }

    showBookDetails = (bookId) => {
        const bookDetailObj = this.state.books.filter((book) => {
            return book.bookId === bookId
        });

        this.setState({
            showBookDetails: true,
            bookDetailObj
        });
    }

    addBookComment = (bookId, comment) => {
        const bookDetails = JSON.parse(JSON.stringify(this.state.books));

        const commentedBook = bookDetails.filter((book) => {
            return book.bookId === bookId;
        })[0];
        commentedBook.comments.push({
            description: comment,
            commentedAt: (new Date()).toLocaleString(),
            username: this.state.username
        });

        const unCommentedBooks = bookDetails.filter((book) => {
            return book.bookId !== bookId;
        });

        this.setState({
            books: [...unCommentedBooks, commentedBook],
            bookDetailObj: [commentedBook]
        });
    }

    backToDashboard = () => {
        this.setState({
            showBookDetails: false,
        });
    }

    onLike = (bookId, isLiked) => {

        const favBookDetail = this.state.books.filter((book) => { return book.bookId === bookId })[0];
        let books = this.state.books.map((data) => {
            if (data.bookId === bookId) {
                isLiked ? data.likes++ : data.likes--;
            }
            return data;
        });

        if (isLiked) {
            this.setState((pervState) => {
                return {
                    favouriteBooks: [
                        ...pervState.favouriteBooks,
                        favBookDetail
                    ],
                    books: books
                }
            });
        } else {
            this.setState((pervState) => {
                const perviousState = JSON.parse(JSON.stringify(pervState));
                return {
                    favouriteBooks: perviousState.favouriteBooks.filter((book) => {
                        return book.bookId !== bookId;
                    }),
                    books: books
                }
            });
        }
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

        let element = null;

        if (this.state.showBookDetails) {
            element = (
                <React.Fragment>
                    <BookDetails
                        backToDashboard={this.backToDashboard}
                        bookDetails={this.state.bookDetailObj[0]}
                        onLike={this.onLike}
                        LikedBooks={this.state.favouriteBooks}
                        addBookComment={this.addBookComment}
                    />
                </React.Fragment>
            )
        } else {
            element = (
                <React.Fragment>
                    <div className="container-fluid">
                        <div className="row">
                            <BookSearch search={this.search} queryText={this.state.queryText} showBookDetails={this.showBookDetails} filteredBooks={filteredBooks} ></BookSearch>
                            <div className="col dash-col das-col-alt">
                                <SectionWrapper sectionID="favourites" sectionHeading="Favourite Books">
                                    <div className="list">
                                        <ul id="favlist-ul">
                                            <BookList showBookDetails={this.showBookDetails} favBooks={this.state.favouriteBooks} />
                                        </ul>
                                    </div>
                                </SectionWrapper>
                                <SectionWrapper sectionID="analytics" sectionHeading="Analytics">
                                    <Analytics className="analytics-chart" books={this.state.books} />
                                </SectionWrapper>
                            </div>
                        </div>
                    </div>
                    <AddBook bookDetails={this.state.books} addBook={this.addBook} />            
                    <FaPlusCircle className="addBtn" data-toggle="modal" data-target="#bookModal" />
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                {element}
            </React.Fragment>
        );
    }
}

export default Dashboard;