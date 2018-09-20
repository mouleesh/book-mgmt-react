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

// beforeEach(() => {
//     const mockMath = Object.create(global.Math);
//     mockMath.random = () => 0.5;
//     global.Math = mockMath;
// });

// afterEach(() => {
//     global.Math = crctMath;
// });

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

function sum(a, b) {
    return a + b;
}
export default sum;

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

test('object assignment', () => {   
    const data = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
});

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
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


test("Enzyme Wrapper test", () => {
    const wrapper = shallow(<Foo />);
    expect(wrapper.find('.foo').length).toBe(1);
    expect(wrapper.find('.bar').length).toBe(0);
    wrapper.setState({ name: 'bar' });
    expect(wrapper.find('.foo').length).toBe(0);
});
