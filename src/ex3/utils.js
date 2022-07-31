import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { getTasks } from "./todoListFuncs.js";
import { initialMenu } from "./interactive/interactive.js";

function isTasksListEmpty() {
  const choices = getTasks(false);
  return choices.length === 0;
}

function printNoTasks() {
  console.log(chalk.red("Currently There aren't any tasks"));
}

function showDoneAnimation(interactive) {
  const rainbow = chalkAnimation.rainbow("Done and Done");
  setTimeout(() => {
    rainbow.stop();
    if (interactive) initialMenu();
  }, 1000);
}

export { isTasksListEmpty, printNoTasks, showDoneAnimation };
