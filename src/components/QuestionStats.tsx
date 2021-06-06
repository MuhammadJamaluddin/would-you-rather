import React, { FC } from "react";

import { QuestionType } from "../features/questions";
import { OptionType } from "./Question";

type QuestionStatsProps = {
  question: QuestionType;
  value: OptionType;
};

const getOtherOption = (option: OptionType) => {
  if (option === OptionType.optionOne) return OptionType.optionTwo;
  return OptionType.optionOne;
};

const QuestionStats: FC<QuestionStatsProps> = ({ question, value }) => {
  const otherOption = getOtherOption(value);

  return (
    <>
      <div>{question[value].text}</div>
      <div>{question[value].votes.length} votes</div>
      <div>
        {(question[value].votes.length / question[otherOption].votes.length) *
          100}
        % of users chose that option!
      </div>
    </>
  );
};

export default QuestionStats;
