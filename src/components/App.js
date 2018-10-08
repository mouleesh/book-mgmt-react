import React, { Component } from 'react';
import { Router } from 'react-router';
import './app.css';
import Header from "./common/header/Header";
import { Footer } from "./common/footer/Footer";
import AppRouter from './route/AppRouter';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();   

class App extends Component {

  render() {
    return (
      <Router history={history} className="router">
        <div className="App">
          <Header history={history}/>
          <main className="App-content">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
