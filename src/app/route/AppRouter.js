import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRouter';
import { Login } from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import { BookDetails } from '../bookDetails/BookDetails';

class AppRouter extends Component{
    render(){
        return (
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/book-details/:book_id" component={BookDetails} />
            </Switch>
        );
    }
}

export default AppRouter;