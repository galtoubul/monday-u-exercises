import { readTasksFile, writeTasksFile, calcTasksLeft } from "./utils.js";

async function checkUncheckTask(id, checked) {
  const tasks = await readTasksFile();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new Error("The task id is not a task id of an existing task");
  }
  const updatedTask = tasks[index];
  tasks.splice(index, 1);
  updatedTask["checked"] = checked;
  tasks.push(updatedTask);
  const tasksLeft = calcTasksLeft(tasks);
  await writeTasksFile(tasks);
  return { updatedTask, tasksLeft };
}

export { checkUncheckTask };