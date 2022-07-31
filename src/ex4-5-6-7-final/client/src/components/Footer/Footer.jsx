import React from "react";
import "./Footer.css";
import PropTypes from "prop-types";

const Footer = ({ uncompletedTasksLeft, handleClearAll }) => {
  return (
    <div className="todo-footer-container">
      <p className={!uncompletedTasksLeft ? "hide" : null}>
        {`Keep Grinding! You got ${uncompletedTasksLeft} to go`}
      </p>
      <button className="clear-all" type="button" onClick={handleClearAll}>
        Clear All
      </button>
    </div>
  );
};

Footer.propTypes = {
  uncompletedTasksLeft: PropTypes.number,
  handleClearAll: PropTypes.func,
};

export default Footer;
