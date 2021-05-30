import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { _getUsers } from "../_DATA";

export const getUsers = createAsyncThunk("users", async () => {
  return await _getUsers();
});

export interface User {
  id: string;
  name: string;
  avatarURL: string;
  answers: {
    [id: string]: string;
  };
  questions: string[];
}

interface UserData {
  [name: string]: User;
}
interface usersState {
  loading: boolean;
  users: UserData;
}

const initialState: usersState = { users: {}, loading: true };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUsers.fulfilled,
      (state, { payload }: PayloadAction<UserData>) => {
        state.users = payload;
        state.loading = false;
      }
    );
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default usersSlice.reducer;
