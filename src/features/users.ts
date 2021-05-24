import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../_DATA";

const getUsers = createAsyncThunk("users/fetchByIdStatus", async () => {
  const response = await _getUsers();
  return response.data;
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

interface usersState {
  users: User[];
}

const initialState: usersState = { users: [] };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // not sure what I should do here
  },
});
