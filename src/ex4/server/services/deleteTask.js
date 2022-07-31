import { storage } from "./storage.js";

async function deleteTask(id) {
  const tasksDeletedNum = await storage.deleteTask(id);
  if (!tasksDeletedNum) {
    throw new Error("The task id is not a task id of an existing task");
  }
  return { tasksDeletedNum };
}

async function clearAll(id) {
  await storage.clearAll();
}

export { deleteTask, clearAll };
