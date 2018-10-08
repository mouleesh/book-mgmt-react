import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRouter';
import { Login } from '../login/Login';
import Dashboard from '../dashboard/Dashboard';
import { BookDetails } from '../bookDetails/BookDetails';
import NotFound from '../common/notFound/NotFound';

class AppRouter extends Component{
    render(){
        return (
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/book-details/:book_id" component={BookDetails} />
              <Route component={NotFound} />
            </Switch>
        );
    }
}

export default AppRouter;