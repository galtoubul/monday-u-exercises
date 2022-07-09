import React, { forwardRef } from "react";
import "./TaskCheckBoxButton.css";
import PropTypes from "prop-types";

const TaskCheckBoxButton = forwardRef(
  ({ taskId, checked, handleToggle }, ref) => {
    return (
      <div className="task-checkbox">
        <input
          type="checkbox"
          id={taskId}
          ref={ref}
          onChange={() => handleToggle(taskId, ref.current.checked)}
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
  toggleAction: PropTypes.func,
};

export default TaskCheckBoxButton;
