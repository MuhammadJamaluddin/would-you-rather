import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
