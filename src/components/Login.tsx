import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUsers } from "../features/users";
import { RootState } from "../store";

const Login = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);
  console.log("users", users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return <h1>login</h1>;
};

export default Login;
