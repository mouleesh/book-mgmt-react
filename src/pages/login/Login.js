import React, { Component, Fragment } from "react";
import './login.css';
import { Card } from 'primereact/card';
import { loginDetails } from "../../constant";
import { FaCheck } from 'react-icons/fa';
import { Growl } from 'primereact/growl';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: [],
            username: null
        };

        // refactor below 2 binds with arrow functions for context binding
        this.userNameCheck = this.userNameCheck.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.password = React.createRef();
    }

    componentDidMount() {
        this.setState({ loginDetails: loginDetails });
    }


    //refactor here with arrow function
    userNameCheck(username = "") {
        const userLoginDetails = this.state.loginDetails.filter(loginDetail => {
            return loginDetail.username === username;
        });

        (userLoginDetails.length > 0) ? this.setState({ username: username }) :
            this.setState({ username: null });

    }

    //refactor here with arrow function
    //general rule of thumb: all variable declarations to be at the top of any block(s). Although JS does it self with JS Hoisting, developers needs to follow that practice

    formSubmit(e) {

        //on the UI, disable the Login button until voth checkboxes are filled with details (either correct or incorrect)

        if (e.keyCode === 13 || e.type === "click" ) {  //refactor here with object destructuring here and below, whereever possible
            const password = this.password.current.value;
            //refactor below 2 lins with destructuring
            if (this.state.username && password.length > 0) {
                let userData = this.state.loginDetails.filter((loginDetail => {
                    return loginDetail.username === this.state.username;
                }))[0];
                const isLoggedIn = (userData.password === password);
                //use the refactored details below
                const loginInfo = {
                    username: this.state.username,
                    isLoggedIn: isLoggedIn
                };
                this.props.onLogin(loginInfo);
            } else {
                //put the below hard-coded strings in a seperate constant file so that repetition can be avoided
                this.growl.show({ severity: 'error', summary: 'Invalid Crendentials!', detail: 'Please check the entered credentials.' });
            }
        }
    }


    render() {

        //refactor it to a new function. Currently, it is against the SRP principle and is polluting the render method
        let checkVisibility = "hidden";

        if (this.state.username) {
            checkVisibility = "inherit";    //don't use inherit. it is by default. once you use 'hidden', you should always display it with 'visible' property
        }
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
                                <FaCheck className="check"
                                    style={{ visibility: checkVisibility }} //extract it to a seperate class. styles will cause specificity issue in the future. check more for what is Specificity in CSS
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    onChange={(input) => { this.userNameCheck(input.target.value) }}    //rather use onBlur. We can avoid multiple calls by that
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
                            <button id="submit-btn" className="btn btn-primary" onClick={this.formSubmit}>Login</button>
                        </div>
                    </Card>
                </div>
            </Fragment>
        )
    }
}
