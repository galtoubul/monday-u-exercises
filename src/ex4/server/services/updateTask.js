import { readTasksFile, writeTasksFile, calcTasksLeft } from "./utils.js";

async function checkUncheckTask(id, checked) {
  const tasks = await readTasksFile();
  const index = tasks.findIndex((task) => task.id === id);
  const updatedTask = tasks[index];
  tasks.splice(index, 1);
  updatedTask["checked"] = checked;
  tasks.push(updatedTask);
  const tasksLeft = calcTasksLeft(tasks);
  await writeTasksFile(tasks);
  return { updatedTask, tasksLeft };
}

export { checkUncheckTask };
