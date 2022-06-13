import { readTasksFile, writeTasksFile } from "./utils.js";

async function clearAll(id) {
  const deletedTasks = await readTasksFile();
  await writeTasksFile([]);
  return { deletedTasks, tasksLeft: 0 };
}

export { clearAll };
