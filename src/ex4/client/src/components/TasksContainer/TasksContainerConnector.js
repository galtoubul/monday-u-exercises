import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAction } from "../../redux/actions/tasks";
import TasksContainer from "./TasksContainer";

const mapStateToProps = (state) => {
  return { tasks: state.tasks, tasksLeft: state.tasksLeft };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchTasks: getAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
