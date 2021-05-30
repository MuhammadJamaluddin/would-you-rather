import React, { FC, useState } from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute: FC = ({ children, ...rest }) => {
  const [loggedInUserId] = useState(localStorage.getItem("loggedInUserId"));

  console.log("loggedInUserId here", loggedInUserId);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        Boolean(loggedInUserId) ? (
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
