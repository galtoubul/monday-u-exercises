import { Command } from "commander";
import chalk from "chalk";
import runInteractiveMode from "./interactive/interactive.js";
import { printNoTasks } from "./utils.js";
import {
  addTask,
  deleteTasks,
  getTasks,
  clearAllTasks,
} from "./todoListFuncs.js";

function isValidIndToDel(ind, tasksListLength) {
  const isNum = /^\d+$/.test(ind);
  const isInRange = ind >= 0 && ind <= tasksListLength - 1;
  if (!isNum) {
    const notNumErr =
      "The index of the todo to be deleted must be a valid number";
    console.log(chalk.red(notNumErr));
  } else if (!isInRange) {
    const notInRangeErr = `The index of the todo to be deleted must be in range 0 - ${
      tasksListLength - 1
    }`;
    console.log(chalk.red(notInRangeErr));
  }
  return isNum && isInRange;
}

export default function initProgram() {
  const program = new Command();
  program
    .name("npx time-to-grind")
    .usage("[option] [command]")
    .description(
      `TIME TO GRIND 💪 The best cli todo app since 2/6/2022\nAsh Ketchum: "Couldn't ask for something better... Now I never forget to catch em all⚡"`
    )
    .version("1.0.0")
    .action(() => {
      // Default running mode is interactive
      runInteractiveMode();
    });

  program
    .command("add")
    .description("Add a new task")
    .argument("<string>", "Task's description.")
    .action((task) => {
      addTask(task);
    });

  program
    .command("add")
    .description("Add pokemons to be catched")
    .argument("<int[,int...]>", "A pokemon id or comma separated pokemon ids.")
    .action((task) => {
      addTask(task);
    });

  program
    .command("get")
    .description("Return all existing tasks")
    .action(() => {
      getTasks();
    });

  program
    .command("delete")
    .description("Delete a task by its index")
    .argument("<int>", "Task's index (starting at 0)")
    .action((index) => {
      const tasksListLength = getTasks(false).length;
      if (!tasksListLength) {
        printNoTasks();
      } else if (isValidIndToDel(index, tasksListLength)) {
        deleteTasks([index]);
      }
    });

  program
    .command("clear-all")
    .description("Delete all tasks")
    .action(() => {
      clearAllTasks();
    });

  program.parse();
}
