import React, { Component } from 'react';
import './app.css';
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Growl } from 'primereact/growl';
import { Login } from '../login/Login';
import Dashboard from "../dashboard/Dashboard";
import { userDetails } from "../../constant";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      userDetail: {}
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
  }

  onLogin(userDetail = {}) {
    if (!userDetail.isLoggedIn) {
      this.growl.show({ severity: 'warn', summary: 'password error', detail: 'Invalid Username/Password' })
    } else {
      this.setUser(userDetail);
      this.growl.show({ severity: 'success', summary: 'login success', detail: 'LogIn Successful' });
    }
  }

  setUser(userDetail) {
    const userInfo = userDetails.find((userInfo) => {
      return userInfo.username === userDetail.username;
    });
    this.setState({
      isLoggedIn: userDetail.isLoggedIn,
      username: userDetail.username,
      userDetail: userInfo
    });
  }

  onLogOut() {
    this.setState({
      isLoggedIn: false,
      username: ""
    });
    this.growl.show({ severity: 'info', summary: 'Info', detail: 'Logged out' });
  }

  render() {
    const fullName = this.state.userDetail.fullName;
    return (
      <Router className="router">
        <div className="App">
          <Header isLoggedIn={this.state.isLoggedIn}
            fullName={fullName} onLogOut={this.onLogOut} />
          <main className="App-content">
            <Growl ref={(el) => this.growl = el}></Growl>
            <Route exact path="/" component={() => {
              return <Login onLogin={e => { this.onLogin(e) }} />
            }} />
            {(this.state.isLoggedIn) ?
              <Switch>
                <Route path="/dashboard" render={() => {
                  return <Dashboard userName={this.state.userDetail.username} favBookIds={this.state.userDetail.likedBooks} />
                }} />
                <Redirect to="/dashboard" />
              </Switch> :
              <Redirect to="/" />
            }
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
