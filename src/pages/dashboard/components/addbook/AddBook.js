import React, { Component } from 'react';
import { Growl } from "primereact/growl";

export class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookDetails: [],
            hasBook: false,
            bookAdded: false
        };
        this.bookNameCheck = this.bookNameCheck.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            bookDetails: nextProps.bookDetails
        }
    }

    bookNameCheck(bookName = "") {
        this.bookName = bookName;
        const index = this.state.bookDetails.findIndex((book) => {
            return book.bookName.toLowerCase() === bookName.toLowerCase();
        });

        (index === -1 && bookName.length > 0) ? this.setState({ hasBook: false, isValid: true, error: "" }) : this.setState({ hasBook: true, isValid: false, error: "Book already exists!!!" });
    }


    getBookId() {
        const bookIDPrefix = "BK";
        let bookID;
        let unique = false;
        let i;
        let checkBookId = (bookid) => {
            return this.state.bookDetails.findIndex((book) => {
                return book.bookID === bookid;
            });
        };
        for (i = 0; i < 10 || unique; i++) {
            const bookIDSufix = Math.floor(Math.random() * 1000);
            bookID = bookIDPrefix + bookIDSufix;
            const index = checkBookId(bookID);
            if (index === -1) {
                unique = false;
            } else {
                unique = true;
            }
        }
        return bookID;
    }
    handleSubmit(e) {

        const newBook = {
            bookID: this.getBookId(),
            likes: 0,
            bookName: this.bookName,
            comments: [],
            author: this.authorName,
            description: this.description

        }
        if (!this.state.hasBook) {
            if (this.authorName && this.description) {
                this.props.addBook(newBook);
                this.bookName = "";
                this.authorName = "";
                this.description = "";
                this.addBookForm.reset();
                this.growl.show({ severity: 'success', summary: '', detail: 'Book Added Successfully' });
            } else {
                this.growl.show({ severity: 'error', summary: '', detail: 'Requires Book Name , Author and Description ' });
            }
        } else {
            this.growl.show({ severity: 'error', summary: '', detail: 'Please Provide another book name.. ' });
        }

    }

    render() {
        return (
            <React.Fragment>
                <Growl ref={el => { this.growl = el }} />
                <form ref={el => { this.addBookForm = el }}>
                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="bookName">Name</label>
                                <input
                                    id="bookName"
                                    type="text"
                                    className="form-control"
                                    onChange={e => this.bookNameCheck(e.target.value)} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="authorName">Author</label>
                                <input id="authorName" type="text" className="form-control"
                                    onChange={e => { this.authorName = e.target.value }} />
                            </div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="bookDescription">Description</label>
                                <textarea className="form-control" id="bookDescription" rows="3"
                                    onChange={e => { this.description = e.target.value }}></textarea>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="button" onClick={this.handleSubmit}>Add Book</button>
                    <button className="btn" type="reset" style={{ float: "right" }}> Clear </button>
                </form>
            </React.Fragment>
        )
    }

}  