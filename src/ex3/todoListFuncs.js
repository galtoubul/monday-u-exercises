import fs from "fs";
import chalkAnimation from "chalk-animation";
import callerId from "caller-id";
import { getPokemon, printPokemons, ERR } from "./pokemons.js";
import { successfullyStr, tasksFilePath } from "./config.js";
import initialMenu from "./interactive.js";
import { isTasksListEmpty, printNoTasks } from "./utils.js";

export { addTask, deleteTasks, getTasks, clearAllTasks, createEmptyTasksList };

const PRINT_POKES = 100;

async function addPokemonTask(task, data) {
  task = await getPokemon(task);
  if (task === ERR) return ERR;

  data.tasks = data.tasks.concat(task.todos);
  if (Object.keys(task.pokemonsPhotos).length) {
    await printPokemons(task.pokemonsPhotos);
    return PRINT_POKES;
  }
}

async function addTask(task) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));

  let successMsg = `New todo was added ${successfullyStr}`;
  const isCsvNums = /^(\d+\s*,\s*)*\s*\d+\s*$/.test(task);
  if (isCsvNums) {
    const rc = await addPokemonTask(task, data);
    if (rc === PRINT_POKES) successMsg = "";
  } else {
    data.tasks.push(task);
  }

  fs.writeFileSync(tasksFilePath, JSON.stringify(data));

  // Print pokemons / success message
  if (successMsg.length) {
    if (callerId.getData().filePath.split("/")[-1] === "interactive.js") {
      process.stdout.write(`${successMsg}\n`, initialMenu);
    } else {
      console.log(successMsg);
    }
  }
}

function deleteTasks(indeces) {
  if (!indeces.length) {
    console.log("None of the tasks were deleted");
    return;
  }

  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  indeces.sort((a, b) => a - b);
  for (let i = indeces.length - 1; i >= 0; i--) {
    data.tasks.splice(indeces[i], 1);
  }
  fs.writeFileSync(tasksFilePath, JSON.stringify(data));

  if (indeces.length == 1) {
    console.log(`Todo was deleted ${successfullyStr}`);
  } else {
    console.log(`${indeces.length} tasks were deleted ${successfullyStr}`);
  }
}

function showDoneAnimation(interactive) {
  const rainbow = chalkAnimation.rainbow("Done and Done");
  setTimeout(() => {
    rainbow.stop();
    if (interactive) initialMenu();
  }, 1000);
}

function getTasks(to_print = true, interactive = false) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  if (!to_print) return data.tasks;
  if (!data.tasks.length) {
    showDoneAnimation(interactive);
  } else {
    console.log(data.tasks.join("\n"));
    if (interactive) initialMenu();
  }
}

function clearAllTasks() {
  if (isTasksListEmpty()) {
    printNoTasks();
  } else {
    createEmptyTasksList();
    console.log(`Cleared all tasks ${successfullyStr}`);
  }
}

function createEmptyTasksList() {
  const content = JSON.stringify({ tasks: [] });
  fs.writeFileSync(tasksFilePath, content);
}
