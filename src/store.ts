import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "./features/users";
import loggedInUser from "./features/loggedInUser";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    loggedInUser,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
