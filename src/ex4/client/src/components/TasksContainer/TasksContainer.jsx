import React, { useEffect } from "react";
import "./TasksContainer.css";
import PropTypes from "prop-types";
import FinishedAllAnimation from "../FinishedAllAnimation/FinishedAllAnimation";
import Task from "../Task/Task";
import AddTaskInputConnector from "../AddTaskInput/AddTaskInputConnector";
import Loader from "../Loader/Loader";

const TasksContainer = ({ tasks, fetchTasks, tasksLeft, isLoading }) => {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="tasks-container">
      <AddTaskInputConnector />
      <div className="new-tasks-container">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
      {isLoading ? <Loader /> : tasksLeft ? null : <FinishedAllAnimation />}
    </div>
  );
};

TasksContainer.propTypes = {
  tasks: PropTypes.array,
  fetchTasks: PropTypes.func,
  tasksLeft: PropTypes.number,
};

TasksContainer.defaultProps = {
  tasks: [],
  tasksLeft: 0,
};

export default TasksContainer;
