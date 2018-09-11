import React from 'react';
import logo from './logo.png';
import './header.css';
import { FaUser } from 'react-icons/fa';

export const Header = (props) => {
    return <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {(props.isLoggedIn) ? <div className="dropdown">
            <FaUser className="user-info dropbtn"/>
            <div className="dropdown-content">
                <p>Signed as {props.fullName}</p>
                <a onClick={props.onLogOut}>SignOut</a>
            </div>
        </div>: null}
    </header>
}









