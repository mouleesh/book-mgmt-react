import React from 'react';
import './notFound.css';

const NotFound = () => (
    <div className="container not-found-container">
        <div className="row">
            <div className="col-md-12" align="center">
                <h1 className="not-found-oops">Oops!</h1>
                <h2>We can't seem to find the page you're looking for.</h2>
                <h5>Error code: 404</h5>
            </div>
        </div>
    </div>
);

export default NotFound;