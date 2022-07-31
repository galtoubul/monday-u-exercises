import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAction } from "../../redux/actions/tasks";
import TasksContainer from "./TasksContainer";
import { selectTasksLeftNum } from "../../redux/selectors/tasksLeft";

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    tasksLeft: selectTasksLeftNum(state),
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTasks: getAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
