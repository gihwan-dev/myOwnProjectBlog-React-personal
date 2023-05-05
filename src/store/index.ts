import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";

import userListReducer from "./users";

const store = configureStore({
  reducer: { user: userReducer, userList: userListReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
