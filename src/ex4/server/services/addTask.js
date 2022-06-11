import { getPokemonName } from "../clients/pokemonClient.js";
import { readTasksFile, calcTasksLeft, writeTasksFile } from "./utils.js";

async function addTask(task) {
  const addedTasks = await createTasks(task);
  let data = await readTasksFile();
  data = data ? data : [];
  data.push(...addedTasks);
  await writeTasksFile(data);
  const tasksLeft = calcTasksLeft(data);
  return { addedTasks, tasksLeft };
}

async function createTasks(task) {
  const isCsvNums = /^(\d+\s*,\s*)*\s*\d+\s*$/.test(task);
  if (isCsvNums) {
    const pokemonIds = task.replaceAll(" ", "").split(",");
    let pokemonTasks = [];
    let id = await getTaskId();
    for (let pokemonId of pokemonIds) {
      const text = await getPokemonTaskText(pokemonId);
      pokemonTasks.push({ id: id++, text, checked: false });
    }
    return pokemonTasks;
  } else {
    return [await createTask(task)];
  }
}

async function getPokemonTaskText(pokemonId) {
  try {
    const pokemonName = await getPokemonName(pokemonId);
    return `Catch ${pokemonName}`;
  } catch (err) {
    console.log(err);
    return `Pokemon with ID ${pokemonId} was not found`;
  }
}

async function createTask(text) {
  const id = await getTaskId();
  return { id, text, checked: false };
}

async function getTaskId() {
  const data = await readTasksFile();
  const ids = data.map((task) => task.id);
  return Math.max(...ids, 0) + 1;
}

export { addTask };
