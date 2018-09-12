import React from 'react';
import Book from '../book/Book';

const BookList = (props) => {
  let {bookList, favBooks} = props;
  let filteredBooks;

  if (bookList) {
    filteredBooks = bookList.sort((a, b) => a.bookName < b.bookName).map((book, index) => (
      <Book data={book} key={index} showBookDetails={props.showBookDetails} />
    ));
  } else if (favBooks) {
    if (favBooks.length > 0) {
      filteredBooks = favBooks.map((book, index) => (
        <Book data={book} key={index} showBookDetails={props.showBookDetails} type />
      ));
    } else {
      return <p>No Favourties...</p>
    }
  }

  return (
    <React.Fragment>
      {filteredBooks}
    </React.Fragment>
  );

}

export default BookList;