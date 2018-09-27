import React, { Component } from 'react';
import { Growl } from 'primereact/growl';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './app.css';
import { Header } from "./common/header/Header";
import { Footer } from "./common/footer/Footer";
import { Login } from './login/Login';
import Dashboard from "./dashboard/Dashboard";
import Axios from 'axios';
import { growlData } from '../constant';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      userDetail: {}
    };
  }

  onLogin = (userDetail = {}) => {
    if (!userDetail.isLoggedIn) {
      this.growl.show(growlData.loginError)
    } else {
      this.setUserDetialsAndNavigate(userDetail);
    }
  }

  setUserDetialsAndNavigate = (userDetail) => {
    this.getUserDetailsOnLogin(userDetail.username).then((response) => {
      const userInfo = response.data[0];
      this.setUserDetails(userDetail, userInfo);
    }).catch((err) => {
      this.growl.show(growlData.requestFailed)
    });
  }

  getUserDetailsOnLogin = (userName) => {
    return Axios.get('https://my-json-server.typicode.com/vcoderz/lms-json-api/user?username=' + userName);
  }

  onLogOut = () => {
    this.setState({
      isLoggedIn: false,
      username: ""
    });
    this.growl.show(growlData.thanks);
  }

  setUserDetails(userDetail, userInfo) {
    this.setState({
      isLoggedIn: userDetail.isLoggedIn,
      username: userDetail.username,
      userDetail: userInfo
    }, () => {
      this.growl.show(growlData.loginSuccess);
    });
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
                  return <Dashboard username={this.state.userDetail.username} favBookIds={this.state.userDetail.likedBooks} />
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
