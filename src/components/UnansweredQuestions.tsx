import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { getQuestions } from "../features/questions";
import { User } from "../features/users";

const UnansweredQuestions = () => {
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

  return (
    <>
      {Object.values(questions)
        .filter((question) => !loggedInUser.answers[question.id])
        .map((question) => (
          <div>{question.id}</div>
        ))}
    </>
  );
};

export default UnansweredQuestions;
