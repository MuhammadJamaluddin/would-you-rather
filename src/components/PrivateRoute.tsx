import React, { FC, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
  const [loggedInUserId] = useState(localStorage.getItem("loggedInUser"));

  return (
    <Route
      render={({ location }) =>
        Boolean(loggedInUserId) ? (
          <Route component={component} {...rest} />
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
