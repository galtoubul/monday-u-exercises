import React from "react";
import "./TaskTrashButton.css";
import { ReactComponent as TrashIcon } from "./images/delete_icon.svg";

const TaskTrashButton = ({ handleTaskDelete }) => {
  return (
    <button className="trash" onClick={handleTaskDelete}>
      <TrashIcon />
    </button>
  );
};

export default TaskTrashButton;
