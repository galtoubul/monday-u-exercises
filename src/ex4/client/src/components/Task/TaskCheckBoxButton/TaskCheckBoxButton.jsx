import React, { forwardRef } from "react";
import "./TaskCheckBoxButton.css";

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

export default TaskCheckBoxButton;
