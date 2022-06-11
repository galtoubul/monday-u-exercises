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

export { deleteTask };
