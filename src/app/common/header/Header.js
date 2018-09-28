import React, {Component} from 'react';
import brandLogo from './brand-logo.jpg';
import './header.css';
import { FaSignOutAlt, FaBars } from 'react-icons/fa';
import {logout, getCurrentLoggedInUser} from './../services/AuthService';

class Header extends Component{
    constructor(props){
        super(props);
    }

    onLogout = () => {
        logout();
        this.props.history.push('/');
    }

    render(){
        return <header className="App-header navbar navbar-expand-lg bg-light">
            <img src={brandLogo} className="App-logo" alt="brand logo" />
            <h2 id = "header-brand-name" className="m-2 text-primary">Library Management System</h2>
            
            {(getCurrentLoggedInUser() != '') ?
                <React.Fragment>
                    <div className="logged-user-detail">
                        <b className="m-3">{getCurrentLoggedInUser()}</b>
                        <FaSignOutAlt className="signoutbtn" onClick={this.onLogout} />
                    </div>

                    <div className="dropdown">
                        <FaBars className="user-info" />
                        <div className="dropdown-content">
                            <b className="m-3">{getCurrentLoggedInUser}</b>
                            <a onClick={this.onLogout}>SignOut</a>
                        </div>
                    </div>
                </React.Fragment> : null}
        </header>
    }
}

export default Header;