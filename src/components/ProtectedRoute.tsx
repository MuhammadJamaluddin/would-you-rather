import React, {FC} from 'react'
import { Redirect, Route } from 'react-router';

const PrivateRoute: FC = ({ children, ...rest }) => {

    return (
      <Route
        {...rest}
        render={({ location }) =>
          true ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );