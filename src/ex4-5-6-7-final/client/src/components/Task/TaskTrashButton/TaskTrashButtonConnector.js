import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteAction } from "../../../redux/actions/tasks";
import TaskTrashButton from "./TaskTrashButton";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleTaskDelete: deleteAction }, dispatch);
};

export default connect(null, mapDispatchToProps)(TaskTrashButton);
