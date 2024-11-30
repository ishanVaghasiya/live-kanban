import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "type";

interface InitialState {
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice;
