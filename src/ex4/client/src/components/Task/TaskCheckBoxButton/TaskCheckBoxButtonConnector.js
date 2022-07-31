import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleAction } from "../../../redux/actions/tasks";
import TaskCheckBoxButton from "./TaskCheckBoxButton";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ handleToggle: toggleAction }, dispatch);
};

export default connect(null, mapDispatchToProps, null, { forwardRef: true })(
  TaskCheckBoxButton
);
