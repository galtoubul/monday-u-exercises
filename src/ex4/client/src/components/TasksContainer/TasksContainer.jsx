import React, { useEffect, useCallback } from "react";
import "./TasksContainer.css";
import PropTypes from "prop-types";
import AddTaskInput from "../AddTaskInput/AddTaskInput";
import FinishedAllAnimation from "../FinishedAllAnimation/FinishedAllAnimation";
import Task from "../Task/Task";
import {
  addTask as addTaskService,
  getTasks as getTasksService,
} from "../../services/taskManagerClient";

const TasksContainer = ({ tasks, setTasks, tasksLeft, setTasksLeft }) => {
  const fetchTasks = useCallback(async () => {
    const { tasks, tasksLeft } = await getTasksService();
    setTasks(tasks);
    setTasksLeft(tasksLeft);
  }, [setTasks, setTasksLeft]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (task) => {
    const { addedTasks, tasksLeft } = await addTaskService(task);
    setTasks([...tasks, ...addedTasks]);
    setTasksLeft(tasksLeft);
  };

  return (
    <div className="tasks-container">
      <AddTaskInput handleAddTask={handleAddTask} />
      <div className="new-tasks-container">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            setTasksLeft={setTasksLeft}
          />
        ))}
      </div>
      {tasksLeft ? null : <FinishedAllAnimation />}
    </div>
  );
};

TasksContainer.propTypes = {
  tasks: PropTypes.array,
  setTasks: PropTypes.func,
  tasksLeft: PropTypes.number,
  setTasksLeft: PropTypes.func,
};

TasksContainer.defaultProps = {
  tasks: [],
  tasksLeft: 0,
};

export default TasksContainer;
