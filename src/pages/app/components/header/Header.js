import React from 'react';
import logo from './logo.png';
import './header.css';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';

export const Header = (props) => {
    return <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {(props.isLoggedIn) ?
            <React.Fragment>
                <div className="logged-user-detail">
                    <b>{props.fullName}</b>
                    <FaSignOutAlt className="signoutbtn" onClick={props.onLogOut} />
                </div>

                <div className="dropdown">
                    <FaBars className="user-info" />
                    <div className="dropdown-content">
                        <b>{props.fullName}</b>
                        <a onClick={props.onLogOut}>SignOut</a>
                    </div>
                </div>
            </React.Fragment> : null}
    </header>
}









