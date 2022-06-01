import { Command } from "commander";
import runInteractiveMode from "./interactive.js";
import {
  addTask,
  deleteTasks,
  getTasks,
  clearAllTasks,
} from "./todoListFuncs.js";

export default function initProgram() {
  const program = new Command();
  program
    .name("node main.js")
    .usage("[option] [command]")
    .description("TIME TO GRIND - The best cli todo app since 27/5/2022")
    .version("1.0.0")
    .option("-i --interactive", "Interactive mode")
    .action((options) => {
      if (options.interactive) runInteractiveMode();
    });

  program
    .command("add")
    .description("Adds a new task")
    .argument(
      "<string>",
      `Task\'s description or a pokemon id.\n
    For comma separated pokemon ids please put quates around ("<pokemon id>, <pokemon id>[,<pokemon id>]")`
    )
    .action((task) => {
      addTask(task);
    });

  program
    .command("get")
    .description("Returns all existing tasks")
    .action(() => {
      getTasks();
    });

  program
    .command("delete")
    .description("Deletes a task by its index")
    .argument("<int>", "Task's index (starting at 0)")
    .action((index) => {
      deleteTasks([index]);
    });

  program
    .command("clear-all")
    .description("Deletes all tasks")
    .action(() => {
      clearAllTasks();
    });

  program.parse();
}
