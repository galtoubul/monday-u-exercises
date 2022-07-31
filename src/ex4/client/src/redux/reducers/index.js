import tasks from "./tasks";
import isLoading from "./loading";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  tasks,
  isLoading,
});

export default allReducers;
