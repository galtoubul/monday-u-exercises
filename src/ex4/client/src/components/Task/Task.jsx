import React, { useRef } from "react";
import "./Task.css";
import PropTypes from "prop-types";
import TaskText from "./TaskText/TaskText";
import TaskCheckBoxButtonConnector from "./TaskCheckBoxButton/TaskCheckBoxButtonConnector";
import TaskTrashButtonConnector from "./TaskTrashButton/TaskTrashButtonConnector";

const Task = ({ task }) => {
  const { id, itemName, checked, doneTime } = task;

  const checkBoxRef = useRef(null);
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const taskTextRef = useRef({ textContainerRef, textRef });

  return (
    <div className="task-container">
      <TaskCheckBoxButtonConnector
        ref={checkBoxRef}
        taskId={id}
        checked={checked}
      />
      <TaskText
        ref={taskTextRef}
        taskText={itemName}
        checked={checked}
        doneTime={doneTime}
      />
      <TaskTrashButtonConnector taskId={id} />
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    itemName: PropTypes.string,
    checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    doneTime: PropTypes.string,
  }),
};

Task.defaultProps = {
  tasks: [],
};

export default Task;
