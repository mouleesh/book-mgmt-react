import React from "react";
import BookList from "../bookList/BookList";
import Search from "../search/Search";

const BookSearch = props => {
  const {search, queryText, showBookDetails, filteredBooks} = props;

  return (
    <React.Fragment>
      <div id="bookListDiv" className="col dash-col das-col-fav">
        <aside id="bookList" className="dashboard-card">
          <h2 id="booklist-heading" className="heading">
            Books In Store
          </h2>
          <div id="serachDiv" className="container-fluid">
            <Search onSearch={search} queryText={queryText} />
          </div>
          <div className="listBooks">
            <BookList showBookDetails={showBookDetails} bookList={filteredBooks}/>
          </div>
        </aside>
      </div>
    </React.Fragment>
  );
};

export default BookSearch;
