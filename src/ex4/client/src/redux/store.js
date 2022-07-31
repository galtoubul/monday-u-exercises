import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import allReducers from "./reducers";

const preloadedState = {
  tasks: [],
  isLoading: true,
};

export const store = configureStore({
  reducer: allReducers,
  middleware: [thunkMiddleware],
  preloadedState
});
