import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  data: any;
}

const initialState: InitialState = {
  data: null,
};

const kanbanBoard = createSlice({
  name: "kanbanBoard",
  initialState,
  reducers: {
    setData: (state) => {},
  },
});

export const { setData } = kanbanBoard.actions;
export default kanbanBoard;
