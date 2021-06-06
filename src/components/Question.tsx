import React from "react";
import { useLocation } from "react-router-dom";

import { QuestionType } from "../features/questions";
import { Container } from "./UnansweredQuestions";

const Question = () => {
  const { state: question } = useLocation<QuestionType>();
  console.log("state", question);

  return (
    <Container>
      <img
        style={{}}
        height="50px"
        alt="userAvatar"
        src={`${process.env.PUBLIC_URL}/images/${question.author}.png`}
      ></img>
      <div>Would you rather</div>
    </Container>
  );
};
export default Question;
