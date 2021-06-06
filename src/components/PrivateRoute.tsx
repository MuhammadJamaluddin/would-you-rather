import React, { FC, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { loggedInUserType } from "../features/loggedInUser";

const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
  const [loggedInUserId] = useState<loggedInUserType | null>(
    JSON.parse(localStorage.getItem("loggedInUser") as string)
  );

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
