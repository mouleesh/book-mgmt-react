import React from 'react';
import brandLogo from './brand-logo.jpg';
import './header.css';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';

export const Header = (props) => {
    return <header className="App-header navbar bg-light">
        <img src={brandLogo} className="App-logo" alt="brand logo" />
        <h2 id = "header-brand-name" className="m-2 text-primary">Library Management System</h2>
        
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
