import React from "react";
import "./Footer.css";

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

export default Footer;
