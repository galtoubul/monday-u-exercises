import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addAction } from "../../redux/actions/tasks";
import AddTaskInput from "./AddTaskInput";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleAddTask: addAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(AddTaskInput);
