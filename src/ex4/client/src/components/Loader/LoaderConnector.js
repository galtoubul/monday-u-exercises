import { connect } from "react-redux";
import Loader from "./Loader";

const mapStateToProps = (state) => {
  return { isLoading: state.isLoading };
};

export default connect(mapStateToProps, null)(Loader);
