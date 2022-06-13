import { readTasksFile, writeTasksFile, calcTasksLeft } from "./utils.js";

async function deleteTask(id) {
  const tasks = await readTasksFile();
  const index = tasks.findIndex((task) => task.id === id);
  const deletedTask = tasks[index];
  tasks.splice(index, 1);
  let tasksLeft = calcTasksLeft(tasks);
  await writeTasksFile(tasks);
  return { deletedTask, tasksLeft };
}

async function clearAll(id) {
  const deletedTasks = await readTasksFile();
  await writeTasksFile([]);
  return { deletedTasks, tasksLeft: 0 };
}

export { deleteTask, clearAll };
