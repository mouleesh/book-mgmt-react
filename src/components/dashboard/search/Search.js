import React, { Component } from 'react';
import './search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.ref = React.createRef();

    }

    handleSearch(e) {
        this.props.onSearch(e.target.value);

    }

    componentDidMount() {
        this.ref.current.value = this.props.queryText;
    }

    render() {
        return (
            <div className="card" id="search-card">
                <div className="card-header">
                    <input
                        id="SearchApts"
                        placeholder="Search"
                        type="text"
                        className="form-control"
                        aria-label="Search Appointments"
                        onKeyUp={this.handleSearch}
                        ref={this.ref}
                    />
                </div>
            </div>
        )
    }
}

export default Search;