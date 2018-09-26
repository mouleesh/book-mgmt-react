import React, { Component, Fragment } from "react";
import { Growl } from 'primereact/growl';
import { growlData } from "../../constant";
import './login.css';
import Axios from "axios";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: [],
            username: null,
            isValueEntered: false
        };
        this.password = React.createRef();
        this.username = React.createRef();
    }

    getUserDetails = (userName) => {
        return Axios.get('https://my-json-server.typicode.com/vcoderz/lms-json-api/loginDetail?username=' + userName);
    }

    userNameCheck = (username) => {
        this.getUserDetails(username).then((response) => {
            this.setUserDetails(response.data[0]);
        }).catch((err) => {
            this.growl.show(err)
        });
    }

    formSubmit = ({ keyCode, type }) => {
        const password = this.password.current.value;
        this.setIsValueEntered();
        const { username, loginDetails } = this.state;

        if (keyCode === 13 || type === "click") {
            const loginInfo = this.checkPasswordAndGetLogInInfo(username, password, loginDetails);
            console.error("loginInfo");
            console.error(loginInfo);
            if(loginInfo){
                this.props.onLogin(loginInfo);
            } else {
                this.growl.show(growlData.loginError);
            }
        }
    }

    checkPasswordAndGetLogInInfo = (username, password, loginDetails) => {
        if (username && password.length > 0) {
        
            const isLoggedIn = (loginDetails.password === password);
            const loginInfo = {
                username: username,
                isLoggedIn: isLoggedIn
            };
            return loginInfo;
        } else {
            return false;
        }
    }

    setUserDetails(userLoginDetails) {
        (userLoginDetails) ?
            this.setState(
                {
                    username: userLoginDetails.username,
                    loginDetails: userLoginDetails
                }) :
        this.setIsValueEntered();
        
    }

    getCheckClass() {
        let checkClass = "check-hidden";
        if (this.state.username) {
            checkClass = "check-visible";
        }
        return checkClass;
    }

    setIsValueEntered = () => {
        if (this.username.current.value.length > 0 && this.password.current.value.length > 0) {
            this.setState({
                isValueEntered: true
            })
        } else {
            this.setState({
                isValueEntered: false
            })
        }
    }

    render() {
        let manageBtnIcon = "btn btn-login btn-cursor-";
        manageBtnIcon = this.state.isValueEntered ? manageBtnIcon += 'pointer' : manageBtnIcon += 'not-allowed';

        return (
            <Fragment>
                <Growl ref={el => { this.growl = el }} />
                <section className="login-block">
                    <div className="container login-container">
                        <div className="row">
                            <div className="col-md-4 login-sec">
                                <h2 className="text-center">Login Now</h2>
                                <form className="login-form">
                                    <div className="form-group">
                                        <label className="badge badge-primary" htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder=""
                                            ref={this.username}
                                            onBlur={(input) => { this.userNameCheck(this.username.current.value) }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="badge badge-primary" htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder=""
                                            ref={this.password}
                                            onKeyUp={this.formSubmit}
                                        />
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input type="checkbox" className="form-check-input" />
                                            <small>Remember Me (beta) </small>
                                        </label>
                                        <button id="submit-btn" type="submit" disabled={!this.state.isValueEntered} className={manageBtnIcon} onClick={this.formSubmit}>Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-8 banner-sec"></div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}
