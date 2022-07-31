import React from "react";
import "./TaskTrashButton.css";
import PropTypes from "prop-types";
import { ReactComponent as TrashIcon } from "./images/delete_icon.svg";

const TaskTrashButton = ({ handleTaskDelete, taskId }) => {
  return (
    <button className="trash" onClick={() => handleTaskDelete(taskId)}>
      <TrashIcon />
    </button>
  );
};

TaskTrashButton.propTypes = {
  handleTaskDelete: PropTypes.func,
};

export default TaskTrashButton;
