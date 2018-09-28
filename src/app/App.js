import React, { Component } from 'react';
import { Growl } from 'primereact/growl';
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
            <Growl ref={(el) => this.growl = el}></Growl>
            <AppRouter />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
