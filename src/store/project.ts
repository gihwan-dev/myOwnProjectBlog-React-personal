import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface projectState {
  _id: string;
}

const initialProject: projectState = {
  _id: "",
};

const projectSlice = createSlice({
  name: "project",
  initialState: initialProject,
  reducers: {
    setProject: (state, action: PayloadAction<{ _id: string }>) => {
      state._id = action.payload._id;
    },
  },
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
