import React from "react";
import { Route, Redirect } from "react-router-dom";

import Auth from '../Auth';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={() => {
        if (Auth.isAuthenticated()) {
          return <Component />;
        } else {
            return (
                <Redirect to="/login"/>
            );
        }
      }}
    />
  );
};
