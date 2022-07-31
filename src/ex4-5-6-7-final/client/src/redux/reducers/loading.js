import actionTypes from "../actions/constants";

const loadingReducer = (isLoading = true, action) => {
  switch (action.type) {
    case actionTypes.loading.TOGGLE: {
      return !isLoading;
    }
    default:
      return isLoading;
  }
};

export default loadingReducer;
