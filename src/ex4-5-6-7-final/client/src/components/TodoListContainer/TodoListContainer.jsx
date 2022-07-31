import React from "react";
import "./TodoListContainer.css";
import Title from "../Title/Title";
import TasksContainerConnector from "../TasksContainer/TasksContainerConnector";
import FooterConnector from "../Footer/FooterConnector";

const TodoListContainer = () => {
  return (
    <div className="todo-container">
      <Title title="Time To Grind" />
      <TasksContainerConnector />
      <FooterConnector />
    </div>
  );
};

export default TodoListContainer;
