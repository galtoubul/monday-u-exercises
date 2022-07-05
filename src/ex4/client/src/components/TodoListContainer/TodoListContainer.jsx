import React, { useState } from "react";
import "./TodoListContainer.css";
import Title from "../Title/Title";
import TasksContainer from "../TasksContainer/TasksContainer";
import Footer from "../Footer/Footer";
import { clearAll as clearAllService } from "../../services/taskManagerClient";

const TodoListContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [tasksLeft, setTasksLeft] = useState(0);

  const handleClearAll = async () => {
    await clearAllService();
    setTasks([]);
    setTasksLeft(0);
  };

  return (
    <div className="todo-container">
      <Title title="Time To Grind" />
      <TasksContainer
        tasks={tasks}
        setTasks={setTasks}
        tasksLeft={tasksLeft}
        setTasksLeft={setTasksLeft}
      />
      <Footer
        uncompletedTasksLeft={tasksLeft}
        handleClearAll={handleClearAll}
      />
    </div>
  );
};

export default TodoListContainer;
