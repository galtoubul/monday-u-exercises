import React, { forwardRef } from "react";
import "./TaskText.css";
import PropTypes from "prop-types";
import DoneTimeStamp from "./DoneTimeStamp/DoneTimeStamp";

const TaskText = forwardRef(({ taskText, checked, doneTime }, ref) => {
  const { textContainerRef, textRef } = ref.current;
  return (
    <div className="task-txt-container" ref={textContainerRef}>
      <p
        className={`task-txt ${checked ? "done-task-txt" : null}`}
        ref={textRef}
      >
        {taskText}
      </p>
      {doneTime ? <DoneTimeStamp doneTime={doneTime} /> : null}
    </div>
  );
});

TaskText.propTypes = {
  taskText: PropTypes.string,
  checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  doneTime: PropTypes.string,
};

export default TaskText;
