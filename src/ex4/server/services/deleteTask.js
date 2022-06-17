import { storage } from "./storage.js";

async function deleteTask(id) {
  const tasksDeletedNum = await storage.deleteTask(id);
  if (!tasksDeletedNum) {
    throw new Error("The task id is not a task id of an existing task");
  }
  let tasksLeft = await storage.getTasksLeftNum();
  return { tasksDeletedNum, tasksLeft };
}

async function clearAll(id) {
  await storage.clearAll();
  return { tasksLeft: 0 };
}

export { deleteTask, clearAll };
