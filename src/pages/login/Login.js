import React, { Component, Fragment } from "react";
import './login.css';
import { loginDetails, growlData } from "../../constant";
import { Growl } from 'primereact/growl';

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

    componentDidMount() {
        this.setState({ loginDetails: loginDetails });
    }

    userNameCheck = () => {
        const username = this.username.current.value;

        const userLoginDetails = this.state.loginDetails.filter(loginDetail => {
            return loginDetail.username === username;
        });

        (userLoginDetails.length > 0) ? this.setState({ username: username }) :
            this.setState({ username: null });
        this.setIsValueEntered();
    }

    formSubmit = ({ keyCode, type }) => {
        const password = this.password.current.value;
        this.setIsValueEntered();
        const { username, loginDetails } = this.state;
        if (keyCode === 13 || type === "click") {
            if (username && password.length > 0) {
                let userData = loginDetails.filter((loginDetail => {
                    return loginDetail.username === username;
                }))[0];
                const isLoggedIn = (userData.password === password);
                const loginInfo = {
                    username: username,
                    isLoggedIn: isLoggedIn
                };
                this.props.onLogin(loginInfo);
            } else {
                this.growl.show(growlData.loginError);
            }
        }
    }


    getLoginInfo = (username, password, loginDetails) => {
        if (username && password.length > 0) {
            let userData = loginDetails.find((loginDetail => {
                return loginDetail.username === username;
            }));
            const isLoggedIn = (userData.password === password);
            const loginInfo = {
                username: username,
                isLoggedIn: isLoggedIn
            };
            return loginInfo;
        }
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
                <Growl ref={el => { this.growl = el } } />
                <section className="login-block">
                    <div className="container">
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
                                            onBlur={(input) => { this.userNameCheck() } }
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
