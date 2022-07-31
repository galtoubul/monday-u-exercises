import React, { useState, useEffect, useRef } from "react";
import "./AddTaskInput.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus);
const validTask = "valid-task-btn";

const isValidTask = (task) => {
  return !/^\s*$/.test(task);
};

const AddTaskInput = ({ handleAddTask }) => {
  const [newTaskText, setNewTaskText] = useState("");

  const addTaskInputRef = useRef(null);
  const addTaskBtnRef = useRef(null);

  const handleChange = (e) => {
    setNewTaskText(e.target.value);
  };

  const addTask = () => {
    if (isValidTask(newTaskText)) {
      handleAddTask(newTaskText);
      setNewTaskText("");
      addTaskInputRef.current.value = "";
    }
  };

  // Add task with Enter if the add task input is focused
  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" &&
      addTaskInputRef.current === document.activeElement
    ) {
      addTask();
    }
  };

  // Enable/disable add task (+) button
  useEffect(() => {
    if (!isValidTask(newTaskText)) {
      addTaskBtnRef.current.classList.remove(validTask);
    } else {
      addTaskBtnRef.current.classList.add(validTask);
    }
  }, [newTaskText]);

  return (
    <div className="add-task-container">
      <button className="add-task-btn" ref={addTaskBtnRef} onClick={addTask}>
        <FontAwesomeIcon icon="fa-plus" />
      </button>
      <input
        className="add-task-input"
        placeholder="Add task"
        ref={addTaskInputRef}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

AddTaskInput.propTypes = {
  handleAddTask: PropTypes.func,
};

export default AddTaskInput;
