import tasks from "./tasks";
import tasksLeft from "./tasksLeft";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  tasks,
  tasksLeft,
});

export default allReducers;
