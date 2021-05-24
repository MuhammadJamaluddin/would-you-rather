import React, { FC } from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute: FC = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
