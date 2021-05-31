import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";

import Questions from "./Questions";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import { User } from "../features/users";

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

const Home = () => {
  const { push } = useHistory();
  const loggedInUser = useState<User>(
    JSON.parse(localStorage.getItem("loggedInUser") as string)
  );
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
        <p>Current User {loggedInUser[0].name}</p>
        <img
          style={{}}
          height="50px"
          alt="userAvatar"
          // src={process.env.PUBLIC_URL + "/images/boy1.png"}
          src={`${process.env.PUBLIC_URL}/images/${loggedInUser[0].avatarURL}.png`}
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
      {value === 0 && <Questions />}
      {value === 1 && <NewQuestion />}
      {value === 2 && <LeaderBoard />}
    </>
  );
};

export default Home;
