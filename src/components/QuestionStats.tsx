import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { OptionType } from "./Question";

type QuestionStatsProps = {
  question_id: string;
  value: OptionType;
};

const getOtherOption = (option: OptionType) => {
  if (option === OptionType.optionOne) return OptionType.optionTwo;
  return OptionType.optionOne;
};

const calculatePercentage = (votesOfUserAnswer: number, otherVotes: number) =>
  (votesOfUserAnswer / (votesOfUserAnswer + otherVotes)) * 100;

const QuestionStats: FC<QuestionStatsProps> = ({ question_id, value }) => {
  const otherOption = getOtherOption(value);
  const { questions } = useSelector((state: RootState) => state.questions);
  const [question] = useState(questions[question_id]);

  console.log("question", question);

  return (
    <>
      <div>{question[value].text}</div>
      <div>{question[value].votes.length} votes</div>
      <div>
        {calculatePercentage(
          question[value].votes.length,
          question[otherOption].votes.length
        )}
        % of users chose that option!
      </div>
    </>
  );
};

export default QuestionStats;
