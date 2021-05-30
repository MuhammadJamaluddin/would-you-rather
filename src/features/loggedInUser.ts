import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./users";

export type loggedInUserType = User | null;

const loggedInUserSlice = createSlice({
  name: "counter",
  initialState: null as loggedInUserType,
  reducers: {
    login(state, action: PayloadAction<loggedInUserType>) {
      state = action.payload;
    },
  },
});

export const { login } = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;
