import { getPokemonName } from "../clients/pokemonClient.js";
import { storage } from "./storage.js";

async function addTask(task) {
  let addedTasks = await createTasks(task);
  const addedTasksObjs = [];
  for (let addedTask of addedTasks) {
    const id = await storage.addTask(addedTask);
    addedTasksObjs.push({ id, itemName: addedTask, checked: false });
  }
  const tasksLeft = await storage.getTasksLeftNum();
  console.log(tasksLeft)
  return { addedTasks: addedTasksObjs, tasksLeft };
}

async function createTasks(task) {
  const isCsvNums = /^(\d+\s*,\s*)*\s*\d+\s*$/.test(task);
  if (isCsvNums) {
    const pokemonIds = task.replaceAll(" ", "").split(",");
    let pokemonTasks = pokemonIds.map(
      async (id) => await getPokemonTaskText(id)
    );
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
