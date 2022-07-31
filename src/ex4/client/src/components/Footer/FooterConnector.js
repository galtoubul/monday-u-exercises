import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearAllAction } from "../../redux/actions/tasks";
import Footer from "./Footer";
import { selectTasksLeftNum } from "../../redux/selectors/tasksLeft";

const mapStateToProps = (state) => {
  return { uncompletedTasksLeft: selectTasksLeftNum(state) };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleClearAll: clearAllAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
