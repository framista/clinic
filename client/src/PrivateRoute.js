import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const authTokens  = localStorage.getItem('key-jwt');
  localStorage.setItem('selectedSite', window.location.href);
  return (
    <Route
      {...rest}
      render={props =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login" }}
          />
        )
      }
    />
  );
}

export default PrivateRoute