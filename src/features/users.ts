import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { _getUsers } from "../_DATA";

export const getUsers = createAsyncThunk("users", async () => {
  return await _getUsers();
});

interface User {
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
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      state.users = payload.users;
      state.loading = false;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default usersSlice.reducer;
