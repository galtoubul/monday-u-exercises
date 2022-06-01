import fs from "fs";
import chalkAnimation from "chalk-animation";
import callerId from "caller-id";
import { getPokemon, printPokemons, ERR } from "./pokemons.js";
import { successfullyStr, tasksFilePath } from "./config.js";
import initialMenu from "./interactive.js";

export { addTask, deleteTasks, getTasks, clearAllTasks, createEmptyTasksList };

async function addTask(task) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  task = /^(\d+\s*,\s*)*\s*\d+\s*$/.test(task) ? await getPokemon(task) : task;
  if (task !== ERR) {
    let successMsg = `New todo was added ${successfullyStr}`;
    if (typeof task === "object") {
      data.tasks = data.tasks.concat(task.todos);
      if (Object.keys(task.pokemonsPhotos).length) {
        successMsg = "";
        await printPokemons(task.pokemonsPhotos);
      }
    } else {
      data.tasks.push(task);
    }
    fs.writeFileSync(tasksFilePath, JSON.stringify(data));
    if (successMsg.length) {
      if (callerId.getData().filePath.split("/")[-1] === "interactive.js") {
        process.stdout.write(`${successMsg}\n`, initialMenu);
      } else {
        console.log(successMsg);
      }
    }
  }
}

function deleteTasks(indeces) {
  if (!indeces.length) {
    console.log("None of the tasks were deleted");
    return;
  }

  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  indeces.forEach((ind) => {
    data.tasks.splice(ind, 1);
  });
  fs.writeFileSync(tasksFilePath, JSON.stringify(data));

  if (indeces.length == 1) {
    console.log(`Todo was deleted ${successfullyStr}`);
  } else {
    console.log(`${indeces.length} tasks were deleted ${successfullyStr}`);
  }
}

function getTasks(to_print = true, interactive = false) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  if (!to_print) return data.tasks;
  if (!data.tasks.length) {
    const rainbow = chalkAnimation.rainbow("Done and Done");
    setTimeout(() => {
      rainbow.stop();
      if (interactive) initialMenu();
    }, 2000);
  } else {
    console.log(data.tasks.join("\n"));
  }
}

function clearAllTasks() {
  createEmptyTasksList();
  console.log(`Cleared all tasks ${successfullyStr}`);
}

function createEmptyTasksList() {
  const content = JSON.stringify({ tasks: [] });
  fs.writeFileSync(tasksFilePath, content);
}
