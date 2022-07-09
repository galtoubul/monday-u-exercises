import tasksTypes from "./constants";

const toggleLoading = () => ({
  type: tasksTypes.loading.TOGGLE,
});

export const toggleLoadingAction = () => {
  return (dispatch) => {
    dispatch(toggleLoading());
  };
};
