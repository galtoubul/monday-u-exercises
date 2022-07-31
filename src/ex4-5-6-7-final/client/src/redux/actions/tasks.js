import tasksTypes from "./constants";
import {
  getTasks as getTasksService,
  addTask as addTaskService,
  toggleTaskStatus as toggleTaskService,
  deleteTask as deleteTaskService,
  clearAll as clearAllService,
} from "../../services/taskManagerClient";
import { toggleLoadingAction } from "./loading";

const getTasks = (tasks) => ({
  type: tasksTypes.tasks.GET,
  tasks,
});

const addTask = (addedTasks) => ({
  type: tasksTypes.tasks.ADD,
  addedTasks,
});

const deleteTask = (taskId) => ({
  type: tasksTypes.tasks.DELETE,
  taskId,
});

const clearAllTasks = () => ({
  type: tasksTypes.tasks.CLEAR_ALL,
});

const toggleTask = (taskId, checked, doneTime) => ({
  type: tasksTypes.tasks.TOGGLE,
  taskId,
  checked,
  doneTime,
});

export const getAction = () => {
  return async (dispatch) => {
    const { tasks } = await getTasksService();
    dispatch(getTasks(tasks));
    dispatch(toggleLoadingAction());
  };
};

export const addAction = (task) => {
  return async (dispatch) => {
    const { addedTasks } = await addTaskService(task);
    dispatch(addTask(addedTasks));
  };
};

export const deleteAction = (taskId) => {
  return async (dispatch) => {
    await deleteTaskService(taskId);
    dispatch(deleteTask(taskId));
  };
};

export const clearAllAction = () => {
  return async (dispatch) => {
    await clearAllService();
    dispatch(clearAllTasks());
  };
};

export const toggleAction = (taskId, checked) => {
  return async (dispatch) => {
    const { doneTime } = await toggleTaskService(taskId, checked);
    dispatch(toggleTask(taskId, checked, doneTime));
  };
};
