import actionTypes from "../actions/constants";

const tasksReducer = (tasks = [], action) => {
  switch (action.type) {
    case actionTypes.tasks.GET: {
      return [...tasks, ...action.tasks];
    }
    case actionTypes.tasks.ADD: {
      const ret = [...tasks, ...action.addedTasks];
      return ret;
    }
    case actionTypes.tasks.DELETE: {
      return [...tasks].filter((task) => task.id !== action.taskId);
    }
    case actionTypes.tasks.CLEAR_ALL: {
      return [];
    }
    case actionTypes.tasks.TOGGLE: {
      return [...tasks].map((task) =>
        task.id !== action.taskId
          ? task
          : { ...task, checked: action.checked, doneTime: action.doneTime }
      );
    }
    default:
      return tasks;
  }
};

export default tasksReducer;
