import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";

import userListReducer from "./users";

import projectReducer from "./project";

const store = configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
    project: projectReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
