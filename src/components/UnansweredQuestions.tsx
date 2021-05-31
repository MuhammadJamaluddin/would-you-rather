import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { getQuestions } from "../features/questions";

const UnansweredQuestions = () => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state: RootState) => state.questions);

  console.log("questions", questions);

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return <h1>UnansweredQuestions</h1>;
};

export default UnansweredQuestions;
