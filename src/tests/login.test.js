import React from 'react';
import { Login } from '../pages/login/Login';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

const onLogin = () => { console.log('This function mocks the onLogin') };

const loginDetalsMock = [{
    username: 'tino',
    password: '12345'
  }];

beforeEach(()=>{
    configure({ adapter: new Adapter() });
});

describe("Login Test", () => {
    let login = React.createElement(Login,onLogin, null);
    it("checks if login is rendered", () => {
        expect(login).not.toBeNull();
    });
});

describe('userNameCheck() is not functioning properly - It is showing that an existing user name is not valid', () => {
    it('calls userNameCheck', () => {
        const wrapper = mount(<Login onLogin={onLogin} />);
        wrapper.setProps({ onLogin: onLogin() })
        wrapper.instance().userNameCheck('tino');
        expect(wrapper.state().username).not.toBeNull();
        expect(wrapper.state().username).toEqual('tino');

    })
});

describe('userNameCheck() is not functioning properly - It is showing that a non existing user is valid', () => {
    it('calls userNameCheck', () => {
        const wrapper = mount(<Login onLogin={onLogin} />);
        wrapper.setProps({ onLogin: onLogin() })
        wrapper.instance().userNameCheck('invalid user');
        expect(wrapper.state().username).toBeNull();    
    })
});

describe('login Details not set properly in componentDidMount()' , () => {
    it('checks whether login details state set properly' , ()=>{
        const wrapper = mount(<Login onLogin = {onLogin} />);
        expect(wrapper.state().loginDetals).not.toBeNull();
    })
});

describe('getLoginInfo() Authentication is not happening properly' , () => {
    it('checks whether the user is able to login or not', ()=>{
        const wrapper = mount(<Login onLogin =  {onLogin} />)
        const loginInfo = wrapper.instance().getLoginInfo('tino', '12345', loginDetalsMock);
        expect(loginInfo.isLoggedIn).toBeTruthy();
        expect(loginInfo).not.toBeNull();
    } )
})

describe('getLoginInfo() Authentication is done for wrong credentials' , () => {
    it('checks whether the user is able to login if he has wrong credentials', ()=>{
        const wrapper = mount(<Login onLogin =  {onLogin} />)
        const loginInfo = wrapper.instance().getLoginInfo('tino', '123', loginDetalsMock);
        console.log(loginInfo);
        expect(loginInfo.isLoggedIn).not.toBeTruthy();
    } )
})