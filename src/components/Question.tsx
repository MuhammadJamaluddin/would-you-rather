import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";

import { answerQuestion, QuestionType } from "../features/questions";
import { Container } from "./UnansweredQuestions";
import { _saveQuestionAnswer } from "../_DATA";
import { loggedInUserType } from "../features/loggedInUser";
import QuestionStats from "./QuestionStats";
import { useDispatch } from "react-redux";

export enum OptionType {
  optionOne = "optionOne",
  optionTwo = "optionTwo",
}

const Question = () => {
  const dispatch = useDispatch();
  const { state: question } = useLocation<QuestionType>();
  const loggedInUser: loggedInUserType = JSON.parse(
    localStorage.getItem("loggedInUser") as string
  );
  const [value, setValue] = useState<OptionType>(OptionType.optionOne);
  const [showStats, setShowStats] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value as OptionType);
  };

  const onClickHandler = useCallback(async () => {
    await _saveQuestionAnswer({
      authedUser: loggedInUser.id,
      qid: question.id,
      answer: value,
    });
    dispatch(
      answerQuestion({
        authedUser: loggedInUser.id,
        qid: question.id,
        answer: value,
      })
    );
    setShowStats(true);
  }, [dispatch, loggedInUser.id, question.id, value]);

  useEffect(() => {
    if (
      question.optionOne.votes.includes(loggedInUser.id) ||
      question.optionTwo.votes.includes(loggedInUser.id)
    )
      setShowStats(true);
  }, [
    loggedInUser.id,
    question.optionOne.votes,
    question.optionTwo.votes,
    showStats,
  ]);

  return (
    <Container>
      {showStats ? (
        <QuestionStats question_id={question.id} value={value} />
      ) : (
        <>
          <img
            style={{}}
            height="50px"
            alt="userAvatar"
            src={`${process.env.PUBLIC_URL}/images/${question.author}.png`}
          ></img>
          <FormControl component="fieldset">
            <FormLabel component="legend">Would you rather</FormLabel>
            <RadioGroup
              aria-label="answer"
              name="answer"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="optionOne"
                control={<Radio />}
                label={question.optionOne.text}
              />
              <FormControlLabel
                value="optionTwo"
                control={<Radio />}
                label={question.optionTwo.text}
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={onClickHandler}
          >
            Submit
          </Button>
        </>
      )}
    </Container>
  );
};
export default Question;
