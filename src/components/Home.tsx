import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import Questions from "./Questions";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import PrivateRoute from "./PrivateRoute";
import Question from "./Question";
import { loggedInUserType } from "../features/loggedInUser";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const CurrentUser = styled.div`
  font-weight: bold;
  padding: 5px;
`;

const StyledButton = styled(Button)`
  display: block;
  margin-top: 10px;
`;

const routes = ["/home/questions", "/home/new-questions", "/home/leader-board"];

const Home = () => {
  const { push } = useHistory();
  const [loggedInUser] = useState<loggedInUserType>(
    JSON.parse(localStorage.getItem("loggedInUser") as string)
  );
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    push(routes[newValue]);
  };

  useEffect(() => {
    push(routes[0]);
  }, [push]);

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Home" />
          <Tab label="New Question" />
          <Tab label="Leader Board" />
        </Tabs>
      </Paper>
      <CurrentUser>
        <p>Current User {loggedInUser.name}</p>
        <img
          style={{}}
          height="50px"
          alt="userAvatar"
          src={`${process.env.PUBLIC_URL}/images/${loggedInUser.id}.png`}
        ></img>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.clear();
            push("/login");
          }}
        >
          Log out
        </StyledButton>
      </CurrentUser>
      <PrivateRoute
        exact
        path="/home/questions/:question_id"
        component={Question}
      />
      <PrivateRoute exact path={routes[0]} component={Questions} />
      <PrivateRoute exact path={routes[1]} component={NewQuestion} />
      <PrivateRoute exact path={routes[2]} component={LeaderBoard} />
    </>
  );
};

export default Home;
