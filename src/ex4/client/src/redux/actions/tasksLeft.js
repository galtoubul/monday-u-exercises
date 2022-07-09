import tasksLeftTypes from "./constants";

const setTasksLeft = (tasksLeft) => ({
  type: tasksLeftTypes.SET,
  tasksLeft,
});

export const setTasksLeftAction = (tasksLeft) => {
  return async (dispatch) => {
    dispatch(setTasksLeft(tasksLeft));
  };
};
