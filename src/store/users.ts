import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userState } from "./user";

export interface userListState {
  userList: userState[];
}

const initialUserList: userListState = {
  userList: [],
};

const userListSlice = createSlice({
  name: "userList",
  initialState: initialUserList,
  reducers: {
    setUserList: (state, action: PayloadAction<userListState>) => {
      state.userList = action.payload.userList;
    },
  },
});

export const userListActions = userListSlice.actions;

export default userListSlice.reducer;
