import chalk from "chalk";
import { getTasks } from "./todoListFuncs.js";
export { isTasksListEmpty, printNoTasks };

function isTasksListEmpty() {
  const choices = getTasks(false);
  return choices.length === 0;
}

function printNoTasks() {
  console.log(chalk.red("Currently There aren't any tasks"));
}
