import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

const Home = () => {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);

  console.log("loggedInUser", loggedInUser);

  return <h1>Home</h1>;
};

export default Home;
