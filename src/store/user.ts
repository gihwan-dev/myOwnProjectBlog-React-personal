import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  name: string;
  job: string;
  isLoged: boolean;
}

const initialUser: userState = {
  name: "",
  job: "",
  isLoged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; job: string }>) => {
      state.name = action.payload.name;
      state.job = action.payload.job;
      state.isLoged = true;
    },
    logout: (state) => {
      state.name = "";
      state.job = "";
      state.isLoged = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
