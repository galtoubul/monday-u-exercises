import { readTasksFile, calcTasksLeft } from "./utils.js";

async function getTasks() {
  let tasks = await readTasksFile();
  tasks = tasks ? tasks : [];
  const tasksLeft = calcTasksLeft(tasks);
  return { tasks, tasksLeft };
}

export { getTasks };
