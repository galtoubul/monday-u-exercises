import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearAllAction } from "../../redux/actions/tasks";
import Footer from "./Footer";

const mapStateToProps = (state) => {
  return { uncompletedTasksLeft: state.tasksLeft };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleClearAll: clearAllAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
