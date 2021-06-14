import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../auth';

const PrivateRoute = ({ component: Component, ...others }) => {
  return (
    <Route {...others} render={props => {
      const authenticated = isAuthenticated();
      return authenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{pathname: '/signin'}}/>
      );
    }} />
  );
}

export default PrivateRoute;