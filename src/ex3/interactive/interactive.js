import inquirer from "inquirer";
import { printNoTasks } from "../utils.js";
import { initialMenuOptions } from "./menus.js";
import {
  addTask,
  deleteTasks,
  getTasks,
  clearAllTasks,
} from "../todoListFuncs.js";

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
      .then(({ tasks_to_delete }) => {
        const inidicesOfTasksToDelete = tasks_to_delete.map((task) =>
          choices.indexOf(task)
        );
        deleteTasks(inidicesOfTasksToDelete);
        initialMenu();
      });
  }
}

export default function initialMenu() {
  const { addTask, showAll, deleteTask, clearAll, quit } = initialMenuOptions;
  inquirer
    .prompt([
      {
        name: "initial_menu",
        type: "list",
        message: "What would like to do?",
        choices: [addTask, showAll, deleteTask, clearAll, quit],
      },
    ])
    .then((answers) => {
      switch (answers.initial_menu) {
        case addTask:
          addTaskMenu();
          break;
        case showAll:
          getTasks(true, true);
          break;
        case deleteTask:
          deleteTaskMenu();
          break;
        case clearAll:
          clearAllTasks();
          initialMenu();
          break;
        case quit:
          return;
      }
    });
}

export { initialMenu };
