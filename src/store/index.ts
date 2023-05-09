import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";

import userListReducer from "./users";

import projectReducer from "./project";

import totalListReducer from "./todoList";

const store = configureStore({
  reducer: {
    user: userReducer,
    userList: userListReducer,
    project: projectReducer,
    totalList: totalListReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
