import { getPokemonName } from "../clients/pokemonClient.js";
import { storage } from "./storage.js";

async function addTask(task) {
  let addedTasks = await createTasks(task);
  const addedTasksObjs = [];
  for (let addedTask of addedTasks) {
    const id = await storage.addTask(addedTask);
    addedTasksObjs.push({ id, itemName: addedTask, checked: false });
  }
  return { addedTasks: addedTasksObjs };
}

async function createTasks(task) {
  const isCsvNums = /^(\d+\s*,\s*)*\s*\d+\s*$/.test(task);
  if (isCsvNums) {
    const pokemonIds = task.replaceAll(" ", "").split(",");
    const pokemonTasks = [];
    for (let pokemonId of pokemonIds) {
      pokemonTasks.push(await getPokemonTaskText(pokemonId));
    }
    return pokemonTasks;
  } else {
    return [task];
  }
}

async function getPokemonTaskText(pokemonId) {
  try {
    const pokemonName = await getPokemonName(pokemonId);
    return `Catch ${pokemonName}`;
  } catch (err) {
    return `Pokemon with ID ${pokemonId} was not found`;
  }
}

export { addTask };
