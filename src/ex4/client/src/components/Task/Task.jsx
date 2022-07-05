import React, { useRef } from "react";
import "./Task.css";
import PropTypes from "prop-types";
import TaskCheckboxButton from "./TaskCheckBoxButton/TaskCheckBoxButton";
import TaskText from "./TaskText/TaskText";
import TaskTrashButton from "./TaskTrashButton/TaskTrashButton";
import {
  deleteTask as deleteTaskService,
  toggleTaskStatus as toggleTaskService,
} from "../../services/taskManagerClient";

const Task = ({ task, tasks, setTasks, setTasksLeft }) => {
  const { id, itemName, checked, doneTime } = task;

  const checkBoxRef = useRef(null);
  const textContainerRef = useRef(null);
  const textRef = useRef(null);
  const taskTextRef = useRef({ textContainerRef, textRef });

  const handleTaskToggle = async () => {
    const checked = checkBoxRef.current.checked;
    const { tasksLeft, doneTime } = await toggleTaskService(id, checked);
    const updatedTask = { id, itemName, checked, doneTime };
    const updatedTasks = tasks.map((task) =>
      task.id !== id ? task : updatedTask
    );
    setTasks(updatedTasks);
    setTasksLeft(tasksLeft);
  };

  const handleTaskDelete = async () => {
    const { tasksLeft } = await deleteTaskService(id);
    setTasks(tasks.filter((task) => task.id !== id));
    setTasksLeft(tasksLeft);
  };

  return (
    <div className="task-container">
      <TaskCheckboxButton
        ref={checkBoxRef}
        taskId={id}
        checked={checked}
        handleTaskToggle={handleTaskToggle}
      />
      <TaskText
        ref={taskTextRef}
        taskText={itemName}
        checked={checked}
        doneTime={doneTime}
      />
      <TaskTrashButton handleTaskDelete={handleTaskDelete} />
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
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  tasksLeft: PropTypes.number,
  setTasksLeft: PropTypes.func,
};

Task.defaultProps = {
  tasks: [],
  tasksLeft: 0,
};

export default Task;
