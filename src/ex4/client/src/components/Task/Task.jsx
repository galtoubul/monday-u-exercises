import React, { useRef } from "react";
import "./Task.css";
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

export default Task;
