import React, { Component } from 'react';
import { Growl } from 'primereact/growl';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './app.css';
import { Header } from "./common/header/Header";
import { Footer } from "./common/footer/Footer";
import { Login } from './login/Login';
import { userDetails } from "../constant";
import Dashboard from "./dashboard/Dashboard";
import { BookDetails } from './bookDetails/BookDetails';

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
      this.growl.show({ severity: 'error', summary: 'Invalid Credentials', detail: 'Please check the entered credentials.' })
    } else {
      this.setUser(userDetail);
      this.growl.show({ severity: 'success', summary: 'Login Success', detail: 'Welcome to LMS!' });
    }
  }

  setUser(userDetail) {
    const userInfo = userDetails.filter((userInfo) => {
      return userInfo.username === userDetail.username;
    })[0];
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
    this.growl.show({ severity: 'info', summary: 'Logged Out', detail: 'Thankyou for visiting LMS!' });
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
                <Route path="/book-details/:book_id" component={BookDetails} />
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
