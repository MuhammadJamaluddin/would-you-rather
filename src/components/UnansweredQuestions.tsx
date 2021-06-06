import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { RootState } from "../store";
import { getQuestions } from "../features/questions";
import { User } from "../features/users";

const Container = styled.div`
  border: 1px solid black;
  padding: 4px;
  margin-bottom: 5px;
`;

const UnansweredQuestions = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [loggedInUser] = useState<User>(
    JSON.parse(localStorage.getItem("loggedInUser") as string)
  );
  const [answers] = useState<string[]>(Object.keys(loggedInUser.answers));
  const { questions } = useSelector((state: RootState) => state.questions);

  console.log("questions", questions);
  console.log("answers", answers);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const onClickHandler = useCallback(
    (question_id: string) => () => {
      push(`/home/questions/${question_id}`);
    },
    [push]
  );

  return (
    <>
      {Object.values(questions)
        .filter((question) => !loggedInUser.answers[question.id])
        .map((question) => (
          <Container key={question.id}>
            <div>{question.author} asks</div>
            <img
              style={{}}
              height="50px"
              alt="userAvatar"
              src={`${process.env.PUBLIC_URL}/images/${question.author}.png`}
            ></img>
            <div>Would you Rather</div>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={onClickHandler(question.id)}
            >
              View Poll
            </Button>
          </Container>
        ))}
    </>
  );
};

export default UnansweredQuestions;
