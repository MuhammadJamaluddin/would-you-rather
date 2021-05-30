import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Login from "./components/Login";
import Home from "./components/Home";
import PrivateRoute from "./components/ProtectedRoute";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute>
            <Route path="/home" component={Home} />
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
