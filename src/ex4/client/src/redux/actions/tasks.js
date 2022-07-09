import tasksTypes from "./constants";
import {
  getTasks as getTasksService,
  addTask as addTaskService,
  toggleTaskStatus as toggleTaskService,
  deleteTask as deleteTaskService,
  clearAll as clearAllService,
} from "../../services/taskManagerClient";
import { setTasksLeftAction } from "../actions/tasksLeft";

const getTasks = (tasks) => ({
  type: tasksTypes.GET,
  tasks,
});

const addTask = (addedTasks) => ({
  type: tasksTypes.ADD,
  addedTasks,
});

const deleteTask = (taskId) => ({
  type: tasksTypes.DELETE,
  taskId,
});

const clearAllTasks = () => ({
  type: tasksTypes.CLEAR_ALL,
});

const toggleTask = (taskId, checked, doneTime) => ({
  type: tasksTypes.TOGGLE,
  taskId,
  checked,
  doneTime,
});

export const getAction = () => {
  return async (dispatch) => {
    const { tasks, tasksLeft } = await getTasksService();
    dispatch(getTasks(tasks));
    dispatch(setTasksLeftAction(tasksLeft));
  };
};

export const addAction = (task) => {
  return async (dispatch) => {
    const { addedTasks, tasksLeft } = await addTaskService(task);
    dispatch(addTask(addedTasks));
    dispatch(setTasksLeftAction(tasksLeft));
  };
};

export const deleteAction = (taskId) => {
  return async (dispatch) => {
    const { tasksLeft } = await deleteTaskService(taskId);
    dispatch(deleteTask(taskId));
    dispatch(setTasksLeftAction(tasksLeft));
  };
};

export const clearAllAction = () => {
  return async (dispatch) => {
    await clearAllService();
    dispatch(clearAllTasks());
    dispatch(setTasksLeftAction(0));
  };
};

export const toggleAction = (taskId, checked) => {
  return async (dispatch) => {
    const { tasksLeft, doneTime } = await toggleTaskService(taskId, checked);
    dispatch(toggleTask(taskId, checked, doneTime));
    dispatch(setTasksLeftAction(tasksLeft));
  };
};
