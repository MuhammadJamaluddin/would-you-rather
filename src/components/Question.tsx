import React from "react";
import { useParams } from "react-router-dom";

const Question = () => {
  let { question_id } = useParams<{ question_id: string }>();
  console.log("question_id", question_id);

  return <h1>{question_id}</h1>;
};
export default Question;
