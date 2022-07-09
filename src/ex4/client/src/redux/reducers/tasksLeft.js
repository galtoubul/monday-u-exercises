import actionTypes from "../actions/constants";

const tasksLeftReducer = (tasksLeft = 0, action) => {
  switch (action.type) {
    case actionTypes.SET: {
      return action.tasksLeft;
    }
    default:
      return tasksLeft;
  }
};

export default tasksLeftReducer;
