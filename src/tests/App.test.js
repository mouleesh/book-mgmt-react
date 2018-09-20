import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import ReactDOM from 'react-dom';
import App from '../pages/app/App';
import { Footer } from '../pages/app/components/footer/Footer';
import { Header } from '../pages/app/components/header/Header';
import { AddBook } from '../pages/dashboard/components/addbook/AddBook';
import { Foo } from '../pages/login/Foo';
const ob = new AddBook;

const crctMath = Object.create(global.Math);

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
    let bookid = ob.getBookId();
    expect(bookid).not.toBeNull();
})

describe('Prefix for Book ID is missing', () => {

    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    let bookid = ob.getBookId();
    it('Checks whether the book id prefixed by BK and matches', () => {
        expect([bookid, bookid]).toEqual([expect.stringContaining('BK'), expect.stringMatching(/BK500/)])
        expect(bookid).toBe('BK500')
    });

    global.Math = crctMath;
});

