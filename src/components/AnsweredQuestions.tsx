import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { RootState } from "../store";
import { getQuestions, QuestionType } from "../features/questions";
import { loggedInUserType } from "../features/loggedInUser";
import { Container } from "./UnansweredQuestions";

const AnsweredQuestions = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const [loggedInUser] = useState<loggedInUserType>(
    JSON.parse(localStorage.getItem("loggedInUser") as string)
  );
  const { questions } = useSelector((state: RootState) => state.questions);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  const onClickHandler = useCallback(
    (question: QuestionType) => () => {
      push(`/home/questions/${question.id}`, question);
    },
    [push]
  );

  return (
    <>
      {questions &&
        Object.values(questions)
          .filter(
            (question) =>
              question.optionOne.votes.includes(loggedInUser.id) ||
              question.optionTwo.votes.includes(loggedInUser.id)
          )
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
                onClick={onClickHandler(question)}
              >
                View Poll
              </Button>
            </Container>
          ))}
    </>
  );
};

export default AnsweredQuestions;
