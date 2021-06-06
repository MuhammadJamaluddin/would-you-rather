import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import { getUsers } from "../features/users";
import { loggedInUserType } from "../features/loggedInUser";
import { RootState } from "../store";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
`;

const Login = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);
  const classes = useStyles();
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<loggedInUserType>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setSelectedUserId(event.target.value as string);
      setSelectedUser(users[event.target.value as string]);
    },
    [users]
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Container>
      <h1>Login by selecting one of the users below</h1>
      <FormControl className={classes.formControl}>
        <InputLabel id="user">User</InputLabel>
        <Select
          labelId="user"
          id="userSelect"
          value={selectedUserId}
          onChange={handleChange}
        >
          {Object.values(users).map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => {
          if (selectedUserId && selectedUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(selectedUser));
            push("/home");
          }
        }}
      >
        Login
      </StyledButton>
    </Container>
  );
};

export default Login;
