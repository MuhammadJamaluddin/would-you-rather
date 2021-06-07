import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OptionType } from "../components/Question";
import { store } from "../store";

import { _getQuestions } from "../_DATA";

export const getQuestions = createAsyncThunk("questions", async () => {
  return await _getQuestions();
});

export interface Option {
  votes: string[];
  text: string;
}

export interface QuestionType {
  id: string;
  author: string;
  timestamp: number;
  optionOne: Option;
  optionTwo: Option;
}

interface QuestionsData {
  [questionId: string]: QuestionType;
}

interface QuestionsState {
  loading: boolean;
  questions: QuestionsData;
}

interface AnswerQuestionPayload {
  authedUser: string;
  qid: string;
  answer: OptionType;
}

const initialState: QuestionsState = { questions: {}, loading: true };

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    answerQuestion: (state, action: PayloadAction<AnswerQuestionPayload>) => {
      const { authedUser, qid, answer } = action.payload;
      state.questions[qid][answer].votes.concat([authedUser]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getQuestions.fulfilled,
      (state, { payload }: PayloadAction<QuestionsData>) => {
        state.questions = payload;
        state.loading = false;
      }
    );
    builder.addCase(getQuestions.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { answerQuestion } = questionsSlice.actions;

export default questionsSlice.reducer;
