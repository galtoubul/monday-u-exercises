import inquirer from "inquirer";
import { printNoTasks } from "./utils.js";
import {
  addTask,
  deleteTasks,
  getTasks,
  clearAllTasks,
} from "./todoListFuncs.js";

function addTaskMenu() {
  inquirer
    .prompt([
      {
        name: "task_to_add",
        message:
          "Please insert the new task (or the id of the pokemon to catch)",
      },
    ])
    .then(async (answers) => {
      await addTask(answers.task_to_add);
      initialMenu();
    });
}

function deleteTaskMenu() {
  const choices = getTasks(false);
  if (!choices.length) {
    printNoTasks();
    initialMenu();
  } else {
    inquirer
      .prompt([
        {
          name: "tasks_to_delete",
          type: "checkbox",
          message: "Choose the tasks you want to delete",
          choices,
        },
      ])
      .then((answers) => {
        deleteTasks(
          answers.tasks_to_delete.map((task) => choices.indexOf(task))
        );
        initialMenu();
      });
  }
}

export default function initialMenu() {
  inquirer
    .prompt([
      {
        name: "initial_menu",
        type: "list",
        message: "What would like to do?",
        choices: [
          "Add a new task",
          "Show all tasks",
          "Delete a task",
          "Clear all tasks",
          "quit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.initial_menu) {
        case "Add a new task":
          addTaskMenu();
          break;
        case "Show all tasks":
          getTasks(true, true);
          break;
        case "Delete a task":
          deleteTaskMenu();
          break;
        case "Clear all tasks":
          clearAllTasks();
          initialMenu();
          break;
        case "quit":
          return;
      }
    });
}
