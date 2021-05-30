import React, { useState } from "react";

const Home = () => {
  const loggedInUser = useState(
    JSON.parse(localStorage.getItem("loggedInUser") as string)
  );

  console.log("loggedInUser in home", loggedInUser[0]);

  return <h1>Home</h1>;
};

export default Home;
