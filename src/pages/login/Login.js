import React, { Component, Fragment } from "react";
import './login.css';
import { Card } from 'primereact/card';
import { loginDetails, growlData } from "../../constant";
import { FaCheck } from 'react-icons/fa';
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
        if (keyCode === 13 || type === "click" ) {
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

    getCheckClass() {
        let checkClass = "check-hidden";
        if (this.state.username) {
            checkClass = "check-visible";
        }
        return checkClass;
    }

    setIsValueEntered = () =>{
        if(this.username.current.value.length > 0 && this.password.current.value.length > 0){
            this.setState({
                isValueEntered: true
            })
        }else{
            this.setState({
                isValueEntered: false
            })
        }
    }
    render() {

        let checkClass = this.getCheckClass();
        return (
            <Fragment>
                <Growl ref={el => { this.growl = el }} />
                <div className="login">
                    <Card
                        title="Welcome to Library Management System"
                        subTitle="Login to Proceed"
                        className="card"
                    >
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <FaCheck className={checkClass} />
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    ref={this.username}
                                    onBlur={(input) => { this.userNameCheck() }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    ref={this.password}
                                    onKeyUp={this.formSubmit}
                                />
                            </div>
                            <button id="submit-btn" disabled={!this.state.isValueEntered} className="btn btn-primary" onClick={this.formSubmit}>Login</button>
                        </div>
                    </Card>
                </div>
            </Fragment>
        )
    }
}
