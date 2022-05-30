import fs from "fs";
import { Command } from "commander";
import axios from "axios";
import inquirer from "inquirer";

const tasksFilePath = "./tasks.json";
const ERR = -1;
let interactiveMode = false;

init();
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

program.configureHelp();

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
    deleteTask(index);
  });

program
  .command("clear-all")
  .description("Deletes all tasks")
  .action(() => {
    clearAllTasks();
  });

program.parse();

async function addTask(task) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  task = /^(\d+\s*,\s*)*\s*\d+\s*$/.test(task) ? await getPokemon(task) : task;
  let successMsg = "New todo was added successfully";
  if (task !== ERR) {
    if (typeof task === "object") {
      data.tasks = data.tasks.concat(task);
      if (task.length > 1) {
        successMsg = `${task.length} new todos were added successfully`;
      }
    } else {
      data.tasks.push(task);
    }
    fs.writeFileSync(tasksFilePath, JSON.stringify(data));

    if (interactiveMode) {
      process.stdout.write(`${successMsg}\n`, initialMenu);
    } else {
      console.log(successMsg);
    }
  }
}

function addTaskMenu() {
  inquirer
    .prompt([
      {
        name: "task_to_add",
        message:
          "Please insert the new task (or the id of the pokemon to catch)",
      },
    ])
    .then((answers) => {
      addTask(answers.task_to_add);
    });
}

function deleteTask(index, to_print = true) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  data.tasks.splice(index, 1);
  fs.writeFileSync(tasksFilePath, JSON.stringify(data));
  if (to_print) console.log("Todo was deleted successfully");
}

function getTasks(to_print = true) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  if (!to_print) return data.tasks;
  if (!data.tasks.length) {
    console.log("Done and Done");
  } else {
    console.log(data.tasks.join("\n"));
  }
}

function clearAllTasks() {
  createEmptyTasksList();
  console.log("Cleared all tasks successfully");
}

function createEmptyTasksList() {
  const content = JSON.stringify({ tasks: [] });
  fs.writeFileSync(tasksFilePath, content);
}

// Create an empty tasks list if the file doesn't exists yet
function init() {
  const data = fs.readFileSync(tasksFilePath, { flag: "a+" });
  if (!data.length) {
    createEmptyTasksList();
  }
}

async function getPokemon(pokemonIds) {
  pokemonIds = pokemonIds.replaceAll(" ", "").split(",");
  const endPoint = "https://pokeapi.co/api/v2/pokemon/";
  try {
    const promises = pokemonIds.map((pokemonId) =>
      axios.get(`${endPoint}${pokemonId}`)
    );
    const results = await Promise.allSettled(promises);
    return parsePokeApiResults(results);
  } catch (err) {
    console.error(`The todo wasn't added. An error occured: ${err}`);
    return ERR;
  }
}

function parsePokeApiResults(results) {
  const errorPokemonIds = [];
  const todos = [];
  for (let res of results) {
    if (res.status === "rejected") {
      const pokeIdInd = res.reason.request.path.lastIndexOf("/") + 1;
      errorPokemonIds.push(res.reason.request.path.slice(pokeIdInd));
    } else {
      todos.push(`Catch ${res.value.data.name}`);
    }
  }
  if (errorPokemonIds.length === 1) {
    todos.push(`Pokemon with ID ${errorPokemonIds[0]} was not found`);
  } else if (errorPokemonIds.length > 1) {
    todos.push(
      `Failed tp fetch the pokemons with these ids: ${errorPokemonIds.join(
        ", "
      )}`
    );
  }
  return todos;
}

function deleteTasks(tasksToDelete) {
  const tasks = getTasks(false);
  tasksToDelete.forEach((task) => {
    deleteTask(tasks.indexOf(task), false);
  });
  if (tasksToDelete.length) {
    console.log(`${tasksToDelete.length} tasks were deleted successfully`);
  }
}

function deleteTaskMenu() {
  const choices = getTasks(false);
  if (!choices.length) {
    console.log("Currently There aren't any tasks");
    initialMenu();
  }
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
      deleteTasks(answers.tasks_to_delete);
    });
}

function initialMenu() {
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
          getTasks();
          initialMenu();
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

function runInteractiveMode() {
  interactiveMode = true;
  initialMenu();
}
