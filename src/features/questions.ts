import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { _getQuestions } from "../_DATA";

export const getQuestions = createAsyncThunk("users", async () => {
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

const initialState: QuestionsState = { questions: {}, loading: true };

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {},
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

export default questionsSlice.reducer;
