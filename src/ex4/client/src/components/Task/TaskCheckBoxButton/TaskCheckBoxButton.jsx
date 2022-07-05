import React, { forwardRef } from "react";
import "./TaskCheckBoxButton.css";
import PropTypes from "prop-types";

const TaskCheckBoxButton = forwardRef(
  ({ taskId, checked, handleTaskToggle }, ref) => {
    return (
      <div className="task-checkbox">
        <input
          type="checkbox"
          id={taskId}
          ref={ref}
          onChange={handleTaskToggle}
          checked={checked}
        />
        <label htmlFor={taskId}></label>
      </div>
    );
  }
);

TaskCheckBoxButton.propTypes = {
  taskId: PropTypes.number,
  checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  handleTaskToggle: PropTypes.func,
};

export default TaskCheckBoxButton;
