import React, { Component } from 'react';
import Search from './components/search/Search'
import { bookDetails } from '../../constant';
import BookList from '../../components/bookList/BookList';
import './Dashboard.css';
import { BookDetails } from '../bookDetails/BookDetails';
import Analytics from '../../components/analytics/LikeAnalytics';
import { AddBook } from './components/addbook/AddBook';
import { FaPlusCircle } from 'react-icons/fa';

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
            userName: ''
        }
        this.search = this.search.bind(this);
        this.addBook = this.addBook.bind(this);
    }

    static getDerivedStateFromProps({ favBookIds, userName }, perviousState) {
        return {
            favBookIds: favBookIds,
            userName: userName
        }
    }

    componentDidMount() {
        let favouriteBooks;
        favouriteBooks = bookDetails.filter((book) => {
            return this.state.favBookIds.includes(book.bookID);
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
            return book.bookID === bookId
        });

        this.setState({
            showBookDetails: true,
            bookDetailObj
        });
    }

    addBookComment = (bookId, comment) => {
        const bookDetails = JSON.parse(JSON.stringify(this.state.books));

        const commentedBook = bookDetails.find((book) => {
            return book.bookID === bookId;
        });
        commentedBook.comments.push({
            description: comment,
            commentedAt: (new Date()).toLocaleString(),
            username: this.state.userName
        });

        const unCommentedBooks = bookDetails.filter((book) => {
            return book.bookID !== bookId;
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

        const favBookDetail = this.state.books.find((book) => { return book.bookID === bookId });
        let books = this.state.books.map((data) => {
            if (data.bookID === bookId) {
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
                        return book.bookID !== bookId;
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
                            <div id="bookListDiv" className="col dash-col das-col-fav">
                                <aside id="bookList" className="dashboard-card">
                                    <h2 id="booklist-heading" className="heading">Books In Store</h2>
                                    <div id="serachDiv" className="container-fluid">
                                        <Search onSearch={this.search} queryText={this.state.queryText} />
                                    </div>
                                    <div className="listBooks">
                                        <BookList showBookDetails={this.showBookDetails} bookList={filteredBooks} />
                                    </div>
                                </aside>
                            </div>
                            <div className="col dash-col das-col-alt">
                                <section id="favourites" className="dashboard-card">
                                    <h4 className="heading">Favourite Books</h4>
                                    <div className="list">
                                        <ul id="favlist-ul">
                                            <BookList showBookDetails={this.showBookDetails} favBooks={this.state.favouriteBooks} />
                                        </ul>
                                    </div>
                                </section>
                                <section id="analytics" className="dashboard-card">
                                    <h4 className="heading" style={{ height: "15%", margin: "0 0 5px 0" }}>Analytics</h4>
                                    <Analytics className="analytics-chart" books={this.state.books} />
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="bookModal" tabIndex="-1" role="dialog" aria-labelledby="addBookModal" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header heading">
                                    <h5 className="modal-title" id="addBookModal">Add Book</h5>
                                </div>
                                <div className="modal-body">
                                    <AddBook bookDetails={this.state.books} addBook={this.addBook} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
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