import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface todoItemState {
  _id: string;
  title: string;
  description: string;
  done: boolean;
}

export interface todoListState {
  _id: string;
  title: string;
  start: string;
  end: string;
  list: todoItemState[];
}

export interface totalListState {
  todo: todoListState[];
  doing: todoListState[];
  done: todoListState[];
}

const initialTotalList: totalListState = {
  todo: [],
  doing: [],
  done: [],
};

const totalListSlice = createSlice({
  name: "totalList",
  initialState: initialTotalList,
  reducers: {
    setTotalList: (state, action: PayloadAction<totalListState>) => {
      state.todo = action.payload.todo;
      state.doing = action.payload.doing;
      state.done = action.payload.done;
    },
  },
});

export const totalListActions = totalListSlice.actions;

export default totalListSlice.reducer;
