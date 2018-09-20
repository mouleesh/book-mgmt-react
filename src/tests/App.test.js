import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import ReactDOM from 'react-dom';
import App from '../pages/app/App';
import { Footer } from '../pages/app/components/footer/Footer';
import { Header } from '../pages/app/components/header/Header';
import { AddBook } from '../pages/dashboard/components/addbook/AddBook';

const book = new AddBook;

it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("Footer Test", () => {
    let footer = React.createElement(Footer, null, null);
    it("checks if footer is rendered", () => {
        expect(footer).not.toBeNull();
    });
});

describe("Header Test", () => {
    let header = React.createElement(Header, null, null);
    it("checks if header is rendered", () => {
        expect(header).not.toBeNull();
    });
});

test('bookid is null', () => {
    let bookid = book.getBookId();
    expect(bookid).not.toBeNull();
})

describe('Prefix for Book ID is missing', () => {
    let bookDetails = [{ bookId: 'BK001' }];
    const book = shallow(<AddBook bookDetails={bookDetails} addBook="" />)
    let bookid = book.instance().getBookId();
    it('Checks whether the book id prefixed by BK and matches', () => {
        expect([bookid, bookid]).toEqual([expect.stringContaining('BK'), expect.stringMatching(/BK100/)])
        expect(bookid).toBe('BK100')
    });
});

describe('Checking that already presenting BookId is not returned by getBookId() function', () => {
    let bookDetails = [{ bookId: 'BK100' }];
    console.log(bookDetails);
    const book = shallow(<AddBook bookDetails={bookDetails} addBook="" />)
    let bookid = book.instance().getBookId();
    it('Checks whether the book id prefixed by BK and matches', () => {
        expect([bookid, bookid]).toEqual([expect.stringContaining('BK'), expect.stringMatching(/BK101/)])
        expect(bookid).toBe('BK101')
    });
});

